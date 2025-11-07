import { Event } from '../types';

// 第二幕事件（第4-7天）- 核心事件
export const ACT2_EVENTS: Event[] = [
  // 事件1: "向导的赌博"
  {
    id: 'act2_guides_gamble',
    act: 2,
    name: '向导的赌博',
    bias: 'survivorship_bias',
    conflict: '是否相信单一成功案例？',
    prerequisites: [{ type: 'npc_alive', target: 'guide', value: true }],
    scene: '第4天。风暴没有减弱的迹象。向导突然激动地说："我想起来了！我上次就在附近的一个山洞躲过了风暴！我们必须马上出发去那里！"',
    npcsInvolved: ['guide'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '听专家的！我们出发！',
        consequences: {
          stress: 3,
          playerHP: -35,
          npcHP: [
            { roleId: 'ceo', value: -35 },
            { roleId: 'programmer', value: -35 },
            { roleId: 'assistant', value: -35 },
            { roleId: 'guide', value: -35 },
            { roleId: 'pilot', value: -35 },
            { roleId: 'sales', value: -35 },
          ],
          npcState: [{ roleId: 'guide', state: 'panicked' }],
          biasRecorded: 'survivorship_bias',
          description: '在暴风雪中迷路，什么也没找到。全员-35 HP，狼狈逃回残骸。向导进入"恐慌"。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '不行！在暴风雪里离开残骸就是自杀！',
        consequences: {
          stress: 0,
          npcState: [{ roleId: 'guide', state: 'agitated' }],
          description: '你规避了陷阱。向导进入"激动"状态（被质疑）。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] （你仔细回忆）...等一下...当时没有暴风雪。现在去，我们都会死。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: -1,
          playerHP: -8,
          perfectDecision: true,
          description: '完美决策！你用专业知识否定了自己的错误判断。',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_SKILL',
        type: 'skill',
        text: '[机械知识] （查看仪表）气压计显示风暴中心正在接近。向导，时机是错的。',
        roleSpecific: 'pilot',
        skillRequired: 'mechanical_knowledge',
        prerequisites: [{ type: 'npc_alive', target: 'pilot', value: true }],
        consequences: {
          stress: -1,
          playerHP: -8,
          npcRelationship: [{ roleId: 'guide', relationship: 'ally' }],
          perfectDecision: true,
          description: '完美决策！你用数据说服了向导。',
        },
      },
    ],
  },

  // 事件2: "最后的药品"
  {
    id: 'act2_last_medicine',
    act: 2,
    name: '最后的药品',
    bias: 'sunk_cost',
    conflict: '一份药品，两个病人，如何选择？',
    prerequisites: [
      { type: 'npc_alive', target: 'pilot', value: true },
      { type: 'npc_hp', target: 'pilot', condition: '<', value: 60 },
      { type: 'npc_alive', target: 'ceo', value: true },
    ],
    scene: '飞行员的腿伤感染了，发烧严重。同时，CEO因慢性病在颤抖。你手里只有最后一份抗生素。助理："我们已经在飞行员身上花了那么多精力！"销售总监："CEO才是领袖！"',
    npcsInvolved: ['pilot', 'ceo', 'assistant', 'sales'],
    choices: [
      {
        id: 'A',
        type: 'neutral',
        text: '把药给飞行员。',
        consequences: {
          stress: 1,
          npcHP: [
            { roleId: 'pilot', value: 20 },
            { roleId: 'ceo', value: -20 },
          ],
          npcState: [{ roleId: 'ceo', state: 'panicked' }],
          description: '飞行员稳定。CEO HP-20，进入"恐慌"状态。',
        },
      },
      {
        id: 'B',
        type: 'neutral',
        text: '把药给CEO。',
        consequences: {
          stress: 1,
          npcHP: [
            { roleId: 'ceo', value: 20 },
            { roleId: 'pilot', value: -20 },
          ],
          npcState: [{ roleId: 'pilot', state: 'panicked' }],
          description: 'CEO稳定。飞行员HP-20，进入"恐慌"状态。',
        },
      },
      // 助理专属
      {
        id: 'ASSISTANT_SKILL',
        type: 'skill',
        text: '[急救] 别吵了。我能把药精确地分成两半，虽然效果减半，但都能稳住。',
        roleSpecific: 'assistant',
        skillRequired: 'first_aid',
        prerequisites: [{ type: 'skill_revealed', target: 'assistant', value: true }],
        consequences: {
          stress: -1,
          playerHP: -5,
          npcHP: [
            { roleId: 'pilot', value: 10 },
            { roleId: 'ceo', value: 10 },
          ],
          perfectDecision: true,
          description: '完美决策！两人都暂时稳定。这是助理的高光时刻。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] 抗生素给CEO。我认识一种苔藓，可以给飞行员的伤口外部消炎。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: 0,
          playerHP: -8,
          npcHP: [
            { roleId: 'ceo', value: 20 },
            { roleId: 'pilot', value: -10 },
          ],
          description: '你用替代方案解决了两难。CEO稳定，飞行员HP-10。',
        },
      },
    ],
  },

  // 事件3: "赌徒的风暴"
  {
    id: 'act2_gamblers_storm',
    act: 2,
    name: '赌徒的风暴',
    bias: 'gamblers_fallacy',
    conflict: '风暴会"该停了"吗？',
    prerequisites: [{ type: 'day', condition: '>=', value: 5 }],
    scene: '连续第3天，暴风雪丝毫没有减弱。食物快吃完了。助理说："风雪已经刮了这么久，它一定快停了！我们应该把最后的食物全吃了，为明天天晴出发做准备！"',
    npcsInvolved: ['assistant'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '有道理，我们吃光食物，明天出发。',
        consequences: {
          stress: 3,
          playerHP: -30,
          npcHP: [
            { roleId: 'ceo', value: -30 },
            { roleId: 'programmer', value: -30 },
            { roleId: 'assistant', value: -30 },
            { roleId: 'guide', value: -30 },
            { roleId: 'pilot', value: -30 },
            { roleId: 'sales', value: -30 },
          ],
          biasRecorded: 'gamblers_fallacy',
          description: '第二天风雪加倍。全员陷入严重饥饿，HP-30。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '这是赌博。我们把食物分成小份，再等一天。',
        consequences: {
          stress: -1,
          perfectDecision: true,
          description: '完美决策！理性规划延长了生存时间。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] 你们看雪的积向。这是季风，不会因为"刮得久了"就停下。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: -1,
          playerHP: -8,
          perfectDecision: true,
          description: '完美决策！你用专业知识阻止了灾难。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SPECIAL',
        type: 'special',
        text: '这是统计学谬误。过去的随机事件不会影响未来的独立事件。',
        roleSpecific: 'programmer',
        consequences: {
          stress: -1,
          perfectDecision: true,
          description: '完美决策！你的理性分析说服了大家。',
        },
      },
    ],
  },

  // 事件4: "隐藏的储备"
  {
    id: 'act2_hidden_reserve',
    act: 2,
    name: '隐藏的储备',
    bias: 'confirmation_bias',
    conflict: '是否加入自私阵营？',
    prerequisites: [{ type: 'npc_alive', target: 'sales', value: true }],
    scene: '你发现销售总监在角落里鬼鬼祟祟。他藏了一小块巧克力。他低声说："嘘...CEO和飞行员都是累赘。你跟我合作，我们两个聪明人才能活下来。这块给你。"',
    npcsInvolved: ['sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '同意。我们结盟。',
        consequences: {
          playerHP: 10,
          flags: [{ key: 'secret_alliance_sales', value: true }],
          biasRecorded: 'confirmation_bias',
          description: '你HP+10。你和销售总监成为"秘密同谋"。他会在后续事件中强迫你支持他。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '你这个混蛋！我要告诉大家！',
        consequences: {
          stress: 2,
          npcRelationship: [{ roleId: 'sales', relationship: 'hostile' }],
          playerHP: 2, // 巧克力平分后每人+2
          npcHP: [
            { roleId: 'ceo', value: 2 },
            { roleId: 'programmer', value: 2 },
            { roleId: 'assistant', value: 2 },
            { roleId: 'guide', value: 2 },
            { roleId: 'pilot', value: 2 },
            { roleId: 'sales', value: 2 },
          ],
          description: '销售总监进入"敌对"。巧克力被平分给全队（全员HP+2）。',
        },
      },
      // 销售总监专属
      {
        id: 'SALES_CHOICE',
        type: 'special',
        text: '（公开）我找到了这个！我们平分吧。',
        roleSpecific: 'sales',
        consequences: {
          stress: -1,
          playerHP: 5,
          npcHP: [
            { roleId: 'ceo', value: 5 },
            { roleId: 'programmer', value: 5 },
            { roleId: 'assistant', value: 5 },
            { roleId: 'guide', value: 5 },
            { roleId: 'pilot', value: 5 },
            { roleId: 'sales', value: 5 },
          ],
          perfectDecision: true,
          description: '完美决策！你赢得了团队的信任。全员HP+5。',
        },
      },
    ],
  },

  // 事件5: "火源危机"
  {
    id: 'act2_fire_crisis',
    act: 2,
    name: '火源危机',
    bias: 'optimism_bias',
    conflict: '是否过度乐观？',
    scene: '篝火的燃料快用完了。CEO说："别担心！我们把所有木头一次性烧掉，今晚暖和一点。明天肯定会获救的！"温度是-30°C。',
    npcsInvolved: ['ceo', 'guide'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '同意！我们一定会被救的！',
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
          biasRecorded: 'optimism_bias',
          description: '第二天救援没来，燃料耗尽。全员严重冻伤，HP-40，压力+4。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '不行！我们必须假设最坏的情况，分配燃料！',
        consequences: {
          stress: 1,
          npcState: [{ roleId: 'ceo', state: 'agitated' }],
          description: '你规避了灾难。CEO不满，但团队保持理性。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] 我能从残骸中找到更多可燃物。我们分批烧。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: -1,
          playerHP: -8,
          perfectDecision: true,
          description: '完美决策！你找到了替代方案。',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_SKILL',
        type: 'skill',
        text: '[机械知识] 等等，飞机座椅的泡沫是可燃的。我们有更多燃料。',
        roleSpecific: 'pilot',
        skillRequired: 'mechanical_knowledge',
        consequences: {
          stress: -1,
          playerHP: -8,
          perfectDecision: true,
          description: '完美决策！你的专业知识解决了问题。',
        },
      },
    ],
  },

  // 事件6: "信任测试"
  {
    id: 'act2_trust_test',
    act: 2,
    name: '信任测试',
    bias: 'anchoring_effect',
    conflict: '如何分配有限的信任？',
    prerequisites: [{ type: 'day', condition: '>=', value: 6 }],
    scene: '有人偷吃了最后的食物。所有人都在互相指责。CEO："一定是那个受伤的飞行员！他行动不便，所以需要更多能量！"',
    npcsInvolved: ['ceo', 'pilot', 'sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '同意CEO。飞行员嫌疑最大！',
        consequences: {
          stress: 3,
          npcHP: [{ roleId: 'pilot', value: -30 }],
          npcRelationship: [{ roleId: 'pilot', relationship: 'hostile' }],
          biasRecorded: 'anchoring_effect',
          description: '飞行员被孤立和殴打，HP-30。实际上是销售总监偷的。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '我们没有证据。停止互相指责！',
        consequences: {
          stress: 1,
          description: '团队暂时平息。矛盾被压制但未解决。',
        },
      },
      // 助理专属
      {
        id: 'ASSISTANT_SPECIAL',
        type: 'special',
        text: '（轻声说）...我看到了...但我不想说...',
        roleSpecific: 'assistant',
        consequences: {
          stress: 0,
          flags: [{ key: 'assistant_knows_truth', value: true }],
          description: '你选择沉默。这个秘密可能在未来有用。',
        },
      },
      // 销售总监专属
      {
        id: 'SALES_SKILL',
        type: 'skill',
        text: '[谈判] （快速转移话题）现在不是内斗的时候！我们需要团结！',
        roleSpecific: 'sales',
        skillRequired: 'negotiation',
        consequences: {
          stress: 0,
          playerHP: 5, // 你偷偷吃了食物
          description: '你成功转移了注意力。矛盾被掩盖。',
        },
      },
    ],
  },

  // 事件7: "极寒之夜"（通用事件，影响全队）
  {
    id: 'act2_freezing_night',
    act: 2,
    name: '极寒之夜',
    bias: 'availability_heuristic',
    conflict: '面对极端寒冷如何分配资源？',
    scene: '第5-6天的夜晚，温度骤降至-35°C。所有人都在发抖。只有一个取暖器，但电池只能支撑4小时。有人建议："我们把所有毯子给最重要的人！"',
    npcsInvolved: [],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '集中资源给"重要的人"。',
        consequences: {
          stress: 3,
          playerHP: -20,
          npcHP: [
            { roleId: 'pilot', value: -40 },
            { roleId: 'assistant', value: -40 },
            { roleId: 'guide', value: -40 },
          ],
          biasRecorded: 'availability_heuristic',
          description: '被排除的人严重冻伤，濒临死亡。HP大幅下降，团队分裂。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '所有人围成一圈，共享体温。取暖器放中间。',
        consequences: {
          stress: 0,
          playerHP: -15,
          npcHP: [
            { roleId: 'ceo', value: -15 },
            { roleId: 'programmer', value: -15 },
            { roleId: 'assistant', value: -15 },
            { roleId: 'guide', value: -15 },
            { roleId: 'pilot', value: -15 },
            { roleId: 'sales', value: -15 },
          ],
          description: '虽然所有人都受冻（全员-15HP），但团队保持了团结。',
        },
      },
    ],
  },

  // 事件8: "食物短缺"（通用事件）
  {
    id: 'act2_food_shortage',
    act: 2,
    name: '食物短缺',
    bias: 'scarcity_bias',
    conflict: '饥饿会让人做出什么选择？',
    scene: '第6天。食物只剩下3份。所有人都饿了两天。有人开始翻找残骸，寻找任何可以吃的东西。',
    npcsInvolved: [],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '吃掉所有食物，明天再说！',
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
          biasRecorded: 'scarcity_bias',
          description: '第二天更加绝望。全员因严重饥饿HP-35。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '严格配给，每人每天半份，坚持6天。',
        consequences: {
          stress: 1,
          playerHP: -12,
          npcHP: [
            { roleId: 'ceo', value: -12 },
            { roleId: 'programmer', value: -12 },
            { roleId: 'assistant', value: -12 },
            { roleId: 'guide', value: -12 },
            { roleId: 'pilot', value: -12 },
            { roleId: 'sales', value: -12 },
          ],
          description: '理性的选择延长了生存时间，但饥饿依然痛苦。全员-12HP。',
        },
      },
    ],
  },
];
