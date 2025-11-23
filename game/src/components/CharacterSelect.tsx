import { PLAYABLE_ROLES } from '../data/roles';
import { useGameStore } from '../stores/gameStore';
import { ROLE_TITLES } from '../types';
import { playSound } from '../systems/audioSystem';
import { useTranslation } from '../i18n';
import { getLocalizedRole } from '../i18n/gameContent';

export default function CharacterSelect() {
  const { t, language } = useTranslation();
  const startGame = useGameStore((state) => state.startGame);

  // 现在只有CEO一个可选角色
  const role = PLAYABLE_ROLES.ceo;

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty);
  };

  const handleStart = () => {
    playSound('choice_select');
    startGame('ceo');
  };

  const getRoleTitle = (roleId: string) => {
    const titles = ROLE_TITLES[roleId as keyof typeof ROLE_TITLES];
    return language === 'en' ? titles?.en : titles?.zh;
  };

  const handleBack = () => {
    playSound('click');
    useGameStore.setState({ phase: 'start' });
  };

  const localized = getLocalizedRole(role.id, language);

  return (
    <div className="min-h-screen px-3 sm:px-4 py-16 sm:py-8 flex items-center justify-center">
      <div className="max-w-lg mx-auto space-y-6 sm:space-y-8 fade-in">
        <div className="text-center space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ice-200">
            {language === 'en' ? 'Your Role' : '你的角色'}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 px-2">
            {language === 'en'
              ? 'You are the company CEO. Lead your team to survival.'
              : '你是公司CEO，带领团队在绝境中求生。'}
          </p>
        </div>

        <div
          className="bg-gray-800/50 border-2 border-ice-500 rounded-lg p-4 sm:p-6"
        >
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-ice-300">
                {getRoleTitle(role.id)}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {t('select.difficulty')}: {getDifficultyStars(role.difficulty)}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-300">{localized?.description || role.description}</p>

            <div className="border-t border-gray-700 pt-3 space-y-2">
              <div>
                <span className="text-xs text-purple-400 font-semibold">
                  {t('select.skill')}: {localized?.skill.name || role.skill.name}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  {localized?.skill.description || role.skill.description}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                {t('select.cost')}:{' '}
                {role.skill.cost.type === 'hp'
                  ? `-${role.skill.cost.value} HP`
                  : `+${role.skill.cost.value} ${t('select.stress')}`}
              </div>
            </div>

            <button
              onClick={handleStart}
              onMouseEnter={() => playSound('choice_hover')}
              className="w-full py-3 sm:py-2 bg-ice-600 hover:bg-ice-500 active:bg-ice-700 text-white font-semibold rounded transition text-sm touch-manipulation"
            >
              {language === 'en' ? 'Begin Survival' : '开始求生'}
            </button>
          </div>
        </div>

        <div className="text-center pb-4">
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-300 active:text-gray-200 text-sm py-2 px-4 touch-manipulation"
          >
            ← {t('select.back')}
          </button>
        </div>
      </div>
    </div>
  );
}
