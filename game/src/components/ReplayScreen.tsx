import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { getBiasInfo } from '../data/biases';

export default function ReplayScreen() {
  const { cognitiveTraps, perfectDecisions, resetGame } = useGameStore();
  const [selectedBias, setSelectedBias] = useState<string | null>(null);

  const biasInfo = selectedBias ? getBiasInfo(selectedBias) : null;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-ice-200">你的心理复盘</h1>
          <p className="text-gray-400">
            回顾你在这次求生旅程中的认知陷阱和完美决策
          </p>
        </div>

        {/* Cognitive Traps */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-300">
            认知陷阱 ({cognitiveTraps.length})
          </h2>
          {cognitiveTraps.length === 0 ? (
            <div className="bg-green-900/20 border border-green-600 rounded-lg p-6 text-center">
              <p className="text-2xl mb-2">🎉 完美理性者 🎉</p>
              <p className="text-gray-300">
                你在整个求生过程中，没有陷入任何认知陷阱！
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cognitiveTraps.map((trap, index) => (
                <div
                  key={index}
                  className="bg-red-900/20 border border-red-600/50 rounded-lg p-4 cursor-pointer hover:bg-red-900/30 transition"
                  onClick={() => setSelectedBias(trap.bias)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-red-300">
                        {trap.eventName}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        第{trap.day}天 | 你的选择: {trap.choice}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-red-600/30 rounded">
                      {trap.bias}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Perfect Decisions */}
        {perfectDecisions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-300">
              完美决策 ({perfectDecisions.length})
            </h2>
            <div className="space-y-3">
              {perfectDecisions.map((decision, index) => (
                <div
                  key={index}
                  className="bg-green-900/20 border border-green-600/50 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-green-300">
                    {decision.eventName}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    第{decision.day}天 | 你的选择: {decision.choice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bias Detail Modal */}
        {selectedBias && biasInfo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-red-300">
                    {biasInfo.name}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">{biasInfo.nameEn}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-2">定义</h3>
                  <p className="text-gray-300">{biasInfo.definition}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-2">为什么会发生？</h3>
                  <p className="text-gray-300">{biasInfo.mechanism}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-2">在游戏中的表现</h3>
                  <p className="text-gray-300">{biasInfo.gameExample}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-2">现实案例</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {biasInfo.realExamples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-ice-300 mb-2">如何识破？</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {biasInfo.howToDetect.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedBias(null)}
                  className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="flex-1 px-8 py-4 bg-ice-600 hover:bg-ice-500 text-white text-lg font-semibold rounded-lg transition"
          >
            重新开始
          </button>
          <button
            onClick={() => useGameStore.setState({ phase: 'ending' })}
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
          >
            返回结局
          </button>
        </div>
      </div>
    </div>
  );
}
