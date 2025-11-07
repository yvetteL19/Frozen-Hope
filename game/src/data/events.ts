import { Event, EventPrerequisite, GameState } from '../types';
import { ACT1_EVENTS } from './events-act1';
import { ACT2_EVENTS } from './events-act2';
import { ACT3_EVENTS } from './events-act3';

export const ALL_EVENTS: Event[] = [
  ...ACT1_EVENTS,
  ...ACT2_EVENTS,
  ...ACT3_EVENTS,
];

// 事件前置条件检查
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

      // 关键修复：排除玩家角色作为NPC出现在事件中的情况
      if (event.npcsInvolved && state.playerRole) {
        if (event.npcsInvolved.includes(state.playerRole)) {
          return false;
        }
      }

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

// 获取事件的可用选项（基于玩家角色）
export const getAvailableChoices = (event: Event, playerRole: string) => {
  return event.choices.filter((choice) => {
    // 检查是否有角色限制
    if (choice.roleSpecific && choice.roleSpecific !== playerRole) {
      return false;
    }

    // 通用选项总是可用
    if (!choice.roleSpecific) {
      return true;
    }

    return true;
  });
};
