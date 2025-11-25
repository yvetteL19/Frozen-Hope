import { Event } from '../types';

// 第三幕事件（第8-10天）- 核心事件
export const ACT3_EVENTS: Event[] = [
  // 事件1: "最后的火花"
  {
    id: 'act3_last_spark',
    act: 3,
    name: '最后的火花',
    bias: 'anchoring_effect',
    conflict: '是否孤注一掷？',
    prerequisites: [
      { type: 'beacon_progress', condition: '!=', value: 'failed' },
    ],
    scene: '信标还是没反应。程序员说："我上次尝试时，它亮了0.5秒！我知道这次一定行，我只需要...更多电力！把取暖器的电池给我！"',
    npcsInvolved: [],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '它亮过！说明方向是对的。在这个阶段，我们必须孤注一掷。',
        npcSuggestion: {
          npcRole: 'pilot',
          suggestsThis: true,
        },
        consequences: {
          stress: 4,
          playerHP: -35,
          npcHP: [
            { roleId: 'assistant', value: -35 },
            { roleId: 'guide', value: -35 },
            { roleId: 'pilot', value: -35 },
            { roleId: 'sales', value: -35 },
          ],
          beaconProgress: -999,
          biasRecorded: 'anchoring_effect',
          description: '信标短路，彻底报废。取暖器也停了。全员严重冻伤HP-35。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '等等，0.5秒的亮光可能只是短路。我们不能冒这个险。',
        npcSuggestion: {
          npcRole: 'pilot',
          suggestsThis: true,
        },
        consequences: {
          stress: 1,
          playerHP: -5,
          npcState: [{ roleId: 'programmer', state: 'agitated' }],
          description: '你否定了"希望"，程序员很失望。信标进度保持不变，但你保住了取暖器。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SKILL',
        type: 'skill',
        text: '[修复] （你仔细检查）...不...我错了。0.5秒的亮光是短路。我需要的是更换电容。',
        roleSpecific: 'programmer',
        skillRequired: 'repair',
        consequences: {
          stress: -1,
          playerHP: -8,
          beaconProgress: 30,
          perfectDecision: true,
          description: '完美决策！你用专业知识否定了自己的错误锚定。信标修复进度+30%！',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_SKILL',
        type: 'skill',
        text: '[机械知识] 你疯了吗！电压根本不匹配！听我的，用驾驶舱的备用电池。',
        roleSpecific: 'pilot',
        skillRequired: 'mechanical_knowledge',
        prerequisites: [{ type: 'npc_alive', target: 'pilot', value: true }],
        consequences: {
          stress: -1,
          playerHP: -8,
          beaconProgress: 25,
          perfectDecision: true,
          description: '完美决策！你阻止了灾难。信标修复进度+25%。',
        },
      },
      // CEO专属（技能陷阱）
      {
        id: 'CEO_SKILL_TRAP',
        type: 'skill',
        text: '[指挥] 我批准这个方案。执行吧。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: 3,
          playerHP: -20,
          beaconProgress: -999,
          biasRecorded: 'anchoring_effect',
          description: '技能陷阱！你用权威强行批准了错误方案。信标报废。',
        },
      },
    ],
  },

  // 事件2: "背叛"
  {
    id: 'act3_betrayal',
    act: 3,
    name: '背叛',
    bias: 'survivorship_bias',
    conflict: '是否抛弃团队？',
    prerequisites: [
      { type: 'stress', condition: '>=', value: 5 },
      { type: 'npc_alive', target: 'sales', value: true },
    ],
    scene: '压力时钟很高。销售总监似乎想和你单独谈谈。他小声说："听着，这群人是累赘。我藏了一点食物和一条毯子。跟我走，我们俩有机会活下去。"',
    npcsInvolved: ['sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '...你说得对。资源有限，只有最聪明的人才能活下来。',
        consequences: {
          biasRecorded: 'survivorship_bias',
          immediateEnding: 'your_end',
          description: '游戏立即结束：【结局D：你的终点】。两天后，你们冻死在离残骸不到一公里的地方。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '不。无论发生什么，我们要一起面对。',
        consequences: {
          stress: 1,
          npcRelationship: [{ roleId: 'sales', relationship: 'hostile' }],
          description: '你拒绝了他。销售总监进入"敌对"状态，可能在关键时刻背叛你。',
        },
      },
      // 销售总监专属
      {
        id: 'SALES_CHOICE',
        type: 'special',
        text: '（放弃念头，留下）不...我不能这么做。',
        roleSpecific: 'sales',
        consequences: {
          stress: 0,
          description: '你战胜了自私。这是销售总监的救赎时刻。',
        },
      },
    ],
  },

  // 事件3: "最后的守夜人"
  {
    id: 'act3_last_watchman',
    act: 3,
    name: '最后的守夜人',
    bias: 'availability_heuristic',
    conflict: '谁去守夜？',
    scene: '暴风雪最猛烈的一夜。必须有一个人在残骸入口处守夜，防止积雪堵住房门。但守夜的人会暴露在风雪口，HP-50。销售总监："让助理去吧。她看起来状态不错。"',
    npcsInvolved: ['sales', 'assistant'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '销售总监说得有道理。助理状态最好，应该由她来。',
        consequences: {
          stress: 4,
          npcDeath: ['assistant'],
          biasRecorded: 'availability_heuristic',
          description: '助理因为发烧和寒冷，死在了守夜岗位上。你基于片面印象做出了致命决定。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '抽签决定。不能基于主观印象判断谁"最精神"。',
        consequences: {
          stress: 1,
          playerHP: -50,
          description: '抽签决定。你被抽中，守夜HP-50。公平但痛苦。',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_SKILL',
        type: 'skill',
        text: '[机械知识] 别吵。我可以做一个自动除雪装置。人不用待在风口。',
        roleSpecific: 'pilot',
        skillRequired: 'mechanical_knowledge',
        prerequisites: [{ type: 'npc_alive', target: 'pilot', value: true }],
        consequences: {
          stress: -1,
          playerHP: -8,
          perfectDecision: true,
          description: '完美决策！你用工程学解决了人命问题。无人需要守夜。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SKILL',
        type: 'skill',
        text: '[修复] 如果我把PDA的警报器连接到门的压力传感器上...我们轮流除雪。',
        roleSpecific: 'programmer',
        skillRequired: 'repair',
        consequences: {
          stress: -1,
          playerHP: -18, // -8技能 -10轮流除雪
          npcHP: [
            { roleId: 'assistant', value: -10 },
            { roleId: 'guide', value: -10 },
            { roleId: 'pilot', value: -10 },
            { roleId: 'sales', value: -10 },
          ],
          perfectDecision: true,
          description: '完美决策！你用技术解决了问题。全员HP-10（轮流除雪）。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] 守夜是必须的。我来吧。我比你们更懂怎么在暴雪中节省体力。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: 0,
          playerHP: -38, // -8技能 -30守夜（比-50少）
          description: '你主动承担了守夜。你的HP-30（专业技能减少损失）。',
        },
      },
    ],
  },

  // 事件4: "分享还是独占"
  {
    id: 'act3_share_or_monopolize',
    act: 3,
    name: '分享还是独占',
    bias: 'just_world_fallacy',
    conflict: '贡献大就该多得吗？',
    prerequisites: [{ type: 'day', condition: '>=', value: 9 }],
    scene: '只剩下最后一块食物。销售总监把它拿在手里："这几天，我找的柴火最多，我贡献最大。飞行员和助理一直在生病。根据\'公平\'，这块食物应该归我。"',
    npcsInvolved: ['sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '按贡献分配资源是合理的。他确实付出最多。',
        consequences: {
          stress: 3,
          npcHP: [
            { roleId: 'programmer', value: -15 },
            { roleId: 'pilot', value: -15 },
            { roleId: 'assistant', value: -15 },
            { roleId: 'guide', value: -15 },
            { roleId: 'sales', value: -15 },
          ],
          npcRelationship: [
            { roleId: 'pilot', relationship: 'hostile' },
            { roleId: 'assistant', relationship: 'hostile' },
            { roleId: 'programmer', relationship: 'hostile' },
          ],
          biasRecorded: 'just_world_fallacy',
          description: '团队因"公平"的自私而彻底分裂。其他人因饥饿HP-15，进入"敌对"。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '我们是一个团队。最后一块食物，所有人分。',
        consequences: {
          stress: 1,
          npcState: [{ roleId: 'sales', state: 'agitated' }],
          description: '食物被平分，没人能吃饱。销售总监不满，但团队保持了团结。',
        },
      },
      // 助理专属
      {
        id: 'ASSISTANT_SKILL',
        type: 'skill',
        text: '[急救] 把它给病得最重的人。他们需要的比我们多。',
        roleSpecific: 'assistant',
        skillRequired: 'first_aid',
        consequences: {
          stress: -1,
          playerHP: -3,
          perfectDecision: true,
          description: '完美决策！你提出了基于"需求"而非"贡献"的最高人道主义方案。',
        },
      },
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （从他手里拿过食物）现在的\'公平\'是我们都活下去。分成所有人份。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: 0, // +1技能 -1正面效果 = 0
          description: '你用权威压制了自私。食物被平分。',
        },
      },
    ],
  },

  // 事件5: "虚假的信号"
  {
    id: 'act3_false_signal',
    act: 3,
    name: '虚假的信号',
    bias: 'pattern_recognition',
    conflict: '在绝望中寻找希望？',
    prerequisites: [{ type: 'day', condition: '>=', value: 8 }],
    scene: '深夜。销售总监突然喊："听！是直升机的声音！"所有人都竖起耳朵。外面只有风声。销售总监坚持："不，我确定我听到了引擎声！"',
    npcsInvolved: ['sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '这可能是我们最后的机会！就算只有一点希望也值得冒险！',
        consequences: {
          stress: 3, // 降低压力
          playerHP: -25, // 降低HP惩罚
          npcHP: [
            { roleId: 'assistant', value: -25 },
            { roleId: 'guide', value: -25 },
            { roleId: 'pilot', value: -25 },
            { roleId: 'sales', value: -25 },
          ],
          biasRecorded: 'pattern_recognition',
          description: '在暴风雪中冲出去，什么也没有。信号弹浪费，全员冻伤HP-25。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '冷静。在这种风声中，人很容易产生幻听。',
        consequences: {
          stress: 1,
          npcState: [{ roleId: 'sales', state: 'panicked' }],
          description: '你打碎了销售总监的"希望"。他崩溃了，进入"恐慌"状态。',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_SPECIAL',
        type: 'special',
        text: '（你听了一会）那是发动机吗？不...频率不对，是风。',
        roleSpecific: 'pilot',
        consequences: {
          stress: 0,
          perfectDecision: true,
          description: '完美决策！你的专业知识阻止了灾难。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SPECIAL',
        type: 'special',
        text: '等等，我计算一下...在这种天气下，直升机无法飞行。这是幻听。',
        roleSpecific: 'programmer',
        consequences: {
          stress: 0,
          perfectDecision: true,
          description: '完美决策！你的逻辑分析说服了大家。',
        },
      },
    ],
  },

  // 事件6: "团队崩溃边缘"
  {
    id: 'act3_team_collapse',
    act: 3,
    name: '团队崩溃边缘',
    bias: 'group_attribution_error',
    conflict: '如何面对团队内部的崩溃？',
    prerequisites: [
      { type: 'stress', condition: '>=', value: 4 },
      { type: 'day', condition: '>=', value: 8 },
    ],
    scene: '压力时钟已经很高。销售总监突然对飞行员大吼："都是你！如果你飞得好一点，我们就不会坠机！"飞行员反击："你才是问题！你一直在瞎指挥！"团队在崩溃边缘。',
    npcsInvolved: ['sales', 'pilot'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '找出责任人很重要。飞行员是机长，他应该为坠机负责。',
        consequences: {
          stress: 3,
          npcHP: [{ roleId: 'pilot', value: -20 }],
          npcRelationship: [{ roleId: 'pilot', relationship: 'hostile' }],
          biasRecorded: 'group_attribution_error',
          description: '团队分裂。飞行员遭受言语暴力HP-20，进入"敌对"，可能在关键时刻拒绝合作。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '停！现在追究责任没有意义。我们需要团结。',
        consequences: {
          stress: 1,
          npcState: [
            { roleId: 'sales', state: 'agitated' },
          ],
          description: '你压制了冲突，但销售总监觉得你在"和稀泥"。矛盾暂时平息，但怨气未消。',
        },
      },
      // 助理专属
      {
        id: 'ASSISTANT_SKILL',
        type: 'skill',
        text: '[急救] （柔声说）我们都累了...让我检查一下你们的伤口...休息一下吧。',
        roleSpecific: 'assistant',
        skillRequired: 'first_aid',
        consequences: {
          stress: -1,
          playerHP: -3,
          npcHP: [
            { roleId: 'sales', value: 15 },
            { roleId: 'pilot', value: 15 },
          ],
          npcState: [
            { roleId: 'sales', state: 'calm' },
            { roleId: 'pilot', state: 'calm' },
          ],
          perfectDecision: true,
          description: '完美决策！你用同理心化解了冲突，两人恢复冷静。销售总监和飞行员各恢复15HP。',
        },
      },
      // 销售总监专属
      {
        id: 'SALES_SKILL',
        type: 'skill',
        text: '[谈判] （对两人分别说）你们都做得很好...现在需要互相支持...我们快到终点了。',
        roleSpecific: 'sales',
        skillRequired: 'negotiation',
        consequences: {
          stress: 0, // 改为0压力
          playerHP: -3, // 增加心理消耗
          description: '你的情商挽救了团队，但消耗巨大。所有人暂时冷静。',
        },
      },
    ],
  },

  // 事件7: "暴风雪加剧"（通用事件，影响全队）
  {
    id: 'act3_blizzard_intensifies',
    act: 3,
    name: '暴风雪加剧',
    bias: 'normalcy_bias',
    conflict: '是否低估了环境的危险？',
    scene: '暴风雪突然加剧，残骸的一侧墙壁开始摇晃。温度降到-40°C。销售总监说："应该没事，它已经撑了这么久了..."',
    npcsInvolved: [],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '它已经撑了这么久了，应该没问题。大家都累了，省点力气。',
        consequences: {
          stress: 3, // 降低压力
          playerHP: -25, // 降低HP惩罚
          npcHP: [
            { roleId: 'assistant', value: -25 },
            { roleId: 'guide', value: -25 },
            { roleId: 'pilot', value: -25 },
            { roleId: 'sales', value: -25 },
          ],
          biasRecorded: 'normalcy_bias',
          description: '墙壁部分坍塌！全员受伤，HP-25。过去的稳定不代表未来的安全。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '不能冒险。立刻加固，所有人行动！',
        consequences: {
          stress: 1,
          playerHP: -15,
          npcHP: [
            { roleId: 'assistant', value: -15 },
            { roleId: 'guide', value: -15 },
            { roleId: 'pilot', value: -15 },
            { roleId: 'sales', value: -15 },
          ],
          description: '在暴风雪中加固墙壁，全员精疲力竭（HP-15）。但避免了灾难。',
        },
      },
    ],
  },
];
