import { useGameStore } from '../stores/gameStore';
import { getEnding } from '../data/endings';

export default function EndingScreen() {
  const state = useGameStore();
  const { resetGame } = useGameStore();
  const ending = getEnding(state);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl w-full space-y-8 fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-ice-200">{ending.title}</h1>
          <div className="text-3xl">
            {'⭐'.repeat(ending.rating)}
          </div>
        </div>

        <div className="bg-gray-800/70 rounded-lg p-8">
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {ending.description(state)}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => useGameStore.setState({ phase: 'replay' })}
            className="w-full px-8 py-4 bg-ice-600 hover:bg-ice-500 text-white text-lg font-semibold rounded-lg transition"
          >
            查看心理复盘
          </button>
          <button
            onClick={resetGame}
            className="w-full px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
          >
            重新开始
          </button>
        </div>
      </div>
    </div>
  );
}
