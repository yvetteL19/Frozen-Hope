import { Event, EventPrerequisite, GameState } from '../types';
import { ACT1_EVENTS } from './events-act1';
import { ACT2_EVENTS } from './events-act2';
import { ACT3_EVENTS } from './events-act3';

export const ALL_EVENTS: Event[] = [
  ...ACT1_EVENTS,
  ...ACT2_EVENTS,
  ...ACT3_EVENTS,
];

// 事件前置条件检查（通用版本）
export const checkPrerequisites = (
  prerequisites: EventPrerequisite[] | undefined,
  state: GameState
): boolean => {
  if (!prerequisites || prerequisites.length === 0) return true;

  return prerequisites.every((prereq) => {
    switch (prereq.type) {
      case 'npc_alive': {
        const npc = state.npcs.find((n) => n.roleId === prereq.target);
        return npc?.alive === prereq.value;
      }

      case 'npc_hp': {
        const npc = state.npcs.find((n) => n.roleId === prereq.target);
        if (!npc) return false;

        if (prereq.condition === '<') return npc.hp < (prereq.value as number);
        if (prereq.condition === '>') return npc.hp > (prereq.value as number);
        if (prereq.condition === '>=') return npc.hp >= (prereq.value as number);
        if (prereq.condition === '<=') return npc.hp <= (prereq.value as number);
        if (prereq.condition === '==') return npc.hp === prereq.value;
        return false;
      }

      case 'beacon_progress': {
        if (prereq.condition === '>') return typeof state.beaconProgress === 'number' && state.beaconProgress > (prereq.value as number);
        if (prereq.condition === '!=') return state.beaconProgress !== prereq.value;
        return false;
      }

      case 'day': {
        if (prereq.condition === '>=') return state.day >= (prereq.value as number);
        if (prereq.condition === '==') return state.day === prereq.value;
        return false;
      }

      case 'stress': {
        if (prereq.condition === '>=') return state.stressClock >= (prereq.value as number);
        return false;
      }

      case 'skill_revealed': {
        const npc = state.npcs.find((n) => n.roleId === prereq.target);
        return npc?.skillRevealed === prereq.value;
      }

      case 'authority_established': {
        return !!state.flags['ceo_authority_established'];
      }

      default:
        return true;
    }
  });
};

// 针对玩家的前置条件检查（自动允许使用自己的技能）
export const checkPrerequisitesForPlayer = (
  prerequisites: EventPrerequisite[] | undefined,
  state: GameState,
  playerRole: string
): boolean => {
  if (!prerequisites || prerequisites.length === 0) return true;

  return prerequisites.every((prereq) => {
    // 关键修复：玩家自己的技能无需skill_revealed检查
    if (prereq.type === 'skill_revealed' && prereq.target === playerRole) {
      return true;
    }

    // 其他所有前置条件使用标准检查逻辑
    switch (prereq.type) {
      case 'npc_alive': {
        const npc = state.npcs.find((n) => n.roleId === prereq.target);
        return npc?.alive === prereq.value;
      }

      case 'npc_hp': {
        const npc = state.npcs.find((n) => n.roleId === prereq.target);
        if (!npc) return false;

        if (prereq.condition === '<') return npc.hp < (prereq.value as number);
        if (prereq.condition === '>') return npc.hp > (prereq.value as number);
        if (prereq.condition === '>=') return npc.hp >= (prereq.value as number);
        if (prereq.condition === '<=') return npc.hp <= (prereq.value as number);
        if (prereq.condition === '==') return npc.hp === prereq.value;
        return false;
      }

      case 'beacon_progress': {
        if (prereq.condition === '>') return typeof state.beaconProgress === 'number' && state.beaconProgress > (prereq.value as number);
        if (prereq.condition === '!=') return state.beaconProgress !== prereq.value;
        return false;
      }

      case 'day': {
        if (prereq.condition === '>=') return state.day >= (prereq.value as number);
        if (prereq.condition === '==') return state.day === prereq.value;
        return false;
      }

      case 'stress': {
        if (prereq.condition === '>=') return state.stressClock >= (prereq.value as number);
        return false;
      }

      case 'skill_revealed': {
        const npc = state.npcs.find((n) => n.roleId === prereq.target);
        return npc?.skillRevealed === prereq.value;
      }

      case 'authority_established': {
        return !!state.flags['ceo_authority_established'];
      }

      default:
        return true;
    }
  });
};

// 从事件池中选择事件
export const selectEventsForAct = (
  act: 1 | 2 | 3,
  state: GameState,
  count: number
): Event[] => {
  const actEvents = ALL_EVENTS.filter((e) => e.act === act);
  const eligibleEvents = actEvents.filter(
    (event) => {
      // 排除已完成的事件
      if (state.completedEvents.includes(event.id)) return false;

      // 检查前置条件
      if (!checkPrerequisites(event.prerequisites, state)) return false;

      // 注意：不再过滤玩家角色在npcsInvolved中的事件
      // 玩家应该能体验到以自己角色为主角的事件
      // 前置条件系统已经处理了NPC存活等要求

      return true;
    }
  );

  // 优先选择有玩家角色专属选项的事件
  const eventsWithPlayerOptions = eligibleEvents.filter((event) =>
    event.choices.some((choice) => choice.roleSpecific === state.playerRole)
  );

  const eventsWithoutPlayerOptions = eligibleEvents.filter(
    (event) => !eventsWithPlayerOptions.includes(event)
  );

  // 优先从有专属选项的事件中选择，再从其他事件中补充
  const prioritized = [
    ...eventsWithPlayerOptions.sort(() => Math.random() - 0.5),
    ...eventsWithoutPlayerOptions.sort(() => Math.random() - 0.5),
  ];

  return prioritized.slice(0, Math.min(count, prioritized.length));
};

// Fisher-Yates 洗牌算法随机打乱数组
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 获取事件的可用选项（基于玩家角色和前置条件）
export const getAvailableChoices = (event: Event, playerRole: string, state: GameState) => {
  const availableChoices = event.choices.filter((choice) => {
    // 检查是否有角色限制
    if (choice.roleSpecific && choice.roleSpecific !== playerRole) {
      return false;
    }

    // 检查选项的前置条件（使用针对玩家的检查函数）
    if (choice.prerequisites) {
      if (!checkPrerequisitesForPlayer(choice.prerequisites, state, playerRole)) {
        return false;
      }
    }

    return true;
  });

  // 随机打乱选项顺序，防止第一个总是陷阱选项
  return shuffleArray(availableChoices);
};
