// 游戏核心常量配置
// 集中管理所有游戏数值，避免魔法数字散布

export const GAME_CONFIG = {
  // ========== 极限值 ==========
  MAX_STRESS: 15,           // 压力时钟上限（达到即崩溃）
  MAX_PLAYER_HP: 100,       // 玩家HP上限（部分角色起始HP低于此值）
  MIN_HP: 0,                // HP下限

  // ========== 结局条件 ==========
  BEACON_RESCUE_THRESHOLD: 80,  // 信标进度达到此值触发救援结局
  GAME_DURATION_DAYS: 10,       // 游戏总天数
  BEACON_FAILED_VALUE: -999,    // 信标彻底损坏的特殊标记值

  // ========== 惩罚值 ==========
  NPC_DEATH_STRESS_PENALTY: 2,  // 每个NPC死亡增加的压力
  TRAP_STRESS_PENALTY: 3,       // 陷入认知陷阱的平均压力惩罚

  // ========== 每日环境损耗（生存压力）==========
  DAILY_ENVIRONMENTAL_DAMAGE: {
    BASE_DAMAGE: 4,             // 基础每日HP损耗（饥寒）
    STRESS_DAMAGE_THRESHOLD: 10, // 压力超过此值，每日额外损耗
    STRESS_EXTRA_DAMAGE: 2,     // 高压力额外损耗
    LATE_GAME_BONUS: 1,         // 第7天后额外损耗（物资耗尽）
    LATE_GAME_START_DAY: 7,     // 后期开始天数
  } as const,

  // ========== 连击奖励系统 ==========
  STREAK_REWARDS: {
    3: { type: 'HEAL_ALL', value: 10, description: '全员HP+10' },
    5: { type: 'STRESS_REDUCTION', value: 2, description: '压力-2' },
    7: { type: 'BEACON_PROGRESS', value: 10, description: '信标+10%' },
  } as const,

  // ========== 幕设定 ==========
  ACTS: {
    1: { startDay: 1, endDay: 3, minEvents: 2, maxEvents: 3 },
    2: { startDay: 4, endDay: 7, minEvents: 3, maxEvents: 4 },
    3: { startDay: 8, endDay: 10, minEvents: 2, maxEvents: 3 },
  } as const,

  // ========== 技能冷却 ==========
  SKILL_COOLDOWNS: {
    first_aid: 2,       // 急救技能冷却2天
    command: 1,         // 指挥技能冷却1天
    repair: 0,          // 修复无冷却（但消耗HP）
    wilderness_wisdom: 0, // 荒野智慧无冷却
    mechanical_knowledge: 0, // 机械知识无冷却
    negotiation: 1,     // 谈判冷却1天
  } as const,

  // ========== NPC行为阈值 ==========
  NPC_THRESHOLDS: {
    LOW_HP_WARNING: 20,     // HP低于此值显示警告
    CRITICAL_HP: 10,        // HP低于此值可能触发特殊事件
    AGITATED_STRESS_BONUS: 1, // 激动状态的NPC增加额外压力
    PANICKED_UNRELIABLE: true, // 恐慌状态的NPC建议不可靠
  } as const,

  // ========== 完美决策奖励 ==========
  PERFECT_DECISION_BONUS: {
    EXTRA_STRESS_REDUCTION: 1,  // 完美决策额外减压
  } as const,

} as const;

// 类型导出
export type StreakRewardType = keyof typeof GAME_CONFIG.STREAK_REWARDS;
export type ActNumber = keyof typeof GAME_CONFIG.ACTS;
export type SkillType = keyof typeof GAME_CONFIG.SKILL_COOLDOWNS;
