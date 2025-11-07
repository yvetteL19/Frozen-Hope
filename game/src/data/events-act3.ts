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
    scene: '第8天。信标还是没反应。程序员说："我上次尝试时，它亮了0.5秒！我知道这次一定行，我只需要...更多电力！把取暖器的电池给我！"',
    npcsInvolved: ['programmer'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '同意！我们把所有电力都给他！',
        consequences: {
          stress: 4,
          playerHP: -35,
          npcHP: [
            { roleId: 'ceo', value: -35 },
            { roleId: 'programmer', value: -35 },
            { roleId: 'assistant', value: -35 },
            { roleId: 'guide', value: -35 },
            { roleId: 'pilot', value: -35 },
            { roleId: 'sales', value: -35 },
          ],
          beaconProgress: -999, // 失败锁定
          biasRecorded: 'anchoring_effect',
          description: '信标短路，彻底报废。取暖器也停了。全员严重冻伤HP-35。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '不行！你这是在赌博！我们不能失去取暖器！',
        consequences: {
          stress: 1,
          npcState: [{ roleId: 'programmer', state: 'agitated' }],
          description: '信标进度保持不变。程序员进入"激动"。',
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
          beaconProgress: 25,
          perfectDecision: true,
          description: '完美决策！你用专业知识否定了自己的错误锚定。信标修复进度+25%！',
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
          beaconProgress: 20,
          perfectDecision: true,
          description: '完美决策！你阻止了灾难。信标修复进度+20%。',
        },
      },
      // CEO专属（技能陷阱）
      {
        id: 'CEO_SKILL_TRAP',
        type: 'skill',
        text: '[指挥] （对程序员）我批准你的方案。执行吧。',
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
    scene: '第8天。压力时钟很高。销售总监秘密把你拉到一边："听着，这群人是累赘。我藏了一点食物和一条毯子。跟我走，我们俩有机会活下去。"',
    npcsInvolved: ['sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '好，我跟你走。',
        consequences: {
          biasRecorded: 'survivorship_bias',
          immediateEnding: 'your_end',
          description: '游戏立即结束：【结局D：你的终点】。两天后，你们冻死在离残骸不到一公里的地方。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '你疯了！我不会丢下他们！',
        consequences: {
          stress: 0,
          npcRelationship: [{ roleId: 'sales', relationship: 'hostile' }],
          description: '你拒绝了他。销售总监进入"敌对"状态。',
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
    scene: '第9天。暴风雪最猛烈的一夜。必须有一个人在残骸入口处守夜，防止积雪堵住房门。但守夜的人会暴露在风雪口，HP-50。CEO："让助理去吧。我刚才看到她睡得很好，她肯定最精神。"',
    npcsInvolved: ['ceo', 'assistant'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '同意。助理，你今晚守夜。',
        consequences: {
          stress: 4,
          npcDeath: ['assistant'],
          biasRecorded: 'availability_heuristic',
          description: '助理因为发烧和寒冷，死在了守夜岗位上。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '我们抽签决定。这最公平。',
        consequences: {
          stress: 1,
          playerHP: -50, // 简化：玩家抽中
          description: '抽签决定。你被抽中，守夜HP-50。',
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
            { roleId: 'ceo', value: -10 },
            { roleId: 'programmer', value: -10 },
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
    scene: '第9天。只剩下最后一块食物。销售总监把它拿在手里："这几天，我找的柴火最多，我贡献最大。飞行员和CEO一直在生病。根据\'公平\'，这块食物应该归我。"',
    npcsInvolved: ['sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '...他说得对。食物归他。',
        consequences: {
          stress: 3,
          npcHP: [
            { roleId: 'pilot', value: -15 },
            { roleId: 'ceo', value: -15 },
            { roleId: 'assistant', value: -15 },
            { roleId: 'programmer', value: -15 },
            { roleId: 'guide', value: -15 },
          ],
          npcRelationship: [
            { roleId: 'pilot', relationship: 'hostile' },
            { roleId: 'ceo', relationship: 'hostile' },
            { roleId: 'assistant', relationship: 'hostile' },
          ],
          biasRecorded: 'just_world_fallacy',
          description: '团队因"公平"的自私而彻底分裂。其他人因饥饿HP-15，进入"敌对"。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '我们说好平分的。这是最后一块，我们所有人分。',
        consequences: {
          stress: 0,
          description: '食物被平分，虽然没人能吃饱，但团队的团结保持到了最后。',
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
          playerHP: -5,
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
    scene: '第8天深夜。销售总监突然喊："听！是直升机的声音！"所有人都竖起耳朵。外面只有风声。她坚持："不，我确定我听到了引擎声！"',
    npcsInvolved: ['sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '冲出去挥手求救！点燃我们最后的信号弹！',
        consequences: {
          stress: 4,
          playerHP: -40,
          npcHP: [
            { roleId: 'ceo', value: -40 },
            { roleId: 'programmer', value: -40 },
            { roleId: 'assistant', value: -40 },
            { roleId: 'guide', value: -40 },
            { roleId: 'pilot', value: -40 },
            { roleId: 'sales', value: -40 },
          ],
          biasRecorded: 'pattern_recognition',
          description: '在-40°C的暴风雪中冲出去，什么也没有。信号弹浪费，全员严重冻伤HP-40。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '那只是风声。在绝望中，人会产生幻觉。',
        consequences: {
          stress: 1,
          npcState: [{ roleId: 'sales', state: 'panicked' }],
          description: '你保持理性。销售总监崩溃，进入"恐慌"状态。',
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
    scene: '第8-9天。压力时钟已经很高。CEO突然对飞行员大吼："都是你！如果你飞得好一点，我们就不会坠机！"飞行员反击："你才是问题！你一直在瞎指挥！"团队在崩溃边缘。',
    npcsInvolved: ['ceo', 'pilot'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '同意CEO。飞行员确实有责任。',
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
        text: '够了！事故不是任何人的错！现在互相指责只会让我们都死！',
        consequences: {
          stress: 0,
          description: '团队暂时平息。虽然矛盾没解决，但至少保持了合作。',
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
          playerHP: -5,
          npcHP: [
            { roleId: 'ceo', value: 10 },
            { roleId: 'pilot', value: 10 },
          ],
          perfectDecision: true,
          description: '完美决策！你用同理心化解了冲突。两人HP+10。',
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
          stress: -1,
          perfectDecision: true,
          description: '完美决策！你的情商挽救了团队。',
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
    scene: '第8-9天。暴风雪突然加剧，残骸的一侧墙壁开始摇晃。温度降到-40°C。有人说："应该没事，它已经撑了这么久了..."',
    npcsInvolved: [],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '应该能撑住。我们省点力气。',
        consequences: {
          stress: 4,
          playerHP: -40,
          npcHP: [
            { roleId: 'ceo', value: -40 },
            { roleId: 'programmer', value: -40 },
            { roleId: 'assistant', value: -40 },
            { roleId: 'guide', value: -40 },
            { roleId: 'pilot', value: -40 },
            { roleId: 'sales', value: -40 },
          ],
          biasRecorded: 'normalcy_bias',
          description: '墙壁部分坍塌！全员严重受伤，HP-40。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '立刻加固！所有人行动！',
        consequences: {
          stress: 1,
          playerHP: -18,
          npcHP: [
            { roleId: 'ceo', value: -18 },
            { roleId: 'programmer', value: -18 },
            { roleId: 'assistant', value: -18 },
            { roleId: 'guide', value: -18 },
            { roleId: 'pilot', value: -18 },
            { roleId: 'sales', value: -18 },
          ],
          description: '及时加固避免了灾难，但劳累和寒冷导致全员-18HP。',
        },
      },
    ],
  },
];
