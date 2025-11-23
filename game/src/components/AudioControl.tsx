import { useState, useEffect } from 'react';
import { audioSystem, playSound } from '../systems/audioSystem';
import { useTranslation } from '../i18n';

export default function AudioControl() {
  const { t } = useTranslation();
  const [isMuted, setIsMuted] = useState(audioSystem.isMuted());
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(audioSystem.getSettings());

  useEffect(() => {
    // 同步静音状态
    setIsMuted(audioSystem.isMuted());
    setSettings(audioSystem.getSettings());
  }, []);

  const toggleMute = () => {
    const newMuted = audioSystem.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) {
      playSound('click');
    }
  };

  const handleMasterVolume = (value: number) => {
    audioSystem.setMasterVolume(value);
    setSettings(audioSystem.getSettings());
  };

  const handleSfxVolume = (value: number) => {
    audioSystem.setSfxVolume(value);
    setSettings(audioSystem.getSettings());
    playSound('click');
  };

  const handleMusicVolume = (value: number) => {
    audioSystem.setMusicVolume(value);
    setSettings(audioSystem.getSettings());
  };

  return (
    <div className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50">
      {/* 主按钮 */}
      <button
        onClick={toggleMute}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowSettings(!showSettings);
        }}
        className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gray-800/90 hover:bg-gray-700/90 active:bg-gray-600/90 border border-gray-600 flex items-center justify-center transition-all hover:scale-110 active:scale-95 touch-manipulation"
        title={isMuted ? t('audio.unmute') : t('audio.mute')}
      >
        {isMuted ? (
          <svg className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-4 sm:w-5 h-4 sm:h-5 text-ice-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      {/* 设置面板 */}
      {showSettings && (
        <div className="absolute top-10 sm:top-12 right-0 w-56 sm:w-64 bg-gray-800/95 border border-gray-600 rounded-lg p-3 sm:p-4 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-ice-200">{t('audio.title')}</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* 主音量 */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{t('audio.master')}</span>
                <span>{Math.round(settings.masterVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.masterVolume * 100}
                onChange={(e) => handleMasterVolume(Number(e.target.value) / 100)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-ice-400"
              />
            </div>

            {/* 音效音量 */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{t('audio.sfx')}</span>
                <span>{Math.round(settings.sfxVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.sfxVolume * 100}
                onChange={(e) => handleSfxVolume(Number(e.target.value) / 100)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-ice-400"
              />
            </div>

            {/* 音乐音量 */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{t('audio.music')}</span>
                <span>{Math.round(settings.musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.musicVolume * 100}
                onChange={(e) => handleMusicVolume(Number(e.target.value) / 100)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-ice-400"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              {t('audio.tip')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
