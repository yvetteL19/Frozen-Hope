import { useState } from 'react';
import { useTranslation, LANGUAGES, Language } from '../i18n';
import { playSound } from '../systems/audioSystem';

export default function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === language);

  const handleSelect = (code: Language) => {
    playSound('click');
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-2 sm:top-4 left-2 sm:left-4 z-50">
      <div className="relative">
        {/* 当前语言按钮 - 移动端更紧凑 */}
        <button
          onClick={() => {
            playSound('click');
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800/90 hover:bg-gray-700/90 active:bg-gray-600/90 border border-gray-600 rounded-lg transition-all hover:scale-105 active:scale-95 touch-manipulation"
        >
          <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-ice-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span className="text-xs sm:text-sm text-gray-200">{currentLang?.nativeName}</span>
          <svg
            className={`w-3 sm:w-4 h-3 sm:h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* 下拉菜单 */}
        {isOpen && (
          <>
            {/* 点击外部关闭 */}
            <div
              className="fixed inset-0"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-1 w-36 sm:w-40 bg-gray-800/95 border border-gray-600 rounded-lg shadow-xl overflow-hidden">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  onMouseEnter={() => playSound('choice_hover')}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-2 text-left text-sm transition-colors flex items-center justify-between touch-manipulation ${
                    lang.code === language
                      ? 'bg-ice-600/30 text-ice-200'
                      : 'text-gray-300 hover:bg-gray-700/50 active:bg-gray-600/50'
                  }`}
                >
                  <span>{lang.nativeName}</span>
                  {lang.code === language && (
                    <svg className="w-4 h-4 text-ice-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
