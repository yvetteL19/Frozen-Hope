import { create } from 'zustand';
import { GameState, RoleType, EventChoice, NPC } from '../types';
import { ROLES } from '../data/roles';
import { selectEventsForAct } from '../data/events';

interface GameStore extends GameState {
  // 核心操作
  startGame: (playerRole: RoleType) => void;
  makeChoice: (choice: EventChoice) => void;
  nextEvent: () => void;
  resetGame: () => void;

  // 辅助操作
  applyConsequences: (choice: EventChoice) => void;
  checkGameOver: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const initialState: GameState = {
  phase: 'start',
  day: 1,
  playerRole: null,
  playerHP: 100,
  stressClock: 0,
  beaconProgress: 0,
  npcs: [],
  completedEvents: [],
  currentEvent: null,
  cognitiveTraps: [],
  perfectDecisions: [],
  inventory: {
    medkits: 1,
    food: 'plentiful',
  },
  flags: {},
  stressHistory: [0],
  ending: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: (playerRole: RoleType) => {
    const selectedRole = ROLES[playerRole];
    if (!selectedRole) return;

    // 初始化NPCs（除了玩家选择的角色）
    const npcs: NPC[] = Object.keys(ROLES)
      .filter((roleId) => roleId !== playerRole)
      .map((roleId) => ({
        roleId: roleId as RoleType,
        name: ROLES[roleId].name,
        alive: true,
        hp: ROLES[roleId].startingHP,
        mentalState: 'calm',
        relationship: 'neutral',
        skillRevealed: false,
      }));

    set({
      ...initialState,
      phase: 'act1',
      day: 1, // 从第1天开始
      playerRole,
      playerHP: selectedRole.startingHP,
      npcs,
      stressHistory: [0],
    });

    // 选择第一幕事件
    setTimeout(() => {
      const state = get();
      const events = selectEventsForAct(1, state, 1); // 先加载1个事件
      if (events.length > 0) {
        set({ currentEvent: events[0] });
      }
    }, 100);
  },

  makeChoice: (choice: EventChoice) => {
    const state = get();
    if (!state.currentEvent) return;

    // 应用后果
    get().applyConsequences(choice);

    // 记录完成的事件
    set((s) => ({
      completedEvents: [...s.completedEvents, state.currentEvent!.id],
      currentEvent: null,
    }));

    // 保存进度
    get().saveToLocalStorage();

    // 检查游戏结束，如果没结束则自动进入下一事件
    setTimeout(() => {
      get().checkGameOver();

      // 如果游戏没有结束，自动加载下一个事件
      const currentState = get();
      if (currentState.phase !== 'ending' && !currentState.currentEvent) {
        get().nextEvent();
      }
    }, 800);
  },

  applyConsequences: (choice: EventChoice) => {
    const { consequences } = choice;

    set((s) => {
      const newState = { ...s };

      // 应用压力变化（阈值从12提高到15）
      if (consequences.stress !== undefined) {
        newState.stressClock = Math.max(
          0,
          Math.min(15, s.stressClock + consequences.stress)
        );
        newState.stressHistory = [...s.stressHistory, newState.stressClock];
      }

      // 应用玩家HP变化（HP不能超过初始值100）
      if (consequences.playerHP !== undefined) {
        const newHP = Math.max(0, Math.min(100, s.playerHP + consequences.playerHP));
        newState.playerHP = newHP;

        // 关键修复：HP归零自动触发死亡结局
        if (newHP <= 0) {
          newState.ending = 'your_end';
          newState.phase = 'ending';
        }
      }

      // 应用NPC HP变化（HP不能超过初始值）
      if (consequences.npcHP) {
        newState.npcs = s.npcs.map((npc) => {
          const hpChange = consequences.npcHP?.find(
            (h) => h.roleId === npc.roleId
          );
          if (hpChange) {
            const maxHP = ROLES[npc.roleId]?.startingHP || 100;
            const newHP = Math.max(0, Math.min(maxHP, npc.hp + hpChange.value));

            // 关键修复：HP归零自动标记为死亡
            if (newHP <= 0 && npc.alive) {
              return {
                ...npc,
                hp: 0,
                alive: false,
              };
            }

            return {
              ...npc,
              hp: newHP,
            };
          }
          return npc;
        });

        // NPC死亡额外增加压力（已有的逻辑保留）
        const newDeaths = newState.npcs.filter((npc) => !npc.alive && s.npcs.find((old) => old.roleId === npc.roleId && old.alive));
        if (newDeaths.length > 0) {
          newState.stressClock = Math.min(
            15, // 改为15以匹配新阈值
            newState.stressClock + newDeaths.length * 2
          );
        }
      }

      // 应用NPC状态变化
      if (consequences.npcState) {
        newState.npcs = newState.npcs.map((npc) => {
          const stateChange = consequences.npcState?.find(
            (st) => st.roleId === npc.roleId
          );
          if (stateChange) {
            return {
              ...npc,
              mentalState: stateChange.state,
            };
          }
          return npc;
        });
      }

      // 应用NPC关系变化
      if (consequences.npcRelationship) {
        newState.npcs = newState.npcs.map((npc) => {
          const relChange = consequences.npcRelationship?.find(
            (r) => r.roleId === npc.roleId
          );
          if (relChange) {
            return {
              ...npc,
              relationship: relChange.relationship,
            };
          }
          return npc;
        });
      }

      // 应用NPC死亡
      if (consequences.npcDeath) {
        newState.npcs = newState.npcs.map((npc) => {
          if (consequences.npcDeath?.includes(npc.roleId)) {
            return {
              ...npc,
              alive: false,
              hp: 0,
            };
          }
          return npc;
        });

        // NPC死亡额外增加压力（阈值改为15）
        newState.stressClock = Math.min(
          15,
          newState.stressClock + consequences.npcDeath.length * 2
        );
      }

      // 应用信标进度变化
      if (consequences.beaconProgress !== undefined) {
        if (consequences.beaconProgress === -999) {
          // 特殊值表示失败锁定
          newState.beaconProgress = 'failed';
        } else if (typeof s.beaconProgress === 'number') {
          newState.beaconProgress = Math.max(
            0,
            Math.min(100, s.beaconProgress + consequences.beaconProgress)
          );
        }
      }

      // 记录认知陷阱
      if (consequences.biasRecorded && s.currentEvent) {
        newState.cognitiveTraps = [
          ...s.cognitiveTraps,
          {
            bias: consequences.biasRecorded,
            eventId: s.currentEvent.id,
            eventName: s.currentEvent.name,
            day: s.day,
            choice: choice.text,
          },
        ];
      }

      // 记录完美决策
      if (consequences.perfectDecision && s.currentEvent) {
        newState.perfectDecisions = [
          ...s.perfectDecisions,
          {
            eventId: s.currentEvent.id,
            eventName: s.currentEvent.name,
            day: s.day,
            choice: choice.text,
          },
        ];
      }

      // 应用flags
      if (consequences.flags) {
        consequences.flags.forEach((flag) => {
          newState.flags[flag.key] = flag.value;
        });
      }

      // 检查立即结局
      if (consequences.immediateEnding) {
        newState.ending = consequences.immediateEnding;
        newState.phase = 'ending';
      }

      return newState;
    });
  },

  nextEvent: () => {
    // 增加天数
    set((s) => ({ day: s.day + 1 }));

    const newDay = get().day;

    // 确定当前幕（第1-3天=第一幕，第4-7天=第二幕，第8-10天=第三幕）
    let currentAct: 1 | 2 | 3;
    if (newDay <= 3) {
      currentAct = 1;
    } else if (newDay <= 7) {
      currentAct = 2;
    } else {
      currentAct = 3;
    }

    // 检查是否超过第10天
    if (newDay > 10) {
      get().checkGameOver();
      return;
    }

    // 第10天直接触发结局检查
    if (newDay === 10) {
      get().checkGameOver();
      return;
    }

    // 选择下一个事件
    const events = selectEventsForAct(currentAct, get(), 1);

    if (events.length > 0) {
      set({ currentEvent: events[0] });
    } else {
      // 没有符合条件的事件，进入结局
      get().checkGameOver();
    }
  },

  checkGameOver: () => {
    const state = get();

    // 检查信标修复
    if (state.beaconProgress === 100) {
      set({
        ending: 'rescue',
        phase: 'ending',
      });
      return;
    }

    // 检查玩家HP
    if (state.playerHP <= 0) {
      set({
        ending: 'your_end',
        phase: 'ending',
      });
      return;
    }

    // 检查压力崩溃（阈值从12提高到15）
    if (state.stressClock >= 15) {
      set({
        ending: 'collapse',
        phase: 'ending',
      });
      return;
    }

    // 检查是否到达第10天
    if (state.day >= 10 && !state.currentEvent) {
      set({
        ending: 'bitter_victory',
        phase: 'ending',
      });
      return;
    }
  },

  resetGame: () => {
    set(initialState);
    localStorage.removeItem('frozen_hope_save');
  },

  saveToLocalStorage: () => {
    const state = get();
    const saveData = {
      phase: state.phase,
      day: state.day,
      playerRole: state.playerRole,
      playerHP: state.playerHP,
      stressClock: state.stressClock,
      beaconProgress: state.beaconProgress,
      npcs: state.npcs,
      completedEvents: state.completedEvents,
      cognitiveTraps: state.cognitiveTraps,
      perfectDecisions: state.perfectDecisions,
      inventory: state.inventory,
      flags: state.flags,
      stressHistory: state.stressHistory,
    };
    localStorage.setItem('frozen_hope_save', JSON.stringify(saveData));
  },

  loadFromLocalStorage: () => {
    const saved = localStorage.getItem('frozen_hope_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        set(data);

        // 加载后检查游戏状态，防止卡住
        setTimeout(() => {
          const state = get();

          // 如果在游戏阶段但没有当前事件，尝试加载下一个或触发结局
          if ((state.phase === 'act1' || state.phase === 'act2' || state.phase === 'act3') && !state.currentEvent) {
            if (state.day >= 10) {
              // 第10天或以上，直接触发结局检查
              get().checkGameOver();
            } else {
              // 否则尝试加载下一个事件
              get().nextEvent();
            }
          }
        }, 100);
      } catch (e) {
        console.error('Failed to load save data', e);
      }
    }
  },
}));
