// ==================== 核心枚举类型 ====================

// 可选角色（玩家可以扮演）- 简化为仅CEO
export type PlayableRoleType = 'ceo';

// NPC角色（固定为NPC）- 包含程序员
export type NPCRoleType = 'programmer' | 'assistant' | 'guide' | 'pilot' | 'sales';

// 所有角色类型
export type RoleType = PlayableRoleType | NPCRoleType;

// 角色显示名称映射
export const ROLE_TITLES: Record<RoleType, { zh: string; en: string }> = {
  ceo: { zh: 'CEO', en: 'CEO' },
  programmer: { zh: '程序员', en: 'Programmer' },
  assistant: { zh: '助理', en: 'Assistant' },
  guide: { zh: '向导', en: 'Guide' },
  pilot: { zh: '飞行员', en: 'Pilot' },
  sales: { zh: '销售总监', en: 'Sales Director' },
};

export type MentalState = 'calm' | 'agitated' | 'panicked';

export type RelationshipState = 'neutral' | 'ally' | 'hostile';

export type BiasType =
  | 'authority_bias'
  | 'mcnamara_fallacy'
  | 'false_causality'
  | 'emotional_reasoning'
  | 'sunk_cost'
  | 'survivorship_bias'
  | 'gamblers_fallacy'
  | 'confirmation_bias'
  | 'groupthink'
  | 'fundamental_attribution_error'
  | 'omission_bias'
  | 'anchoring_effect'
  | 'availability_heuristic'
  | 'backfire_effect'
  | 'just_world_fallacy'
  | 'optimism_bias'
  | 'scarcity_bias'
  | 'pattern_recognition'
  | 'group_attribution_error'
  | 'normalcy_bias';

export type EndingType = 'rescue' | 'bitter_victory' | 'survival' | 'collapse' | 'your_end';

export type GamePhase =
  | 'start'
  | 'character_select'
  | 'prologue'
  | 'act1'
  | 'act2'
  | 'act3'
  | 'ending'
  | 'replay';

// ==================== 角色相关类型 ====================

export interface Role {
  id: RoleType;
  occupation: string;
  description: string;
  personality: string;
  secret: string;
  skill: Skill;
  difficulty: 1 | 2 | 3 | 4 | 5;
  startingHP: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  cost: {
    type: 'stress' | 'hp';
    value: number;
  };
  cooldown?: number;
}

// ==================== NPC相关类型 ====================

export interface NPC {
  roleId: NPCRoleType;
  alive: boolean;
  hp: number;
  mentalState: MentalState;
  relationship: RelationshipState;
  skillRevealed: boolean;
}

// ==================== 事件相关类型 ====================

export interface Event {
  id: string;
  act: 1 | 2 | 3;
  name: string;
  bias: BiasType;
  conflict: string;
  prerequisites?: EventPrerequisite[];
  scene: string;
  npcsInvolved?: RoleType[];
  choices: EventChoice[];
}

export interface EventPrerequisite {
  type: 'npc_alive' | 'npc_hp' | 'npc_state' | 'beacon_progress' | 'day' | 'stress' | 'skill_revealed' | 'authority_established';
  target?: RoleType;
  condition?: string;
  value?: number | string | boolean;
}

export interface EventChoice {
  id: string;
  type: 'trap' | 'rational' | 'skill' | 'neutral' | 'special';
  text: string;
  roleSpecific?: RoleType;
  skillRequired?: string;
  prerequisites?: EventPrerequisite[];
  npcSuggestion?: {
    npcRole: RoleType;
    suggestsThis: boolean; // true表示NPC建议这个选项，false表示反对
  };
  consequences: EventConsequence;
  longTermEffects?: string;
}

export interface EventConsequence {
  stress?: number;
  playerHP?: number;
  npcHP?: { roleId: RoleType; value: number }[];
  npcState?: { roleId: RoleType; state: MentalState }[];
  npcRelationship?: { roleId: RoleType; relationship: RelationshipState }[];
  npcDeath?: RoleType[];
  beaconProgress?: number;
  biasRecorded?: BiasType;
  perfectDecision?: boolean;
  items?: { item: string; quantity: number }[];
  flags?: { key: string; value: boolean | string | number }[];
  description: string;
  immediateEnding?: EndingType;
}

// ==================== 游戏状态类型 ====================

export interface GameState {
  // 游戏阶段
  phase: GamePhase;
  day: number;

  // 玩家
  playerRole: PlayableRoleType | null;
  playerHP: number;

  // 核心指标
  stressClock: number;
  beaconProgress: number | 'failed';

  // NPCs
  npcs: NPC[];

  // 事件历史
  completedEvents: string[];
  currentEvent: Event | null;

  // 认知陷阱记录
  cognitiveTraps: {
    bias: BiasType;
    eventId: string;
    eventName: string;
    day: number;
    choice: string;
    choiceId: string;
  }[];

  // 完美决策记录
  perfectDecisions: {
    eventId: string;
    eventName: string;
    day: number;
    choice: string;
    choiceId: string;
  }[];

  // 完美决策连击数
  perfectStreak: number;

  // 物资
  inventory: {
    medkits: number;
    food: 'plentiful' | 'scarce' | 'last' | 'none';
  };

  // 游戏标记
  flags: Record<string, boolean | string | number>;

  // 压力历史
  stressHistory: number[];

  // 结局数据
  ending: EndingType | null;
}

// ==================== 认知偏误知识库 ====================

export interface BiasInfo {
  id: BiasType;
  name: string;
  nameEn: string;
  definition: string;
  mechanism: string;
  gameExample: string;
  realExamples: string[];
  howToDetect: string[];
  furtherReading: string[];
}

// ==================== 结局类型 ====================

export interface Ending {
  type: EndingType;
  title: string;
  rating: number; // 1-5 stars
  condition: string;
  description: (state: GameState) => string;
  survivors?: (state: GameState) => NPC[];
}

// ==================== 复盘数据 ====================

export interface ReplayData {
  endingType: EndingType;
  day: number;
  stressHistory: number[];
  cognitiveTraps: GameState['cognitiveTraps'];
  perfectDecisions: GameState['perfectDecisions'];
  npcs: NPC[];
  playerFinalHP: number;
  beaconProgress: number | 'failed';
  playerRole: PlayableRoleType;
}

// ==================== 统计数据 ====================

export interface PlayerStats {
  totalGames: number;
  endingCounts: Record<EndingType, number>;
  trapCounts: Record<BiasType, number>;
  roleUsage: Record<PlayableRoleType, number>;
  npcSurvivalRates: Record<NPCRoleType, number>;
  averagePerfectDecisions: number;
  bestRun: {
    role: PlayableRoleType;
    ending: EndingType;
    perfectDecisions: number;
    day: number;
  } | null;
}
