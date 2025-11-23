import { Ending, GameState, ROLE_TITLES } from '../types';
import { GAME_CONFIG } from '../constants/gameConfig';

// 获取角色职位名称
const getRoleTitle = (roleId: string): string => {
  const titles = ROLE_TITLES[roleId as keyof typeof ROLE_TITLES];
  return titles?.zh || roleId;
};

export const ENDINGS: Record<string, Ending> = {
  rescue: {
    type: 'rescue',
    title: '救援',
    rating: 5,
    condition: '信标修复进度 >= 80%',
    description: (state: GameState) => {
      const survivors = state.npcs.filter((npc) => npc.alive);
      return `第${state.day}天，下午14:37。

应急信标突然发出了震耳欲聋的回应。
你们围在驾驶舱里，看着那个红色的灯光——它闪烁得如此稳定，如此真实。

几个小时后，直升机的轰鸣声穿透了风雪。
当舱门打开，救援队员跳下来时，${survivors.find((npc) => npc.roleId === 'assistant') ? getRoleTitle('assistant') + '哭了出来。' : '幸存者们喜极而泣。'}

你们获救了。

存活幸存者：${survivors.length + 1}人（包括你）
你在${state.day}天内修复了信标，拯救了所有人。
这是最理想的结局。`;
    },
    survivors: (state: GameState) => state.npcs.filter((npc) => npc.alive),
  },

  bitter_victory: {
    type: 'bitter_victory',
    title: '惨胜',
    rating: 3,
    condition: '存活到第10天且有人死亡',
    description: (state: GameState) => {
      const survivors = state.npcs.filter((npc) => npc.alive);
      const dead = state.npcs.filter((npc) => !npc.alive);

      let description = `第10天，早晨7:05。

风停了。

你虚弱地爬出残骸，刺眼的阳光让你几乎睁不开眼。
天空，蓝得不可思议。

远处，有直升机的声音。

`;

      if (survivors.length > 0) {
        description += `你回头看看${survivors.map((npc) => getRoleTitle(npc.roleId)).join('、')}。
他们脸上的表情和你一样——劫后余生的麻木。

`;
      } else {
        description += `你回头看看空荡荡的残骸。
你是唯一的幸存者。

`;
      }

      description += `救援队在风暴结束的第一时间找到了你们。

但你们付出了代价。

`;

      if (dead.length > 0) {
        description += `没能活下来的人：
${dead.map((npc) => `- ${getRoleTitle(npc.roleId)}`).join('\n')}

`;
      }

      description += `你活了下来。
但你永远不会忘记那些没能活下来的人。`;

      return description;
    },
    survivors: (state: GameState) => state.npcs.filter((npc) => npc.alive),
  },

  survival: {
    type: 'survival',
    title: '幸存',
    rating: 4,
    condition: '存活到第10天且所有人存活',
    description: (state: GameState) => {
      const survivors = state.npcs.filter((npc) => npc.alive);

      return `第10天，早晨7:05。

风停了。

你虚弱地爬出残骸，刺眼的阳光让你几乎睁不开眼。
天空，蓝得不可思议。

远处，有直升机的声音。

你回头看看${survivors.map((npc) => getRoleTitle(npc.roleId)).join('、')}。
所有人都还活着。

虽然疲惫不堪，虽然遍体鳞伤，但你们都活了下来。

救援队在风暴结束的第一时间找到了你们。

虽然没能修复信标，但你们以团队的力量，撑过了最黑暗的10天。

存活幸存者：${survivors.length + 1}人（全员）

这已经是了不起的成就。`;
    },
    survivors: (state: GameState) => state.npcs.filter((npc) => npc.alive),
  },

  collapse: {
    type: 'collapse',
    title: '崩溃',
    rating: 1,
    condition: '压力时钟达到15格',
    description: (state: GameState) => {
      return `第${state.day}天，时间不明。

理智的最后一根弦，断了。

恐慌像瘟疫一样蔓延。
有人尖叫着冲进了暴风雪...
有人抓起残骸的金属碎片...
有人蜷缩在角落里彻底崩溃...

当救援队在第10天找到残骸时，
他们只看到了一片死寂。

无人幸存。

你的团队在压力下彻底崩溃了。
理性，是生存的最后防线。`;
    },
  },

  your_end: {
    type: 'your_end',
    title: '你的终点',
    rating: 1,
    condition: '玩家HP降至0或选择背叛/逃跑',
    description: (state: GameState) => {
      const survivors = state.npcs.filter((npc) => npc.alive);

      if (state.flags['betrayal_escape']) {
        // 背叛逃跑
        return `你和${getRoleTitle('sales')}离开了残骸。

第一个小时，你们还能互相鼓励。
第二个小时，你们迷路了。
第三个小时，${getRoleTitle('sales')}倒下了。

你试图继续前进，但暴风雪吞噬了一切。

两天后，你们冻死在离残骸不到一公里的地方。

救援队在第10天找到了残骸。
${survivors.length > 0 ? '其他留下的人，获救了。' : '但所有人都已死去。'}

你选择了自私。
但在绝境中，团队才是唯一的希望。`;
      } else {
        // HP降至0
        return `你再也撑不住了。

寒冷、饥饿、伤痛...它们终于追上了你。

你最后的意识，是${survivors.length > 0 ? `${getRoleTitle(survivors[0].roleId)}的呼喊声："醒醒！别睡！"` : '风雪的呼啸声'}。

但你已经听不见了。

${state.beaconProgress === 100 ? `讽刺的是，信标在你死后的第二天被修复了。
救援队赶到时，其他人获救了。
只有你，长眠在了雪中。` : state.stressClock < 8 ? `你的牺牲不是没有意义的。
你的理性决策让团队保持了团结。
${survivors.length > 0 ? '他们会记住你。' : '但最终，无人幸存。'}` : `团队在你死后迅速崩溃。
三天后，无人幸存。`}`;
      }
    },
  },
};

export const getEnding = (state: GameState): Ending => {
  // ========== 优先级1: 立即失败条件（玩家无法继续） ==========

  // 检查背叛逃跑（立即触发死亡结局）
  if (state.flags['betrayal_escape']) {
    return ENDINGS.your_end;
  }

  // 检查玩家死亡（HP归零）
  if (state.playerHP <= 0) {
    return ENDINGS.your_end;
  }

  // 检查压力崩溃（团队彻底崩溃）
  if (state.stressClock >= GAME_CONFIG.MAX_STRESS) {
    return ENDINGS.collapse;
  }

  // ========== 优先级2: 成功条件 ==========

  // 检查信标修复成功（完美结局）
  if (typeof state.beaconProgress === 'number' &&
      state.beaconProgress >= GAME_CONFIG.BEACON_RESCUE_THRESHOLD) {
    return ENDINGS.rescue;
  }

  // ========== 优先级3: 时间耗尽结局 ==========

  // 检查是否到达第10天
  if (state.day >= GAME_CONFIG.GAME_DURATION_DAYS) {
    const allAlive = state.npcs.every((npc) => npc.alive);

    if (allAlive) {
      // 所有人存活 - 幸存结局（4星）
      return ENDINGS.survival;
    } else {
      // 有人死亡 - 惨胜结局（3星）
      return ENDINGS.bitter_victory;
    }
  }

  // 默认返回惨胜（不应该到达这里）
  return ENDINGS.bitter_victory;
};
