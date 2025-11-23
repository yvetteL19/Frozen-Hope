import { Role, PlayableRoleType, NPCRoleType, RoleType } from '../types';

// 可选角色（玩家可以扮演）- 仅CEO
export const PLAYABLE_ROLES: Record<PlayableRoleType, Role> = {
  ceo: {
    id: 'ceo',
    occupation: 'CEO',
    description: '公司创始人，习惯于发号施令。在危机中试图维持控制。',
    personality: '权威、理性（但可能过于自信）、有领导欲',
    secret: '患有慢性疾病（未向团队透露）',
    skill: {
      id: 'command',
      name: '指挥',
      description: '强制终止争论，让团队听从你的决定',
      cost: {
        type: 'stress',
        value: 2,
      },
    },
    difficulty: 4,
    startingHP: 100,
  },
};

// NPC角色（固定为NPC，不可选择）- 包含程序员
export const NPC_ROLES: Record<NPCRoleType, Role> = {
  programmer: {
    id: 'programmer',
    occupation: '程序员',
    description: '技术宅，不擅社交但逻辑清晰。',
    personality: '理性、内向、完美主义、在压力下可能崩溃',
    secret: '对数字和概率有敏锐直觉',
    skill: {
      id: 'repair',
      name: '修复',
      description: '修理电子设备，尤其是救援信标',
      cost: {
        type: 'hp',
        value: 10,
      },
    },
    difficulty: 2,
    startingHP: 100,
  },

  assistant: {
    id: 'assistant',
    occupation: '助理',
    description: '看似柔弱，实则韧性惊人。',
    personality: '温和、善于倾听、常被低估',
    secret: '曾是医学院学生（因家庭原因辍学，但保留了医疗知识）',
    skill: {
      id: 'first_aid',
      name: '急救',
      description: '治疗自己或他人的伤势（恢复15-25 HP）',
      cost: {
        type: 'hp',
        value: 3,
      },
      cooldown: 2,
    },
    difficulty: 2,
    startingHP: 100,
  },

  guide: {
    id: 'guide',
    occupation: '向导',
    description: '经验丰富的登山向导，对自然规律了如指掌。',
    personality: '沉稳、实用主义、对公司政治不感兴趣',
    secret: '曾在类似危机中存活（但那是在不同条件下）',
    skill: {
      id: 'wilderness_wisdom',
      name: '荒野智慧',
      description: '识别环境中的真正危险，找到自然资源',
      cost: {
        type: 'hp',
        value: 8,
      },
    },
    difficulty: 3,
    startingHP: 100,
  },

  pilot: {
    id: 'pilot',
    occupation: '飞行员',
    description: '经验丰富的商务飞行员，对机械和飞机结构了如指掌。',
    personality: '务实、责任感强、可能因事故自责',
    secret: '在坠机中腿部受伤',
    skill: {
      id: 'mechanical_knowledge',
      name: '机械知识',
      description: '了解飞机残骸结构，找到隐藏物资或加固避难所',
      cost: {
        type: 'hp',
        value: 8,
      },
    },
    difficulty: 4,
    startingHP: 90, // 因腿伤，开局HP略低
  },

  sales: {
    id: 'sales',
    occupation: '销售总监',
    description: '能言善辩，擅长读懂人心并影响他人。',
    personality: '机敏、自私倾向、善于操纵但也能鼓舞士气',
    secret: '在危机中可能展现出极端自私或意外的英雄主义',
    skill: {
      id: 'negotiation',
      name: '谈判',
      description: '说服一个"激动"或"恐慌"的NPC暂时冷静下来',
      cost: {
        type: 'stress',
        value: 2,
      },
    },
    difficulty: 3,
    startingHP: 100,
  },
};

// 所有角色（合并）
export const ROLES: Record<RoleType, Role> = {
  ...PLAYABLE_ROLES,
  ...NPC_ROLES,
};

// 获取所有可选角色
export const getPlayableRoles = (): Role[] => {
  return Object.values(PLAYABLE_ROLES);
};

// 获取所有NPC角色
export const getNPCRoles = (): Role[] => {
  return Object.values(NPC_ROLES);
};

// 获取所有角色（兼容旧代码）
export const getAllRoles = (): Role[] => {
  return Object.values(ROLES);
};

// 根据ID获取角色
export const getRoleById = (id: RoleType): Role | undefined => {
  return ROLES[id];
};

// 获取NPC的roleId列表（包含程序员）
export const NPC_ROLE_IDS: NPCRoleType[] = ['programmer', 'assistant', 'guide', 'pilot', 'sales'];
