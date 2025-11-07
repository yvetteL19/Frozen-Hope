import { useGameStore } from '../stores/gameStore';

export default function StartScreen() {
  const setPhase = (phase: 'character_select') =>
    useGameStore.setState({ phase });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-8 fade-in">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ice-200 to-ice-400">
            冰封希望
          </h1>
          <h2 className="text-2xl text-ice-300">最终幸存者</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            一场坠机，六名幸存者，零下三十度的暴风雪。
            <br />
            在绝境中，你能保持理性，识破认知偏误，带领团队存活10天吗？
          </p>
        </div>

        <div className="space-y-6 pt-8">
          <button
            onClick={() => setPhase('character_select')}
            className="px-12 py-4 bg-ice-600 hover:bg-ice-500 text-white text-xl font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            开始游戏
          </button>

          <div className="text-sm text-gray-500 space-y-2">
            <p>💡 这是一款心理学互动游戏</p>
            <p>游戏时长：20-30分钟</p>
            <p>你的每个决策都将影响团队的命运</p>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-600">
          v1.0 | 基于认知心理学的叙事游戏
        </div>
      </div>
    </div>
  );
}
