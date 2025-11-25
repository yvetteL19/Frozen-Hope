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
    scene: '风暴没有减弱的迹象。向导突然激动地说："我想起来了！我上次就在附近的一个山洞躲过了风暴！我们必须马上出发去那里！"',
    npcsInvolved: ['guide'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '向导有实战经验，比我们坐以待毙强。跟他走！',
        npcSuggestion: {
          npcRole: 'guide',
          suggestsThis: true,
        },
        consequences: {
          stress: 3,
          playerHP: -35,
          npcHP: [
            { roleId: 'assistant', value: -35 },
            { roleId: 'guide', value: -35 },
            { roleId: 'pilot', value: -35 },
            { roleId: 'sales', value: -35 },
            { roleId: 'programmer', value: -35 },
          ],
          npcState: [{ roleId: 'guide', state: 'panicked' }],
          biasRecorded: 'survivorship_bias',
          description: '经验不等于真理。暴风雪中迷路，什么也没找到。全员-35 HP，狼狈逃回。向导崩溃了。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '一次成功不代表总能成功。现在的条件不一样。',
        npcSuggestion: {
          npcRole: 'pilot',
          suggestsThis: true,
        },
        consequences: {
          stress: 1,
          npcState: [{ roleId: 'guide', state: 'agitated' }],
          description: '你质疑了"专家"，向导感到被冒犯。但团队留在了安全的地方。',
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
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （冷静地）向导，你确定吗？详细描述一下上次的情况——天气、距离、时间。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: -1,
          npcState: [{ roleId: 'guide', state: 'calm' }],
          perfectDecision: true,
          description: '完美决策！你用提问引导向导自己发现错误。他承认上次没有暴风雪，情况完全不同。团队避免了灾难。',
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
      { type: 'npc_alive', target: 'sales', value: true },
    ],
    scene: '飞行员的腿伤感染了，发烧严重。同时，销售总监因慢性病在颤抖。你手里只有最后一份抗生素。助理："我们已经在飞行员身上花了那么多精力！"向导："销售总监状态也很糟糕！"',
    npcsInvolved: ['pilot', 'assistant', 'sales'],
    choices: [
      {
        id: 'A',
        type: 'neutral',
        text: '把药给飞行员。',
        consequences: {
          stress: 1,
          npcHP: [
            { roleId: 'pilot', value: 20 },
            { roleId: 'sales', value: -20 },
          ],
          npcState: [{ roleId: 'sales', state: 'panicked' }],
          description: '飞行员稳定。销售总监HP-20，进入"恐慌"状态。',
        },
      },
      {
        id: 'B',
        type: 'neutral',
        text: '把药给销售总监。',
        consequences: {
          stress: 1,
          npcHP: [
            { roleId: 'sales', value: 20 },
            { roleId: 'pilot', value: -20 },
          ],
          npcState: [{ roleId: 'pilot', state: 'panicked' }],
          description: '销售总监稳定。飞行员HP-20，进入"恐慌"状态。',
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
          stress: 0, // 中性压力（分裂药品引起不满）
          playerHP: -5, // 增加成本
          npcHP: [
            { roleId: 'pilot', value: 10 }, // 降低效果
            { roleId: 'sales', value: 10 },
          ],
          npcState: [{ roleId: 'guide', state: 'agitated' }], // 副作用：向导烦躁
          description: '你用专业技巧暂时稳住两人，但分裂药品引发争议。全员不满增加。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] 抗生素给销售总监。我认识一种苔藓，可以给飞行员的伤口外部消炎。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: 0,
          playerHP: -8,
          npcHP: [
            { roleId: 'sales', value: 20 },
            { roleId: 'pilot', value: -10 },
          ],
          description: '你用替代方案解决了两难。销售总监稳定，飞行员HP-10。',
        },
      },
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （深吸一口气）让助理评估谁更危急。这是医疗决策，不是管理决策。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: 0, // 中性（助理压力大不一定做好）
          npcHP: [
            { roleId: 'pilot', value: 8 }, // 降低效果
            { roleId: 'sales', value: 8 },
          ],
          npcState: [{ roleId: 'assistant', state: 'agitated' }], // 助理压力大烦躁
          description: '你把决策权交给助理，但她压力太大，两人恢复效果有限。全员紧张。',
        },
      },
    ],
  },

  // 事件2.5: "沉没的无线电"
  {
    id: 'act2_sunk_cost_fixed',
    act: 2,
    name: '沉没的无线电',
    bias: 'sunk_cost',
    conflict: '是否继续投入已经失败的项目？',
    prerequisites: [
      { type: 'day', condition: '>=', value: 5 },
      { type: 'beacon_progress', condition: '<', value: 50 },
    ],
    scene: '程序员沮丧地说："应急无线电彻底烧坏了，修复它至少还要2天和最后的工具包。"你的直觉告诉你不能放弃——已经在它上面花了那么多时间和资源，现在放弃就是前功尽弃。但向导低声提醒："还有最后一次机会用燃烧的残骸制作信号烟火，但只能今天...明天风向会变..."',
    npcsInvolved: ['guide'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '坚持就是胜利。再给它两天，说不定就修好了。',
        npcSuggestion: {
          npcRole: 'sales',
          suggestsThis: true,
        },
        consequences: {
          stress: 3,
          playerHP: -10,
          npcHP: [
            { roleId: 'programmer', value: -10 },
          ],
          beaconProgress: -5,
          flags: [{ key: 'sunk_cost_trap_triggered', value: true }],
          biasRecorded: 'sunk_cost',
          description: '"坚持"变成了"固执"。2天后无线电仍然报废，信号烟火的时机也错过了。信标进度-5%。',
        },
        longTermEffects: '错失了替代救援方案',
      },
      {
        id: 'B',
        type: 'rational',
        text: '及时止损。把资源投到更有希望的方案上。',
        npcSuggestion: {
          npcRole: 'guide',
          suggestsThis: true,
        },
        consequences: {
          stress: 1,
          beaconProgress: 15,
          npcState: [{ roleId: 'sales', state: 'agitated' }],
          npcHP: [{ roleId: 'programmer', value: -5 }],
          description: '你放弃了"心血"，程序员有些失落（HP-5）。但信号烟火成功引起注意。信标进度+15%。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SKILL',
        type: 'skill',
        text: '[修复] 抱歉，作为工程师我必须说实话：它修不好了。我们该及时止损。',
        roleSpecific: 'programmer',
        skillRequired: 'repair',
        consequences: {
          stress: -1,
          playerHP: -10,
          beaconProgress: 20,
          perfectDecision: true,
          description: '完美决策！你用专业判断说服团队放弃无效投资。成功制作信号烟火并修复部分信标系统，信标进度+20%。',
        },
      },
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （深呼吸）...我错了。止损也是管理决策的一部分。向导，你说怎么做。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: -2,
          beaconProgress: 18,
          npcRelationship: [
            { roleId: 'guide', relationship: 'ally' },
            { roleId: 'programmer', relationship: 'ally' },
          ],
          perfectDecision: true,
          description: '完美决策！你展示了真正的领导力——及时纠错。团队士气大幅提升，成功制作信号烟火，信标进度+18%。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] （坚定地说）时间窗口只有今天！我不管你们之前投入了什么，现在的选择才决定我们的生死！',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: -1,
          playerHP: -8,
          beaconProgress: 25,
          perfectDecision: true,
          description: '完美决策！你用生存经验打破了沉没成本陷阱。团队采纳了你的建议，成功制作并点燃信号烟火，信标进度+25%！',
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
        text: '概率上讲，连续这么多天暴风雪，明天应该会好转。吃饱才有力气行动。',
        npcSuggestion: {
          npcRole: 'assistant',
          suggestsThis: true,
        },
        consequences: {
          stress: 3,
          playerHP: -30,
          npcHP: [
            { roleId: 'assistant', value: -30 },
            { roleId: 'guide', value: -30 },
            { roleId: 'pilot', value: -30 },
            { roleId: 'sales', value: -30 },
            { roleId: 'programmer', value: -30 },
          ],
          biasRecorded: 'gamblers_fallacy',
          description: '天气不讲"概率平衡"。第二天风雪加倍，全员饿得头晕眼花。HP-30。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '天气是独立事件，不会因为"刮够了"就停。继续配给。',
        npcSuggestion: {
          npcRole: 'guide',
          suggestsThis: true,
        },
        consequences: {
          stress: 1,
          npcState: [{ roleId: 'assistant', state: 'agitated' }],
          npcHP: [{ roleId: 'assistant', value: -5 }],
          description: '你的"冷酷理性"让助理失望（HP-5）。但食物储备延长了一天。',
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
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （坚定地）我理解大家的心情，但天气不欠我们晴天。继续配给，这是命令。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: -1,
          npcState: [{ roleId: 'assistant', state: 'calm' }],
          perfectDecision: true,
          description: '完美决策！你用领导力压制了赌徒心理。助理冷静下来接受了你的决定。食物储备延长。',
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
    scene: '你在角落里发现销售总监在鬼鬼祟祟。他藏了一小块巧克力。他低声说："嘘...老板和飞行员都是累赘。你跟我合作，我们两个聪明人才能活下来。这块给你。"',
    npcsInvolved: ['sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '他说得有道理...在这种环境下，聪明人确实更容易活下来。',
        consequences: {
          playerHP: 10,
          flags: [{ key: 'secret_alliance_sales', value: true }],
          biasRecorded: 'confirmation_bias',
          description: '你接受了"利益交换"（HP+10）。但你和销售总监绑在了一起，后患无穷。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '团队要共同进退。把巧克力交出来，平分给大家。',
        consequences: {
          stress: 2,
          npcRelationship: [{ roleId: 'sales', relationship: 'hostile' }],
          playerHP: 2, // 巧克力平分后每人+2
          npcHP: [
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
            { roleId: 'assistant', value: 5 },
            { roleId: 'guide', value: 5 },
            { roleId: 'pilot', value: 5 },
            { roleId: 'sales', value: 5 },
          ],
          perfectDecision: true,
          description: '完美决策！你赢得了团队的信任。全员HP+5。',
        },
      },
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （看着销售总监的眼睛）你在干什么？把东西拿出来，现在。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: 0,
          playerHP: 3,
          npcHP: [
            { roleId: 'assistant', value: 3 },
            { roleId: 'guide', value: 3 },
            { roleId: 'pilot', value: 3 },
            { roleId: 'sales', value: 3 },
          ],
          npcRelationship: [{ roleId: 'sales', relationship: 'hostile' }],
          perfectDecision: true,
          description: '完美决策！你展示了领导者的威严和公正。销售总监不情愿地交出巧克力（全员+3HP），但对你怀恨在心。',
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
    scene: '篝火的燃料快用完了。销售总监说："别担心！我们把所有木头一次性烧掉，今晚暖和一点。明天肯定会获救的！"温度是-30°C。',
    npcsInvolved: ['guide'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '士气很重要。今晚暖和一点，大家明天才有精神等待救援。',
        consequences: {
          stress: 3, // 降低压力惩罚
          playerHP: -25, // 降低HP惩罚
          npcHP: [
            { roleId: 'assistant', value: -25 },
            { roleId: 'guide', value: -25 },
            { roleId: 'pilot', value: -25 },
            { roleId: 'sales', value: -25 },
          ],
          biasRecorded: 'optimism_bias',
          description: '第二天救援没来，燃料耗尽。全员冻伤，HP-25，压力+3。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '今晚挨冻，但燃料要省着用。我们不知道还要撑多久。',
        consequences: {
          stress: 1,
          playerHP: -8,
          npcHP: [
            { roleId: 'assistant', value: -8 },
            { roleId: 'guide', value: -8 },
            { roleId: 'pilot', value: -8 },
            { roleId: 'sales', value: -8 },
          ],
          npcState: [{ roleId: 'sales', state: 'agitated' }],
          description: '寒冷的一夜，全员受冻（HP-8）。但燃料延续了两天。',
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
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （冷静地）向导、飞行员，你们有专业知识。有没有替代燃料的方案？',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: -1,
          playerHP: -5,
          npcHP: [
            { roleId: 'assistant', value: -5 },
            { roleId: 'guide', value: -5 },
            { roleId: 'pilot', value: -5 },
            { roleId: 'sales', value: -5 },
          ],
          perfectDecision: true,
          description: '完美决策！你把问题交给专业人士，他们找到了座椅泡沫和飞机残骸的隔热层作为替代燃料。全员只损失-5HP。',
        },
      },
    ],
  },

  // 事件5.5: "信标突破"
  {
    id: 'act2_beacon_breakthrough',
    act: 2,
    name: '信标突破',
    bias: 'pattern_recognition',
    conflict: '高风险修复尝试还是稳妥保守？',
    prerequisites: [
      { type: 'day', condition: '>=', value: 5 },
      { type: 'beacon_progress', condition: '>', value: 20 },
      { type: 'beacon_progress', condition: '!=', value: 'failed' },
    ],
    scene: '程序员兴奋地说："我找到模式了！每30分钟电场波动一次，这是规律！我们可以在低谷期修复，成功率90%！"飞行员摇头："这太冒险，数据样本不够..."',
    npcsInvolved: ['pilot'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '相信程序员的分析！数据不会说谎，在低谷期修复！',
        consequences: {
          stress: 2,
          beaconProgress: -20, // 模式错误，导致失败
          npcState: [{ roleId: 'programmer', state: 'agitated' }],
          biasRecorded: 'pattern_recognition',
          description: '你相信了"模式"，但这只是巧合。电场突然异常，信标进一步受损。进度-20%。程序员陷入自责。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '数据不足太冒险。按照安全程序来。',
        consequences: {
          stress: 0,
          beaconProgress: 10,
          npcState: [{ roleId: 'programmer', state: 'agitated' }],
          description: '你拒绝了"模式"诱惑。花了2小时安全修复，但程序员因分析被否定而沮丧。进度+10%。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SKILL',
        type: 'skill',
        text: '[修复] （深呼吸）让我继续观察一天，收集更多数据再决定。',
        roleSpecific: 'programmer',
        skillRequired: 'repair',
        consequences: {
          stress: 1, // 等待一天增加压力
          playerHP: -5,
          beaconProgress: 15, // 降低效果
          description: '你选择谨慎观察，收集更多数据。进度+15%，但等待一天消耗了时间和精力。',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_SKILL',
        type: 'skill',
        text: '[机械知识] （翻阅手册）手册提到类似问题...应该是电容老化，需要逐级测试。',
        roleSpecific: 'pilot',
        skillRequired: 'mechanical_knowledge',
        consequences: {
          stress: 0,
          playerHP: -10, // 增加成本
          beaconProgress: 15, // 降低效果
          npcState: [{ roleId: 'programmer', state: 'agitated' }], // 程序员的方案被否定
          description: '你按手册安全操作。进度+15%，但程序员的"模式"理论被彻底否定，引发争执。',
        },
      },
      // CEO专属
      {
        id: 'CEO_SPECIAL',
        type: 'special',
        text: '（征求大家意见）大家都怎么说？让我们民主决定。',
        roleSpecific: 'ceo',
        consequences: {
          stress: 1, // 犹豫不决增加压力
          beaconProgress: 8,
          description: '你选择征求意见但延误了时机。最终选择保守方案，进度+8%。团队觉得你缺乏决断。',
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
    scene: '有人偷吃了最后的食物。所有人都在互相指责。助理："一定是那个受伤的飞行员！他行动不便，所以需要更多能量！"',
    npcsInvolved: ['assistant', 'pilot', 'sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '助理说得有道理。飞行员行动不便，确实有动机和机会。',
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
        text: '没有证据之前，不能随意指控任何人。',
        consequences: {
          stress: 1,
          npcState: [{ roleId: 'assistant', state: 'agitated' }],
          description: '你拒绝跟风指责。助理不满你没有支持她的判断。矛盾被压制但未解决。',
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
          stress: 1, // 心理压力增加
          playerHP: -3, // 精神消耗
          description: '你成功转移了注意力，但内心压力增大。矛盾被掩盖。',
        },
      },
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （严肃地）在没有证据之前，我不允许任何人指控任何人。这是我的底线。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: -1,
          npcRelationship: [
            { roleId: 'pilot', relationship: 'ally' },
          ],
          perfectDecision: true,
          description: '完美决策！你展示了领导者应有的公正。飞行员感激你的保护，成为你的坚定盟友。指控被搁置。',
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
    scene: '夜晚，温度骤降至-35°C。所有人都在发抖。只有一个取暖器，但电池只能支撑4小时。销售总监建议："我们把所有毯子给最重要的人！"',
    npcsInvolved: [],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '资源有限时，应该优先保护能干活的人。这是理性的选择。',
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
          stress: 1,
          playerHP: -12,
          npcHP: [
            { roleId: 'assistant', value: -12 },
            { roleId: 'guide', value: -12 },
            { roleId: 'pilot', value: -12 },
            { roleId: 'sales', value: -12 },
          ],
          description: '所有人都挨冻（全员-12HP），效率不如集中取暖。但团队保持了团结。',
        },
      },
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] 向导、飞行员，用你们的专业知识。有没有更好的取暖方案？',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: -1,
          playerHP: -8,
          npcHP: [
            { roleId: 'assistant', value: -8 },
            { roleId: 'guide', value: -8 },
            { roleId: 'pilot', value: -8 },
            { roleId: 'sales', value: -8 },
          ],
          perfectDecision: true,
          description: '完美决策！你调动专业资源。向导找到了更多隔热材料，飞行员调整了取暖器角度。全员损失最小化（-8HP）。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] 我知道一个技巧——在雪地里挖个坑，上面盖残骸。雪是天然隔热层。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: -1,
          playerHP: -6,
          npcHP: [
            { roleId: 'assistant', value: -6 },
            { roleId: 'guide', value: -10 },
            { roleId: 'pilot', value: -6 },
            { roleId: 'sales', value: -6 },
          ],
          perfectDecision: true,
          description: '完美决策！你用荒野求生知识建造了雪洞。向导辛苦挖掘（HP-10），但其他人损失最小（-6HP）。',
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
    scene: '食物只剩下3份。所有人都饿了两天。助理开始翻找残骸，寻找任何可以吃的东西。',
    npcsInvolved: [],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '大家都饿了两天了，体力快撑不住。先吃饱恢复体力，才能想办法。',
        consequences: {
          stress: 4,
          playerHP: -35,
          npcHP: [
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
        text: '严格配给。饿着肚子很痛苦，但我们必须撑更久。',
        consequences: {
          stress: 2,
          playerHP: -10,
          npcHP: [
            { roleId: 'assistant', value: -10 },
            { roleId: 'guide', value: -10 },
            { roleId: 'pilot', value: -10 },
            { roleId: 'sales', value: -10 },
          ],
          npcState: [{ roleId: 'sales', state: 'agitated' }],
          description: '持续的饥饿折磨着每个人（全员-10HP），销售总监抱怨不断。但食物延长了三天。',
        },
      },
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （站起来）我带头少吃。领导者应该承担更多。向导，能找到其他食物来源吗？',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: -1,
          playerHP: -15,
          npcHP: [
            { roleId: 'assistant', value: -5 },
            { roleId: 'guide', value: -5 },
            { roleId: 'pilot', value: -5 },
            { roleId: 'sales', value: -5 },
          ],
          perfectDecision: true,
          description: '完美决策！你的牺牲精神感动了团队。向导在附近找到了一些可食用的苔藓。你承担最大损失（-15HP），但团队损失最小化（-5HP）。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] 让我出去看看。这个季节有些树皮和苔藓是可以吃的。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: -1,
          playerHP: -5,
          npcHP: [
            { roleId: 'assistant', value: -5 },
            { roleId: 'guide', value: -12 },
            { roleId: 'pilot', value: -5 },
            { roleId: 'sales', value: -5 },
          ],
          perfectDecision: true,
          description: '完美决策！你在风雪中找到了补充食物（自己HP-12）。团队损失最小化（-5HP），食物储备延长。',
        },
      },
    ],
  },

  // ========== 新增事件 ==========

  // 事件9: "集体的决定"
  {
    id: 'act2_groupthink',
    act: 2,
    name: '集体的决定',
    bias: 'groupthink',
    conflict: '当所有人都赞同一个危险的决定时，你敢反对吗？',
    prerequisites: [
      { type: 'day', condition: '>=', value: 5 },
      { type: 'stress', condition: '>=', value: 5 },
    ],
    scene: '团队情绪紧张。销售总监召集会议："我们必须采取行动！"助理："我同意！不能再等了！"飞行员："对！"有人附和："...我觉得也是。"所有人都在点头。他们的计划是：在暴风雪中向东徒步3公里，去寻找"可能存在"的气象站。向导犹豫："东边...我不确定..."但销售总监打断："我们已经达成共识了！"所有人都看着你，等待你的附议。',
    npcsInvolved: ['sales', 'assistant', 'pilot', 'guide'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '（沉默点头）既然大家都同意...那就出发吧。',
        npcSuggestion: {
          npcRole: 'sales',
          suggestsThis: true,
        },
        consequences: {
          stress: 3, // 降低压力
          playerHP: -25, // 降低HP惩罚
          npcHP: [
            { roleId: 'assistant', value: -25 },
            { roleId: 'guide', value: -25 },
            { roleId: 'pilot', value: -25 },
            { roleId: 'sales', value: -25 },
          ],
          npcState: [
            { roleId: 'guide', state: 'panicked' },
            { roleId: 'assistant', state: 'agitated' },
          ],
          biasRecorded: 'groupthink',
          description: '你屈服于群体压力。东边根本没有气象站，只有悬崖和冰裂缝。全员受伤（HP-25），差点迷路。团队士气受挫，压力+3。',
        },
        longTermEffects: '群体思维差点导致团灭，幸存者心理创伤严重',
      },
      {
        id: 'B',
        type: 'rational',
        text: '等等！我们没有任何证据证明东边有气象站！',
        npcSuggestion: {
          npcRole: 'guide',
          suggestsThis: true,
        },
        consequences: {
          stress: 1,
          npcState: [
            { roleId: 'sales', state: 'agitated' },
            { roleId: 'assistant', state: 'agitated' },
          ],
          npcRelationship: [
            { roleId: 'guide', relationship: 'ally' },
          ],
          description: '你打破了群体共识，但代价是被孤立。销售总监和助理都对你不满，认为你在"破坏团结"。只有向导理解你。',
        },
      },
      // CEO专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] （举手）慢着。作为领导者，我必须确保这不是集体盲从。向导，说出你的专业意见。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: -2,
          perfectDecision: true,
          npcRelationship: [
            { roleId: 'guide', relationship: 'ally' },
            { roleId: 'programmer', relationship: 'ally' },
          ],
          description: '完美决策！你展现了真正的领导力——鼓励异议而非压制。向导说出真相后，计划被废弃。团队学会了批判性思考，压力-2。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] （坚定地站起来）不行！东边是悬崖区！你们在地图上看到的"建筑标记"是50年前的废弃矿井！',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: -1,
          playerHP: -8,
          perfectDecision: true,
          description: '完美决策！你用专业知识和勇气打破了群体思维。虽然遭到质疑，但你的坚持拯救了所有人。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SPECIAL',
        type: 'special',
        text: '（小声）...我其实不同意，但大家都说要去...算了，我附议吧...',
        roleSpecific: 'programmer',
        consequences: {
          stress: 5,
          playerHP: -45,
          npcHP: [
            { roleId: 'assistant', value: -45 },
            { roleId: 'guide', value: -45 },
            { roleId: 'pilot', value: -45 },
            { roleId: 'sales', value: -45 },
          ],
          biasRecorded: 'groupthink',
          description: '你没有勇气反对群体。结果是灾难性的——你们差点全灭在悬崖边。全员HP-45，压力+5。这次教训代价惨重。',
        },
      },
    ],
  },

  // 事件10: "恐惧的声音"
  {
    id: 'act2_emotional_reasoning',
    act: 2,
    name: '恐惧的声音',
    bias: 'emotional_reasoning',
    conflict: '强烈的恐惧感是否等同于真实的危险？',
    prerequisites: [
      { type: 'day', condition: '>=', value: 5 },
      { type: 'npc_alive', target: 'assistant', value: true },
    ],
    scene: '深夜，助理突然惊醒，浑身颤抖："我有一种非常强烈的不祥预感...飞机残骸要塌了！我们必须马上搬到外面的雪地里！"你犹豫了："可是外面是-30°C..."助理尖叫："你们不懂！我的直觉从来没有这么强烈过！我感觉到了死亡！我们会被压死的！"',
    npcsInvolved: ['assistant'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '她的直觉一直很准。在这种环境下，宁可信其有，不可信其无。',
        npcSuggestion: {
          npcRole: 'assistant',
          suggestsThis: true,
        },
        consequences: {
          stress: 3,
          playerHP: -35,
          npcHP: [
            { roleId: 'sales', value: -35 },
            { roleId: 'programmer', value: -35 },
            { roleId: 'assistant', value: -20 },
            { roleId: 'guide', value: -35 },
            { roleId: 'pilot', value: -35 },
          ],
          npcState: [
            { roleId: 'assistant', state: 'panicked' },
          ],
          biasRecorded: 'emotional_reasoning',
          description: '你被情绪而非事实驱动。在-30°C的雪地里度过一夜，全员严重冻伤（HP-35）。残骸完好无损。助理进入"恐慌"状态，压力+3。',
        },
        longTermEffects: '团队开始质疑助理的判断力',
      },
      {
        id: 'B',
        type: 'rational',
        text: '先检查结构再决定。恐惧不能代替事实。',
        npcSuggestion: {
          npcRole: 'guide',
          suggestsThis: true,
        },
        consequences: {
          stress: 1,
          npcState: [
            { roleId: 'assistant', state: 'agitated' },
          ],
          description: '检查后确认结构稳固。但助理觉得你不信任她的直觉，变得"激动"。',
        },
      },
      // 助理专属
      {
        id: 'ASSISTANT_SKILL',
        type: 'skill',
        text: '[急救]（深呼吸，自我检查）...等等...这是恐慌发作的症状...让我冷静下来...',
        roleSpecific: 'assistant',
        skillRequired: 'first_aid',
        consequences: {
          stress: -2,
          playerHP: -3,
          perfectDecision: true,
          description: '完美决策！你用医学知识识别了自己的情绪化推理。这是自我觉察的高光时刻。团队压力-2。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SKILL',
        type: 'skill',
        text: '[修复]（拿出工具）我用震动传感器测试结构。数据显示：稳定性98%。不是直觉的问题，是恐惧。',
        roleSpecific: 'programmer',
        skillRequired: 'repair',
        consequences: {
          stress: -1,
          playerHP: -10,
          npcState: [
            { roleId: 'assistant', state: 'calm' },
          ],
          perfectDecision: true,
          description: '完美决策！你用客观数据替代了主观恐惧。助理看到数据后迅速恢复"冷静"。科学方法的胜利。',
        },
      },
      // 销售总监专属
      {
        id: 'SALES_SKILL',
        type: 'skill',
        text: '[谈判]（握住助理的手）我理解你的恐惧。但恐惧不等于事实。我们一起检查，好吗？',
        roleSpecific: 'sales',
        skillRequired: 'negotiation',
        consequences: {
          stress: 0,
          playerHP: -4, // 增加心理消耗
          npcState: [
            { roleId: 'assistant', state: 'calm' },
          ],
          npcRelationship: [
            { roleId: 'assistant', relationship: 'ally' },
          ],
          description: '你用同理心和理性相结合的方式处理了情绪危机。助理恢复"冷静"并成为你的盟友，但你耗费了大量精力。',
        },
      },
    ],
  },

  // 事件11: "不作为的代价"
  {
    id: 'act2_omission_bias',
    act: 2,
    name: '不作为的代价',
    bias: 'omission_bias',
    conflict: '冒险行动还是危险地等待？',
    prerequisites: [
      { type: 'day', condition: '>=', value: 6 },
      { type: 'npc_alive', target: 'pilot', value: true },
      { type: 'npc_hp', target: 'pilot', condition: '<', value: 40 },
    ],
    scene: '飞行员的伤口严重感染，已经开始发高烧说胡话。程序员说："还记得昨天我们远处看到的那个烟雾吗？可能是另一个幸存者营地，距离大约2公里。"向导："暴风雪中徒步2公里...很危险，但如果那里有抗生素..."你陷入两难：如果不去，飞行员可能撑不过今晚；但如果去了，可能全死在路上...',
    npcsInvolved: ['pilot', 'guide'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '暴风雪中徒步太危险了。如果我们全死在路上，飞行员也活不了。',
        consequences: {
          stress: 3,
          npcDeath: ['pilot'],
          npcState: [
            { roleId: 'programmer', state: 'agitated' },
            { roleId: 'guide', state: 'agitated' },
          ],
          biasRecorded: 'omission_bias',
          description: '你选择了"安全"的不作为。当晚，飞行员因感染死亡。团队陷入深深的自责和愤怒——你们本可以救他。压力+3（+2因NPC死亡），士气崩溃。',
        },
        longTermEffects: '飞行员的死亡将永远是团队的心理阴影',
      },
      {
        id: 'B',
        type: 'rational',
        text: '我们必须行动。向导，带路。为了飞行员，值得冒险。',
        npcSuggestion: {
          npcRole: 'guide',
          suggestsThis: true,
        },
        consequences: {
          stress: 1,
          playerHP: -15,
          npcHP: [
            { roleId: 'assistant', value: -15 },
            { roleId: 'guide', value: -15 },
            { roleId: 'pilot', value: 25 },
            { roleId: 'sales', value: -15 },
          ],
          npcState: [
            { roleId: 'pilot', state: 'calm' },
          ],
          npcRelationship: [
            { roleId: 'pilot', relationship: 'ally' },
          ],
          perfectDecision: true,
          description: '完美决策！艰难的徒步后，你们找到了一个废弃的医疗站，获得了抗生素。全员受冻（-15HP），但飞行员得救了（+25HP，恢复"冷静"），他对你感激涕零。行动胜过空等。',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] 我一个人去。我速度快，风险小。你们照顾飞行员。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: 0,
          playerHP: -20,
          npcHP: [
            { roleId: 'pilot', value: 30 },
          ],
          npcState: [
            { roleId: 'pilot', state: 'calm' },
          ],
          npcRelationship: [
            { roleId: 'pilot', relationship: 'ally' },
          ],
          perfectDecision: true,
          description: '完美决策！你独自承担风险，成功带回了抗生素（自己HP-20）。飞行员得救（+30HP），全队对你的勇气肃然起敬。',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_CHOICE',
        type: 'special',
        text: '（虚弱地）...不要...为了我...冒险...让我...安静地...',
        roleSpecific: 'pilot',
        consequences: {
          stress: 4,
          playerHP: -10,
          npcHP: [
            { roleId: 'pilot', value: -50 },
          ],
          biasRecorded: 'omission_bias',
          description: '你尊重了飞行员的意愿，选择了不作为。但这只是你逃避责任的借口。飞行员HP降至危险水平（-50），可能无法存活到救援。',
        },
      },
      // 助理专属
      {
        id: 'ASSISTANT_SKILL',
        type: 'skill',
        text: '[急救] （检查飞行员）他还有6-8小时。我和向导去，速度够快。',
        roleSpecific: 'assistant',
        skillRequired: 'first_aid',
        prerequisites: [
          { type: 'npc_alive', target: 'guide', value: true },
        ],
        consequences: {
          stress: -1,
          playerHP: -15,
          npcHP: [
            { roleId: 'guide', value: -15 },
            { roleId: 'pilot', value: 35 },
          ],
          npcState: [
            { roleId: 'pilot', state: 'calm' },
          ],
          perfectDecision: true,
          description: '完美决策！你用专业判断确定了时间窗口，和向导成功完成任务。飞行员得救（+35HP），你们证明了计算风险后的行动胜过盲目等待。',
        },
      },
    ],
  },
];
