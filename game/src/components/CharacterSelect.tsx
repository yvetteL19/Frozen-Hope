import { getAllRoles } from '../data/roles';
import { useGameStore } from '../stores/gameStore';
import { RoleType } from '../types';

export default function CharacterSelect() {
  const startGame = useGameStore((state) => state.startGame);
  const roles = getAllRoles();

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full space-y-8 fade-in">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-ice-200">选择你的角色</h2>
          <p className="text-gray-400">
            每个角色都有独特的技能和视角。首次游戏推荐选择助理或程序员。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-gray-800/50 border-2 border-gray-700 rounded-lg p-6 hover:border-ice-500 transition-all cursor-pointer group"
              onClick={() => startGame(role.id as RoleType)}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-ice-300 transition">
                    {role.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{role.occupation}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    年龄: {role.age}岁 | 难度: {getDifficultyStars(role.difficulty)}
                  </p>
                </div>

                <p className="text-sm text-gray-300">{role.description}</p>

                <div className="border-t border-gray-700 pt-3 space-y-2">
                  <div>
                    <span className="text-xs text-purple-400 font-semibold">
                      技能: {role.skill.name}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {role.skill.description}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    代价:{' '}
                    {role.skill.cost.type === 'hp'
                      ? `-${role.skill.cost.value} HP`
                      : `+${role.skill.cost.value} 压力`}
                  </div>
                </div>

                <button className="w-full py-2 bg-ice-600 hover:bg-ice-500 text-white font-semibold rounded transition text-sm">
                  选择此角色
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => useGameStore.setState({ phase: 'start' })}
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            ← 返回
          </button>
        </div>
      </div>
    </div>
  );
}
