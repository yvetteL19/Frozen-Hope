import { Role } from '../types';

export const ROLES: Record<string, Role> = {
  ceo: {
    id: 'ceo',
    name: 'Alex Chen',
    age: 35,
    occupation: 'CEO（首席执行官）',
    description: '公司创始人，习惯于发号施令。在危机中试图维持控制。',
    personality: '权威、理性（但可能过于自信）、有领导欲',
    secret: '患有慢性疾病（未向团队透露）',
    skill: {
      id: 'command',
      name: '指挥',
      description: '强制终止争论，让团队听从你的决定',
      cost: {
        type: 'stress',
        value: 1,
      },
    },
    difficulty: 4,
    startingHP: 100,
  },

  programmer: {
    id: 'programmer',
    name: 'David Park',
    age: 28,
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
        value: 8,
      },
    },
    difficulty: 2,
    startingHP: 100,
  },

  assistant: {
    id: 'assistant',
    name: 'Sarah Kim',
    age: 24,
    occupation: '助理',
    description: '看似柔弱，实则韧性惊人。',
    personality: '温和、善于倾听、常被低估',
    secret: '曾是医学院学生（因家庭原因辍学，但保留了医疗知识）',
    skill: {
      id: 'first_aid',
      name: '急救',
      description: '治疗自己或他人的伤势（恢复10-20 HP）',
      cost: {
        type: 'hp',
        value: 5,
      },
      cooldown: 2, // 每天限用2次
    },
    difficulty: 2,
    startingHP: 100,
  },

  guide: {
    id: 'guide',
    name: 'Tom Wilson',
    age: 42,
    occupation: '登山向导',
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
    name: 'Mark Johnson',
    age: 33,
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
    startingHP: 75, // 因腿伤，开局HP较低
  },

  sales: {
    id: 'sales',
    name: 'Lisa Anderson',
    age: 38,
    occupation: '销售总监',
    description: '能言善辩，擅长读懂人心并影响他人。',
    personality: '机敏、自私倾向、善于操纵但也能鼓舞士气',
    secret: '在危机中可能展现出极端自私或意外的英雄主义',
    skill: {
      id: 'negotiation',
      name: '谈判',
      description: '说服一个"激动"或"恐慌"的NPC暂时冷静下来，或尝试修复敌对关系（50%成功率）',
      cost: {
        type: 'stress',
        value: 1,
      },
    },
    difficulty: 3,
    startingHP: 100,
  },
};

export const getRoleById = (id: string): Role | undefined => {
  return ROLES[id];
};

export const getAllRoles = (): Role[] => {
  return Object.values(ROLES);
};
