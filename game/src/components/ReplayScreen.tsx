import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { playSound } from '../systems/audioSystem';
import { useTranslation } from '../i18n';
import { getLocalizedBias } from '../i18n/gameContent';
import { getLocalizedEvent } from '../i18n/eventTranslations';

export default function ReplayScreen() {
  const { t, language } = useTranslation();
  const { cognitiveTraps, perfectDecisions, resetGame } = useGameStore();
  const [selectedBias, setSelectedBias] = useState<string | null>(null);

  const biasInfo = selectedBias ? getLocalizedBias(selectedBias, language) : null;

  // 获取本地化的事件名称
  const getLocalizedEventName = (eventId: string, originalName: string) => {
    const localized = getLocalizedEvent(eventId, language);
    return localized?.name || originalName;
  };

  // 获取本地化的选择文本
  const getLocalizedChoiceText = (eventId: string, choiceId: string, originalText: string) => {
    const localized = getLocalizedEvent(eventId, language);
    const choiceText = localized?.getChoiceText(choiceId);
    return choiceText || originalText;
  };

  // 获取本地化的偏误名称
  const getLocalizedBiasName = (biasId: string, originalName: string) => {
    const localized = getLocalizedBias(biasId, language);
    return localized?.name || originalName;
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-8 pt-14 sm:pt-4 md:pt-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ice-200">{t('replay.title')}</h1>
          <p className="text-sm sm:text-base text-gray-400 px-2">
            {t('replay.description')}
          </p>
        </div>

        {/* Cognitive Traps */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-red-300">
              {t('replay.cognitiveTraps')} ({cognitiveTraps.length})
            </h2>
            {cognitiveTraps.length > 0 && (
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                💡 {t('replay.clickToLearn')}
              </p>
            )}
          </div>
          {cognitiveTraps.length === 0 ? (
            <div className="bg-green-900/20 border border-green-600 rounded-lg p-4 sm:p-6 text-center">
              <p className="text-xl sm:text-2xl mb-2">{t('replay.perfectRationalist')}</p>
              <p className="text-sm sm:text-base text-gray-300">
                {t('replay.noTraps')}
              </p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {cognitiveTraps.map((trap, index) => (
                <div
                  key={index}
                  className="bg-red-900/20 border border-red-600/50 rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-red-900/30 active:bg-red-900/40 transition touch-manipulation"
                  onClick={() => setSelectedBias(trap.bias)}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-red-300 text-sm sm:text-base">
                        {getLocalizedEventName(trap.eventId, trap.eventName)}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1 truncate sm:whitespace-normal">
                        {t('replay.dayChoice', { day: trap.day, choice: getLocalizedChoiceText(trap.eventId, trap.choiceId, trap.choice) })}
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-xs px-2 py-1 bg-red-600/30 rounded shrink-0">
                      {getLocalizedBiasName(trap.bias, trap.bias)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Perfect Decisions */}
        {perfectDecisions.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-300">
              {t('replay.perfectDecisions')} ({perfectDecisions.length})
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {perfectDecisions.map((decision, index) => (
                <div
                  key={index}
                  className="bg-green-900/20 border border-green-600/50 rounded-lg p-3 sm:p-4"
                >
                  <h3 className="font-semibold text-green-300 text-sm sm:text-base">
                    {getLocalizedEventName(decision.eventId, decision.eventName)}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {t('replay.dayChoice', { day: decision.day, choice: getLocalizedChoiceText(decision.eventId, decision.choiceId, decision.choice) })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bias Detail Modal - 移动端全屏 */}
        {selectedBias && biasInfo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center sm:p-4 z-50">
            <div className="bg-gray-800 sm:rounded-lg w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-red-300">
                      {biasInfo.name}
                    </h2>
                    {/* 英文名称暂时隐藏，因为getLocalizedBias不返回nameEn */}
                    {/* <p className="text-gray-400 text-xs sm:text-sm mt-1">{biasInfo.nameEn}</p> */}
                  </div>
                  {/* 移动端关闭按钮 */}
                  <button
                    onClick={() => setSelectedBias(null)}
                    className="sm:hidden p-2 text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-1 sm:mb-2 text-sm sm:text-base">{t('replay.definition')}</h3>
                  <p className="text-gray-300 text-sm sm:text-base">{biasInfo.definition}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-1 sm:mb-2 text-sm sm:text-base">{t('replay.whyHappens')}</h3>
                  <p className="text-gray-300 text-sm sm:text-base">{biasInfo.mechanism}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-1 sm:mb-2 text-sm sm:text-base">{t('replay.inGame')}</h3>
                  <p className="text-gray-300 text-sm sm:text-base">{biasInfo.gameExample}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-1 sm:mb-2 text-sm sm:text-base">{t('replay.realCases')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm sm:text-base">
                    {biasInfo.realExamples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-1 sm:mb-2 text-sm sm:text-base">{t('replay.howToDetect')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm sm:text-base">
                    {biasInfo.howToDetect.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedBias(null)}
                  className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white rounded-lg transition touch-manipulation"
                >
                  {t('replay.close')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4">
          <button
            onClick={() => {
              playSound('click');
              resetGame();
            }}
            className="flex-1 px-6 sm:px-8 py-4 bg-ice-600 hover:bg-ice-500 active:bg-ice-700 text-white text-base sm:text-lg font-semibold rounded-lg transition touch-manipulation"
          >
            {t('replay.newGame')}
          </button>
          <button
            onClick={() => {
              playSound('click');
              useGameStore.setState({ phase: 'ending' });
            }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white rounded-lg transition touch-manipulation"
          >
            ← {t('replay.backToEnding')}
          </button>
        </div>
      </div>
    </div>
  );
}
