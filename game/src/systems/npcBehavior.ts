import { GameState, NPC, RoleType, ROLE_TITLES } from '../types';

/**
 * NPC行为系统
 * 根据NPC的心理状态影响其建议的可靠性和合作效果
 */

// 获取角色职位名称
const getRoleTitle = (roleId: string): string => {
  const titles = ROLE_TITLES[roleId as keyof typeof ROLE_TITLES];
  return titles?.zh || roleId;
};

/**
 * 计算NPC建议的可靠性
 * @param npc - NPC对象
 * @returns 可靠性百分比 (0-100)
 */
export const getNPCAdviceReliability = (npc: NPC): number => {
  if (!npc.alive) return 0;

  // 基础可靠性
  let reliability = 100;

  // 根据心理状态调整
  switch (npc.mentalState) {
    case 'calm':
      reliability = 100; // 冷静状态，建议完全可靠
      break;
    case 'agitated':
      reliability = 70; // 激动状态，建议有30%不可靠
      break;
    case 'panicked':
      reliability = 30; // 恐慌状态，建议有70%不可靠
      break;
  }

  // 根据HP状态进一步调整
  if (npc.hp <= 20) {
    reliability *= 0.5; // 极低HP，可靠性减半
  } else if (npc.hp <= 40) {
    reliability *= 0.8; // 低HP，可靠性降低20%
  }

  return Math.round(reliability);
};

/**
 * 判断NPC的建议是否应该被信任
 * @param npc - NPC对象
 * @param threshold - 可靠性阈值（默认70%）
 * @returns 是否应该信任
 */
export const shouldTrustNPCAdvice = (npc: NPC, threshold: number = 70): boolean => {
  const reliability = getNPCAdviceReliability(npc);
  return reliability >= threshold;
};

/**
 * 获取NPC状态的警告信息
 * @param npc - NPC对象
 * @returns 警告文本，如果无需警告则返回null
 */
export const getNPCStateWarning = (_npc: NPC): string | null => {
  // 禁用NPC状态警告提示，以增加游戏难度
  return null;
};

/**
 * 计算团队合作加成
 * @param state - 游戏状态
 * @returns 合作加成倍数 (0.5-1.5)
 */
export const getCooperationBonus = (state: GameState): number => {
  const aliveNPCs = state.npcs.filter((npc) => npc.alive);

  if (aliveNPCs.length === 0) return 1.0;

  // 计算团队士气
  let morale = 0;
  aliveNPCs.forEach((npc) => {
    // 心理状态贡献
    if (npc.mentalState === 'calm') morale += 10;
    if (npc.mentalState === 'agitated') morale += 5;
    if (npc.mentalState === 'panicked') morale -= 5;

    // 关系状态贡献
    if (npc.relationship === 'ally') morale += 5;
    if (npc.relationship === 'hostile') morale -= 10;

    // HP状态贡献
    if (npc.hp > 60) morale += 3;
    if (npc.hp <= 20) morale -= 5;
  });

  // 计算平均士气
  const avgMorale = morale / aliveNPCs.length;

  // 转换为加成倍数
  if (avgMorale >= 15) return 1.5; // 高士气：+50%效果
  if (avgMorale >= 8) return 1.2;  // 中高士气：+20%效果
  if (avgMorale >= 0) return 1.0;  // 中等士气：正常效果
  if (avgMorale >= -8) return 0.8; // 低士气：-20%效果
  return 0.5; // 极低士气：-50%效果
};

/**
 * 获取特定NPC对特定选择的建议
 * @param npcRole - NPC角色ID
 * @param state - 游戏状态
 * @returns 建议文本和可靠性
 */
export const getNPCAdvice = (
  npcRole: RoleType,
  state: GameState
): { advice: string; reliability: number } | null => {
  const npc = state.npcs.find((n) => n.roleId === npcRole);

  if (!npc || !npc.alive) return null;

  const reliability = getNPCAdviceReliability(npc);

  // 根据心理状态生成建议风格
  const title = getRoleTitle(npc.roleId);
  let advice = '';
  switch (npc.mentalState) {
    case 'calm':
      advice = `${title}冷静分析`;
      break;
    case 'agitated':
      advice = `${title}激动地建议`;
      break;
    case 'panicked':
      advice = `${title}慌乱地喊道`;
      break;
  }

  return { advice, reliability };
};

/**
 * 检查团队是否处于危机状态
 * @param state - 游戏状态
 * @returns 是否处于危机
 */
export const isTeamInCrisis = (state: GameState): boolean => {
  const aliveNPCs = state.npcs.filter((npc) => npc.alive);

  if (aliveNPCs.length <= 2) return true; // 只剩2人或更少

  const panickedCount = aliveNPCs.filter((npc) => npc.mentalState === 'panicked').length;
  if (panickedCount >= aliveNPCs.length / 2) return true; // 半数以上恐慌

  const lowHealthCount = aliveNPCs.filter((npc) => npc.hp <= 30).length;
  if (lowHealthCount >= aliveNPCs.length / 2) return true; // 半数以上低血

  const hostileCount = aliveNPCs.filter((npc) => npc.relationship === 'hostile').length;
  if (hostileCount >= 2) return true; // 2个或以上敌对

  return false;
};

/**
 * 获取团队状态描述
 * @param state - 游戏状态
 * @returns 状态描述
 */
export const getTeamStatusDescription = (state: GameState): string => {
  const cooperationBonus = getCooperationBonus(state);

  if (cooperationBonus >= 1.5) return '团队士气高昂！';
  if (cooperationBonus >= 1.2) return '团队状态良好';
  if (cooperationBonus >= 1.0) return '团队状态正常';
  if (cooperationBonus >= 0.8) return '团队士气低落';
  return '团队濒临崩溃';
};
