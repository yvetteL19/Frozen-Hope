import { useGameStore } from '../stores/gameStore';
import { getAvailableChoices } from '../data/events';
import { ROLES } from '../data/roles';

export default function GamePlay() {
  const {
    day,
    playerRole,
    playerHP,
    stressClock,
    beaconProgress,
    npcs,
    currentEvent,
    makeChoice,
  } = useGameStore();

  if (!playerRole || !currentEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 fade-in">
          <div className="text-2xl text-ice-200 animate-pulse">正在加载下一个事件...</div>
          <div className="text-sm text-gray-400">第 {day} 天</div>
        </div>
      </div>
    );
  }

  const choices = getAvailableChoices(currentEvent, playerRole);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header - 游戏状态 */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800/50 rounded-lg p-4">
          <div>
            <div className="text-xs text-gray-400">第 X 天</div>
            <div className="text-2xl font-bold text-ice-300">{day}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">你的HP</div>
            <div className={`text-2xl font-bold ${
              playerHP <= 20 ? 'text-red-500 animate-pulse' :
              playerHP <= 40 ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {playerHP}
              {playerHP <= 20 && <span className="text-xs ml-1">⚠️</span>}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">压力时钟</div>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${
                stressClock >= 12 ? 'text-red-500 animate-pulse' :
                stressClock >= 8 ? 'text-orange-400' :
                'text-red-400'
              }`}>
                {stressClock}
              </div>
              <div className="text-sm text-gray-500">/ 15</div>
            </div>
            <div className="mt-1 flex gap-0.5">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-full rounded-sm ${
                    i < stressClock ?
                      (stressClock >= 12 ? 'bg-red-600' : 'bg-red-500') :
                      'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">信标进度</div>
            <div className="text-2xl font-bold text-blue-400">
              {beaconProgress === 'failed' ? '❌' : `${beaconProgress}%`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Event Title */}
        <div className="text-center space-y-2 fade-in">
          <h2 className="text-3xl font-bold text-ice-200">
            {currentEvent.name}
          </h2>
        </div>

        {/* Event Scene */}
        <div className="bg-gray-800/70 rounded-lg p-6 slide-up">
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {currentEvent.scene}
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => makeChoice(choice)}
              className="choice-button choice-button-neutral w-full text-left"
            >
              <span className="flex-1">{choice.text}</span>
            </button>
          ))}
        </div>

        {/* NPCs Status */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">团队状态</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {npcs.map((npc) => {
              const npcRole = ROLES[npc.roleId];
              const mentalStateText =
                npc.mentalState === 'calm' ? '冷静' :
                npc.mentalState === 'agitated' ? '激动' :
                npc.mentalState === 'panicked' ? '恐慌' : npc.mentalState;

              return (
                <div
                  key={npc.roleId}
                  className={`bg-gray-800/50 rounded p-2 text-xs ${
                    !npc.alive ? 'opacity-50' : ''
                  }`}
                >
                  <div className="font-semibold">{npc.name}</div>
                  <div className="text-gray-500 text-xs">{npcRole?.occupation}</div>
                  <div className={`${
                    !npc.alive ? 'text-gray-600' :
                    npc.hp <= 20 ? 'text-red-500 font-bold' :
                    npc.hp <= 40 ? 'text-yellow-400' :
                    'text-gray-400'
                  }`}>
                    {npc.alive ? (
                      <>
                        HP: {npc.hp}
                        {npc.hp <= 20 && <span className="ml-1">⚠️</span>}
                      </>
                    ) : '💀 已死亡'}
                  </div>
                  {npc.alive && (
                    <div className={`text-xs ${
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
