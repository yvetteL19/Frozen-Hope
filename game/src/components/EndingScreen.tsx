import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { getEnding } from '../data/endings';
import { playSound, stopMusic } from '../systems/audioSystem';
import { useTranslation } from '../i18n';
import { endingTranslations, t as lt, getLocalizedEndingDescription } from '../i18n/gameContent';

export default function EndingScreen() {
  const { t, language } = useTranslation();
  const state = useGameStore();
  const { resetGame } = useGameStore();
  const ending = getEnding(state);

  // 获取本地化的结局标题
  const endingTrans = endingTranslations[ending.type as keyof typeof endingTranslations];
  const localizedTitle = endingTrans ? lt(endingTrans.title, language) : ending.title;

  // 播放结局音效
  useEffect(() => {
    stopMusic();
    playSound('ending');
  }, []);

  const handleReplay = () => {
    playSound('click');
    useGameStore.setState({ phase: 'replay' });
  };

  const handleReset = () => {
    playSound('click');
    resetGame();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-16 sm:py-8">
      <div className="max-w-3xl w-full space-y-6 sm:space-y-8 fade-in">
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ice-200">{localizedTitle}</h1>
          <div className="text-2xl sm:text-3xl">
            {'⭐'.repeat(ending.rating)}
          </div>
        </div>

        <div className="bg-gray-800/70 rounded-lg p-4 sm:p-6 md:p-8">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
            {getLocalizedEndingDescription(ending.type, state, language) || ending.description(state)}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 pb-4">
          <button
            onClick={handleReplay}
            className="w-full px-6 sm:px-8 py-4 bg-ice-600 hover:bg-ice-500 active:bg-ice-700 text-white text-base sm:text-lg font-semibold rounded-lg transition touch-manipulation"
          >
            {t('ending.viewReplay')}
          </button>
          <button
            onClick={handleReset}
            className="w-full px-6 sm:px-8 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white rounded-lg transition touch-manipulation"
          >
            {t('ending.restart')}
          </button>
        </div>
      </div>
    </div>
  );
}
