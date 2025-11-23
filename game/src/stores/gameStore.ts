import { create } from 'zustand';
import { GameState, PlayableRoleType, EventChoice, NPC, NPCRoleType } from '../types';
import { ROLES, NPC_ROLE_IDS, PLAYABLE_ROLES } from '../data/roles';
import { selectEventsForAct } from '../data/events';
import { GAME_CONFIG } from '../constants/gameConfig';

interface GameStore extends GameState {
  // 核心操作
  startGame: (playerRole: PlayableRoleType) => void;
  makeChoice: (choice: EventChoice) => void;
  nextEvent: () => void;
  resetGame: () => void;

  // 辅助操作
  applyConsequences: (choice: EventChoice) => void;
  checkGameOver: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;

  // 连击奖励提示
  lastStreakReward: number | null;
  clearStreakReward: () => void;
}

// 根据HP自动计算NPC心理状态
const getMentalStateFromHP = (hp: number, currentState: 'calm' | 'agitated' | 'panicked'): 'calm' | 'agitated' | 'panicked' => {
  // HP很低时，心理状态自动恶化（只恶化不改善，避免覆盖事件设定的好状态）
  if (hp <= 20) {
    return 'panicked';
  } else if (hp <= 40 && currentState === 'calm') {
    return 'agitated';
  }
  return currentState;
};

const initialState: GameState & { lastStreakReward: number | null } = {
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
  perfectStreak: 0,
  inventory: {
    medkits: 1,
    food: 'plentiful',
  },
  flags: {},
  stressHistory: [0],
  ending: null,
  lastStreakReward: null, // 用于显示连击奖励提示
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: (playerRole: PlayableRoleType) => {
    const selectedRole = PLAYABLE_ROLES[playerRole];
    if (!selectedRole) return;

    // 初始化NPCs（固定4个NPC角色）
    const npcs: NPC[] = NPC_ROLE_IDS.map((roleId: NPCRoleType) => ({
      roleId,
      alive: true,
      hp: ROLES[roleId].startingHP,
      mentalState: 'calm' as const,
      relationship: 'neutral' as const,
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
      perfectStreak: 0,
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

      // 应用压力变化
      if (consequences.stress !== undefined) {
        let stressChange = consequences.stress;

        // 完美决策额外奖励：压力变化再-1
        if (consequences.perfectDecision && stressChange < 0) {
          stressChange -= GAME_CONFIG.PERFECT_DECISION_BONUS.EXTRA_STRESS_REDUCTION;
        }

        newState.stressClock = Math.max(
          0,
          Math.min(GAME_CONFIG.MAX_STRESS, s.stressClock + stressChange)
        );
        newState.stressHistory = [...s.stressHistory, newState.stressClock];
      }

      // 应用玩家HP变化（HP不能超过角色初始值）
      if (consequences.playerHP !== undefined) {
        // 获取角色的最大HP（根据角色不同，飞行员是90，其他是100）
        const maxHP = s.playerRole ? (ROLES[s.playerRole]?.startingHP || GAME_CONFIG.MAX_PLAYER_HP) : GAME_CONFIG.MAX_PLAYER_HP;
        const newHP = Math.max(GAME_CONFIG.MIN_HP, Math.min(maxHP, s.playerHP + consequences.playerHP));
        newState.playerHP = newHP;

        // 关键修复：HP归零自动触发死亡结局
        if (newHP <= GAME_CONFIG.MIN_HP) {
          newState.ending = 'your_end';
          newState.phase = 'ending';
        }
      }

      // 应用NPC HP变化（HP不能超过初始值）
      // 注意：这里不再单独处理NPC死亡的压力增加，统一在npcDeath处理
      if (consequences.npcHP) {
        newState.npcs = s.npcs.map((npc) => {
          // 已死亡的NPC不再处理HP变化
          if (!npc.alive) return npc;

          const hpChange = consequences.npcHP?.find(
            (h) => h.roleId === npc.roleId
          );
          if (hpChange) {
            const maxHP = ROLES[npc.roleId]?.startingHP || GAME_CONFIG.MAX_PLAYER_HP;
            const newHP = Math.max(GAME_CONFIG.MIN_HP, Math.min(maxHP, npc.hp + hpChange.value));

            // HP归零自动标记为死亡
            if (newHP <= GAME_CONFIG.MIN_HP) {
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

        // 统计因HP归零而新死亡的NPC数量，增加压力
        const newDeathsFromHP = newState.npcs.filter(
          (npc) => !npc.alive && s.npcs.find((old) => old.roleId === npc.roleId && old.alive)
        );
        if (newDeathsFromHP.length > 0) {
          newState.stressClock = Math.min(
            GAME_CONFIG.MAX_STRESS,
            newState.stressClock + newDeathsFromHP.length * GAME_CONFIG.NPC_DEATH_STRESS_PENALTY
          );
        }

        // 根据HP变化自动更新心理状态
        newState.npcs = newState.npcs.map((npc) => {
          if (!npc.alive) return npc;
          return {
            ...npc,
            mentalState: getMentalStateFromHP(npc.hp, npc.mentalState),
          };
        });
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

      // 应用NPC死亡（直接标记死亡，非HP归零导致）
      if (consequences.npcDeath) {
        // 先统计实际会死亡的NPC数量（排除已经死亡的）
        const actualNewDeaths = consequences.npcDeath.filter(
          (roleId) => newState.npcs.find((npc) => npc.roleId === roleId && npc.alive)
        );

        newState.npcs = newState.npcs.map((npc) => {
          if (consequences.npcDeath?.includes(npc.roleId) && npc.alive) {
            return {
              ...npc,
              alive: false,
              hp: 0,
            };
          }
          return npc;
        });

        // 只对实际死亡的NPC增加压力（避免重复计算）
        if (actualNewDeaths.length > 0) {
          newState.stressClock = Math.min(
            GAME_CONFIG.MAX_STRESS,
            newState.stressClock + actualNewDeaths.length * GAME_CONFIG.NPC_DEATH_STRESS_PENALTY
          );
        }
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
            choiceId: choice.id,
          },
        ];
      }

      // 记录完美决策并处理连击系统
      if (consequences.perfectDecision && s.currentEvent) {
        newState.perfectDecisions = [
          ...s.perfectDecisions,
          {
            eventId: s.currentEvent.id,
            eventName: s.currentEvent.name,
            day: s.day,
            choice: choice.text,
            choiceId: choice.id,
          },
        ];

        // 增加连击数
        newState.perfectStreak = s.perfectStreak + 1;

        // 连击奖励系统
        const newStreak = newState.perfectStreak;

        if (newStreak === 3) {
          // 3连击：全员+10HP
          newState.playerHP = Math.min(100, newState.playerHP + 10);
          newState.npcs = newState.npcs.map((npc) => ({
            ...npc,
            hp: npc.alive ? Math.min(ROLES[npc.roleId]?.startingHP || 100, npc.hp + 10) : npc.hp,
          }));
          (newState as typeof newState & { lastStreakReward: number | null }).lastStreakReward = 3;
        } else if (newStreak === 5) {
          // 5连击：压力-2
          newState.stressClock = Math.max(0, newState.stressClock - 2);
          (newState as typeof newState & { lastStreakReward: number | null }).lastStreakReward = 5;
        } else if (newStreak === 7) {
          // 7连击：信标+10%
          if (typeof newState.beaconProgress === 'number') {
            newState.beaconProgress = Math.min(100, newState.beaconProgress + 10);
          }
          (newState as typeof newState & { lastStreakReward: number | null }).lastStreakReward = 7;
        } else {
          (newState as typeof newState & { lastStreakReward: number | null }).lastStreakReward = null;
        }
      } else {
        // 非完美决策（包括undefined和false），重置连击
        newState.perfectStreak = 0;
        (newState as typeof newState & { lastStreakReward: number | null }).lastStreakReward = null;
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

    // ========== 每日环境损耗（饥寒交迫）==========
    set((s) => {
      const envConfig = GAME_CONFIG.DAILY_ENVIRONMENTAL_DAMAGE;

      // 计算今日损耗
      let dailyDamage = envConfig.BASE_DAMAGE;

      // 高压力额外损耗
      if (s.stressClock >= envConfig.STRESS_DAMAGE_THRESHOLD) {
        dailyDamage += envConfig.STRESS_EXTRA_DAMAGE;
      }

      // 后期物资耗尽额外损耗
      if (newDay >= envConfig.LATE_GAME_START_DAY) {
        dailyDamage += envConfig.LATE_GAME_BONUS;
      }

      // 应用损耗到玩家
      const newPlayerHP = Math.max(GAME_CONFIG.MIN_HP, s.playerHP - dailyDamage);

      // 应用损耗到所有存活NPC，同时更新心理状态
      const newNPCs = s.npcs.map(npc => {
        if (!npc.alive) return npc;
        const newHP = Math.max(GAME_CONFIG.MIN_HP, npc.hp - dailyDamage);
        // HP归零标记死亡
        if (newHP <= GAME_CONFIG.MIN_HP) {
          return { ...npc, hp: 0, alive: false };
        }
        // 根据新HP更新心理状态
        return {
          ...npc,
          hp: newHP,
          mentalState: getMentalStateFromHP(newHP, npc.mentalState),
        };
      });

      // 统计因环境损耗死亡的NPC
      const envDeaths = newNPCs.filter(
        (npc) => !npc.alive && s.npcs.find((old) => old.roleId === npc.roleId && old.alive)
      );

      // 计算新压力（NPC死亡增加压力）
      let newStress = s.stressClock;
      if (envDeaths.length > 0) {
        newStress = Math.min(
          GAME_CONFIG.MAX_STRESS,
          newStress + envDeaths.length * GAME_CONFIG.NPC_DEATH_STRESS_PENALTY
        );
      }

      return {
        playerHP: newPlayerHP,
        npcs: newNPCs,
        stressClock: newStress,
        stressHistory: envDeaths.length > 0 ? [...s.stressHistory, newStress] : s.stressHistory,
      };
    });

    // 检查玩家是否因环境损耗死亡
    if (get().playerHP <= GAME_CONFIG.MIN_HP) {
      set({ ending: 'your_end', phase: 'ending' });
      return;
    }

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

    // ========== 优先级1: 立即失败条件 ==========

    // 检查背叛
    if (state.flags['betrayal_escape']) {
      set({ ending: 'your_end', phase: 'ending' });
      return;
    }

    // 检查玩家HP
    if (state.playerHP <= GAME_CONFIG.MIN_HP) {
      set({ ending: 'your_end', phase: 'ending' });
      return;
    }

    // 检查压力崩溃
    if (state.stressClock >= GAME_CONFIG.MAX_STRESS) {
      set({ ending: 'collapse', phase: 'ending' });
      return;
    }

    // ========== 优先级2: 成功条件 ==========

    // 检查信标修复
    if (typeof state.beaconProgress === 'number' &&
        state.beaconProgress >= GAME_CONFIG.BEACON_RESCUE_THRESHOLD) {
      set({ ending: 'rescue', phase: 'ending' });
      return;
    }

    // ========== 优先级3: 时间耗尽 ==========

    // 检查是否到达第10天
    if (state.day >= GAME_CONFIG.GAME_DURATION_DAYS && !state.currentEvent) {
      const allAlive = state.npcs.every((npc) => npc.alive);

      if (allAlive) {
        set({ ending: 'survival', phase: 'ending' });  // 全员存活 - 4星结局
      } else {
        set({ ending: 'bitter_victory', phase: 'ending' });  // 部分存活 - 3星结局
      }
      return;
    }
  },

  resetGame: () => {
    set(initialState);
    localStorage.removeItem('frozen_hope_save');
  },

  clearStreakReward: () => {
    set({ lastStreakReward: null });
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
      perfectStreak: state.perfectStreak,
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
