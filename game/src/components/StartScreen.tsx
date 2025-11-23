import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { initAudio, playSound, playMusic } from '../systems/audioSystem';
import { useTranslation } from '../i18n';

export default function StartScreen() {
  const { t } = useTranslation();
  const startGame = useGameStore((state) => state.startGame);
  const [showGuide, setShowGuide] = useState(true);

  const handleStart = () => {
    // 初始化音频系统（需要用户交互）
    initAudio();
    playSound('click');
    playMusic('ambient');
    // 直接以CEO身份开始游戏
    startGame('ceo');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full text-center space-y-6 fade-in">
        {/* 标题区域 */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ice-200 to-ice-400">
            {t('app.title')}
          </h1>
        </div>

        {/* 故事背景 */}
        <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 mx-auto max-w-2xl">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
            {t('start.description')}
          </p>
        </div>

        {/* 玩法指引折叠区 */}
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="text-ice-300 hover:text-ice-200 text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <span>{t('start.howToPlay')}</span>
            <span className={`transform transition-transform ${showGuide ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {showGuide && (
            <div className="mt-4 bg-gray-800/30 rounded-lg p-4 text-left space-y-4 slide-up">
              {/* 玩法说明 */}
              <div className="space-y-2 text-sm text-gray-300">
                <p>{t('start.guide1')}</p>
                <p>{t('start.guide2')}</p>
                <p>{t('start.guide3')}</p>
                <p>{t('start.guide4')}</p>
              </div>

              {/* 胜负条件 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-700">
                <div className="bg-green-900/20 rounded p-3">
                  <div className="text-green-400 font-semibold text-xs mb-1">{t('start.winCondition')}</div>
                  <div className="text-xs text-gray-400">{t('start.winDesc')}</div>
                </div>
                <div className="bg-red-900/20 rounded p-3">
                  <div className="text-red-400 font-semibold text-xs mb-1">{t('start.loseCondition')}</div>
                  <div className="text-xs text-gray-400">{t('start.loseDesc')}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 开始按钮 */}
        <div className="pt-4">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-10 sm:px-14 py-4 bg-ice-600 hover:bg-ice-500 active:bg-ice-700 text-white text-lg sm:text-xl font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg touch-manipulation"
          >
            {t('start.play')}
          </button>
        </div>

        {/* 提示 */}
        <div className="text-xs text-gray-500">
          <p>💡 {t('start.tip')}</p>
        </div>

        {/* 版本信息 */}
        <div className="fixed bottom-4 left-0 right-0 text-center text-xs text-gray-600">
          {t('app.version')}
        </div>
      </div>
    </div>
  );
}
