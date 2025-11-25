import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { getAvailableChoices } from '../data/events';
import { ROLES } from '../data/roles';
// NPC状态警告已禁用以增加游戏难度
import { playSound, audioSystem } from '../systems/audioSystem';
import { EventChoice } from '../types';
import { useTranslation } from '../i18n';
import { getLocalizedEvent } from '../i18n/eventTranslations';
import { getLocalizedRole } from '../i18n/gameContent';

export default function GamePlay() {
  const { t, language } = useTranslation();
  const {
    day,
    playerRole,
    playerHP,
    stressClock,
    beaconProgress,
    npcs,
    currentEvent,
    makeChoice,
    perfectStreak,
    phase,
    lastStreakReward,
    clearStreakReward,
  } = useGameStore();

  // 连击奖励提示状态
  const [streakNotification, setStreakNotification] = useState<string | null>(null);

  const prevStressRef = useRef(stressClock);

  // 监听压力变化播放音效
  useEffect(() => {
    if (stressClock > prevStressRef.current) {
      // 压力增加
      if (stressClock >= 13) {
        playSound('stress_critical');
      } else if (stressClock >= 10) {
        playSound('stress_warning');
      } else {
        playSound('stress_tick');
      }
    }
    prevStressRef.current = stressClock;
  }, [stressClock]);

  // 根据游戏状态更新背景音乐
  useEffect(() => {
    audioSystem.updateMusicForGameState(stressClock, phase);
  }, [stressClock, phase]);

  // 播放新事件开始音效
  useEffect(() => {
    if (currentEvent) {
      playSound('event_start');
    }
  }, [currentEvent?.id, playSound]);

  // 监听连击奖励变化
  useEffect(() => {
    if (lastStreakReward) {
      const key = `streak.reward${lastStreakReward}` as const;
      setStreakNotification(t(key));
      playSound('perfect');

      // 3秒后清除提示
      const timer = setTimeout(() => {
        setStreakNotification(null);
        clearStreakReward();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [lastStreakReward, t, clearStreakReward]);

  // 处理选择并播放相应音效
  const handleChoice = (choice: EventChoice) => {
    playSound('choice_select');

    // 根据选择类型预播放音效
    setTimeout(() => {
      if (choice.consequences.perfectDecision) {
        playSound('perfect');
      } else if (choice.consequences.biasRecorded) {
        playSound('trap');
      }

      if (choice.consequences.npcDeath && choice.consequences.npcDeath.length > 0) {
        setTimeout(() => playSound('death'), 300);
      }
    }, 200);

    makeChoice(choice);
  };

  // 获取完整的游戏状态用于前置条件检查
  const gameState = useGameStore.getState();

  if (!playerRole || !currentEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4 fade-in">
          <div className="text-xl sm:text-2xl text-ice-200 animate-pulse">{t('game.loading')}</div>
          <div className="text-sm text-gray-400">{t('game.day', { day })}</div>
        </div>
      </div>
    );
  }

  const choices = getAvailableChoices(currentEvent, playerRole, gameState);

  // 获取本地化的事件内容
  const localizedEvent = getLocalizedEvent(currentEvent.id, language);

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-8 pt-14 sm:pt-4 md:pt-8">
      {/* 连击奖励提示 */}
      {streakNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg font-bold text-lg">
            {streakNotification}
          </div>
        </div>
      )}

      {/* Header - 游戏状态 */}
      <div className="max-w-6xl mx-auto mb-4 sm:mb-6">
        {/* 移动端：紧凑的两行布局 */}
        <div className="sm:hidden bg-gray-800/50 rounded-lg p-3 space-y-3">
          {/* 第一行：天数、HP、压力 */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-[10px] text-gray-400">{t('game.dayLabel')}</div>
              <div className="text-xl font-bold text-ice-300">{day}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-gray-400">{t('game.yourHP')}</div>
              <div className={`text-xl font-bold ${
                playerHP <= 20 ? 'text-red-500 animate-pulse' :
                playerHP <= 40 ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {playerHP}{playerHP <= 20 && t('ui.dangerWarning')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-gray-400">{t('game.stressClock')}</div>
              <div className={`text-xl font-bold ${
                stressClock >= 13 ? 'text-red-500 animate-pulse' :
                stressClock >= 8 ? 'text-orange-400' :
                'text-red-400'
              }`}>
                {stressClock}/{t('ui.maxStress')}
              </div>
            </div>
          </div>
          {/* 压力条 */}
          <div className="flex gap-0.5">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-sm ${
                  i < stressClock ?
                    (stressClock >= 13 ? 'bg-red-600' : 'bg-red-500') :
                    'bg-gray-700'
                }`}
              />
            ))}
          </div>
          {/* 第二行：信标、连击 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <div className="text-[10px] text-gray-400">{t('game.beaconProgress')}</div>
              <div className="text-lg font-bold text-blue-400">
                {beaconProgress === 'failed' ? t('ui.failed') : `${beaconProgress}%`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-gray-400">{t('game.perfectStreak')}</div>
              <div className={`text-lg font-bold ${
                perfectStreak >= 7 ? 'text-purple-400 animate-pulse' :
                perfectStreak >= 5 ? 'text-yellow-400' :
                perfectStreak >= 3 ? 'text-orange-400' :
                perfectStreak > 0 ? 'text-green-400' :
                'text-gray-500'
              }`}>
                {perfectStreak > 0 ? t('ui.streakStar', { count: perfectStreak }) : '0'}
              </div>
            </div>
          </div>
        </div>

        {/* 桌面端：原有的5列布局 */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-800/50 rounded-lg p-4">
          <div>
            <div className="text-xs text-gray-400">{t('game.dayLabel')}</div>
            <div className="text-2xl font-bold text-ice-300">{day}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">{t('game.yourHP')}</div>
            <div className={`text-2xl font-bold ${
              playerHP <= 20 ? 'text-red-500 animate-pulse' :
              playerHP <= 40 ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {playerHP}
              {playerHP <= 20 && <span className="text-xs ml-1">{t('ui.dangerWarning')}</span>}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">{t('game.stressClock')}</div>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${
                stressClock >= 13 ? 'text-red-500 animate-pulse' :
                stressClock >= 8 ? 'text-orange-400' :
                'text-red-400'
              }`}>
                {stressClock}
              </div>
              <div className="text-sm text-gray-500">/{t('ui.maxStress')}</div>
            </div>
            <div className="mt-1 flex gap-0.5">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-full rounded-sm ${
                    i < stressClock ?
                      (stressClock >= 13 ? 'bg-red-600' : 'bg-red-500') :
                      'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">{t('game.beaconProgress')}</div>
            <div className="text-2xl font-bold text-blue-400">
              {beaconProgress === 'failed' ? t('ui.failed') : `${beaconProgress}%`}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">{t('game.perfectStreak')}</div>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${
                perfectStreak >= 7 ? 'text-purple-400 animate-pulse' :
                perfectStreak >= 5 ? 'text-yellow-400' :
                perfectStreak >= 3 ? 'text-orange-400' :
                perfectStreak > 0 ? 'text-green-400' :
                'text-gray-500'
              }`}>
                {perfectStreak > 0 ? t('ui.streakStar', { count: perfectStreak }) : '0'}
              </div>
            </div>
            {perfectStreak > 0 && perfectStreak < 7 && (
              <div className="text-xs text-gray-400 mt-1">
                {perfectStreak < 3 && t('game.streakReward', { count: 3 - perfectStreak })}
                {perfectStreak >= 3 && perfectStreak < 5 && t('game.streakReward', { count: 5 - perfectStreak })}
                {perfectStreak >= 5 && perfectStreak < 7 && t('game.streakReward', { count: 7 - perfectStreak })}
              </div>
            )}
            {perfectStreak >= 7 && (
              <div className="text-xs text-purple-300 mt-1 font-semibold">
                {t('game.peakState')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Event Title */}
        <div className="text-center space-y-2 fade-in">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-ice-200">
            {localizedEvent?.name || currentEvent.name}
          </h2>
        </div>

        {/* Event Scene */}
        <div className="bg-gray-800/70 rounded-lg p-4 sm:p-6 slide-up">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
            {localizedEvent?.scene || currentEvent.scene}
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-2 sm:space-y-3">
          {choices.map((choice, index) => {
            // 获取技能成本信息
            let skillCost = null;
            if (choice.type === 'skill' && choice.roleSpecific && playerRole) {
              const role = ROLES[choice.roleSpecific];
              if (role?.skill) {
                skillCost = role.skill.cost;
              }
            }

            // NPC状态警告已禁用（返回null）

            return (
              <div key={choice.id} className="space-y-2 choice-appear" style={{ animationDelay: `${index * 0.1}s` }}>
                <button
                  onClick={() => handleChoice(choice)}
                  onMouseEnter={() => playSound('choice_hover')}
                  className="choice-button choice-button-neutral w-full text-left text-sm sm:text-base touch-manipulation min-h-[48px]"
                >
                  <div className="flex items-start sm:items-center justify-between flex-1 gap-2">
                    <span className="flex-1">{localizedEvent?.getChoiceText(choice.id) || choice.text}</span>
                    {skillCost && (
                      <span
                        className={`shrink-0 px-2 py-1 rounded text-xs font-semibold ${
                          skillCost.type === 'hp'
                            ? 'bg-red-900/50 text-red-300 border border-red-700'
                            : 'bg-orange-900/50 text-orange-300 border border-orange-700'
                        }`}
                        title={skillCost.type === 'hp' ? t('game.skillCostHP') : t('game.skillCostStress')}
                      >
                        {skillCost.type === 'hp' ? t('ui.hpHeart') : t('ui.energyBolt')} -{skillCost.value}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* NPCs Status */}
        <div className="mt-6 sm:mt-8 pb-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2 sm:mb-3">{t('game.teamStatus')}</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
            {npcs.map((npc) => {
              const npcRole = ROLES[npc.roleId];
              const localizedRole = getLocalizedRole(npc.roleId, language);
              const mentalStateText =
                npc.mentalState === 'calm' ? t('npc.calm') :
                npc.mentalState === 'agitated' ? t('npc.agitated') :
                npc.mentalState === 'panicked' ? t('npc.panicked') : npc.mentalState;

              return (
                <div
                  key={npc.roleId}
                  className={`bg-gray-800/50 rounded p-1.5 sm:p-2 text-[10px] sm:text-xs ${
                    !npc.alive ? 'opacity-50' : ''
                  }`}
                >
                  <div className="font-semibold truncate">{localizedRole?.occupation || npcRole?.occupation || npc.roleId}</div>
                  <div className={`${
                    !npc.alive ? 'text-gray-600' :
                    npc.hp <= 20 ? 'text-red-500 font-bold' :
                    npc.hp <= 40 ? 'text-yellow-400' :
                    'text-gray-400'
                  }`}>
                    {npc.alive ? (
                      <>
                        HP: {npc.hp}
                        {npc.hp <= 20 && <span className="ml-0.5">{t('ui.dangerWarning')}</span>}
                      </>
                    ) : t('ui.dead')}
                  </div>
                  {npc.alive && (
                    <div className={`text-[10px] sm:text-xs ${
                      npc.mentalState === 'calm' ? 'text-green-400' :
                      npc.mentalState === 'agitated' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {mentalStateText}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
