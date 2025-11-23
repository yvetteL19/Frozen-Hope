import { createContext, useContext, useState, ReactNode } from 'react';

// 支持的语言
export type Language = 'zh' | 'en';

export const LANGUAGES: { code: Language; name: string; nativeName: string }[] = [
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'en', name: 'English', nativeName: 'English' },
];

// 检测系统语言
const detectSystemLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();

  // 检查完整匹配
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('en')) return 'en';

  // 默认英文
  return 'en';
};

// 从localStorage加载语言设置
const loadSavedLanguage = (): Language | null => {
  try {
    const saved = localStorage.getItem('frozen_hope_language');
    if (saved && ['zh', 'en'].includes(saved)) {
      return saved as Language;
    }
  } catch {
    // localStorage不可用
  }
  return null;
};

// 保存语言设置
const saveLanguage = (lang: Language) => {
  try {
    localStorage.setItem('frozen_hope_language', lang);
  } catch {
    // localStorage不可用
  }
};

// 语言上下文
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// 翻译数据类型
type TranslationData = Record<string, string>;
type Translations = Record<Language, TranslationData>;

// 导入翻译
import { zhTranslations } from './zh';
import { enTranslations } from './en';

const translations: Translations = {
  zh: zhTranslations,
  en: enTranslations,
};

// Provider组件
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 优先使用保存的语言，否则检测系统语言
    return loadSavedLanguage() || detectSystemLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  // 翻译函数
  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['en'][key] || key;

    // 替换参数 {{paramName}}
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(value));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

// 获取当前语言（用于非React环境）
export function getCurrentLanguage(): Language {
  return loadSavedLanguage() || detectSystemLanguage();
}
