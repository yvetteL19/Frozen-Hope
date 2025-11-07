import { Event } from '../types';

// 第一幕事件（第2-3天）- 从5选3
export const ACT1_EVENTS: Event[] = [
  // 事件1: "谁是领袖?"
  {
    id: 'act1_who_is_leader',
    act: 1,
    name: '谁是领袖?',
    bias: 'authority_bias',
    conflict: '团队是否需要一个绝对领袖？',
    scene: '第2天，幸存者们因琐事（谁看守物资、谁去探索）发生争吵。CEO站出来："都安静！情况很明显，我最有领导经验。现在所有人必须听我指挥，统一分配资源。"',
    npcsInvolved: ['ceo', 'sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '同意。我们需要一个领导者。',
        consequences: {
          stress: 2,
          flags: [{ key: 'ceo_authority_established', value: true }],
          biasRecorded: 'authority_bias',
          description: 'CEO的权威被确立。销售总监不满但被压制。',
        },
        longTermEffects: '后续事件中，CEO的建议会被团队无条件接受',
      },
      {
        id: 'B',
        type: 'rational',
        text: '我们应该共同决定，而不是由你来任命。',
        consequences: {
          stress: 1,
          npcState: [{ roleId: 'ceo', state: 'agitated' }],
          description: '你顶住了压力，团队保持民主。CEO进入"激动"状态。',
        },
      },
      // CEO玩家专属
      {
        id: 'CEO_SKILL',
        type: 'skill',
        text: '[指挥] 保持安静！恐慌解决不了问题。现在，按我的计划行动。',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: 1,
          flags: [{ key: 'ceo_authority_established', value: true }],
          description: '你强行压制了混乱，确立了权威。',
        },
      },
      // 销售总监专属
      {
        id: 'SALES_SKILL',
        type: 'skill',
        text: '[谈判] （对CEO说）我同意你需要帮手，但（对大家说）我们必须确保每个人的声音都被听到。',
        roleSpecific: 'sales',
        skillRequired: 'negotiation',
        consequences: {
          stress: 1,
          flags: [{ key: 'ceo_authority_established', value: true }],
          npcRelationship: [{ roleId: 'ceo', relationship: 'ally' }],
          description: '你成功阻止了直接冲突，团队默认了CEO的领导，但你与CEO建立了同盟。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SPECIAL',
        type: 'special',
        text: '（低声说）...也许我们该先检查通讯设备？而不是争论这个？',
        roleSpecific: 'programmer',
        consequences: {
          stress: 0,
          description: '你的话被争吵声掩盖了，你没有卷入冲突。',
        },
      },
    ],
  },

  // 事件2: "第一次盘点"
  {
    id: 'act1_first_inventory',
    act: 1,
    name: '第一次盘点',
    bias: 'mcnamara_fallacy',
    conflict: '是否应该用"可量化的价值"来分配稀缺资源？',
    scene: '你们找到了一个应急箱：3条能量棒、1个医疗包、2条毯子。CEO说："我们必须量化幸存者的\'价值\'...飞行员腿断了（价值低），程序员能修信标（价值高）。我们应按价值分配。"',
    npcsInvolved: ['ceo', 'pilot', 'programmer'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '同意CEO。按"价值"分配。',
        consequences: {
          stress: 3,
          npcHP: [{ roleId: 'pilot', value: -35 }],
          npcState: [{ roleId: 'pilot', state: 'panicked' }],
          npcRelationship: [{ roleId: 'pilot', relationship: 'hostile' }],
          biasRecorded: 'mcnamara_fallacy',
          description: '飞行员得不到医疗包，HP-35并进入"恐慌"状态。他对你和CEO充满敌意。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '这太荒唐了！我们必须优先照顾伤者！',
        consequences: {
          stress: 1,
          npcHP: [{ roleId: 'pilot', value: 20 }],
          flags: [{ key: 'assistant_skill_revealed', value: true }],
          description: '飞行员获得医疗包，HP+20。助理主动揭露医疗技能："我...我学过...我来帮忙！"',
        },
      },
      // 助理专属
      {
        id: 'ASSISTANT_SKILL',
        type: 'skill',
        text: '[急救] （站出来）医疗包必须给飞行员，这是医学判断。我可以把能量棒弄碎做成"能量汤"平分。',
        roleSpecific: 'assistant',
        skillRequired: 'first_aid',
        consequences: {
          stress: -1, // 完美决策！
          playerHP: -5,
          npcHP: [{ roleId: 'pilot', value: 20 }],
          flags: [{ key: 'assistant_skill_revealed', value: true }],
          perfectDecision: true,
          description: '完美决策！你的专业性阻止了冲突，飞行员得到治疗，食物平分。',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_SKILL',
        type: 'skill',
        text: '[机械知识] 别管我的腿...残骸的隔热层里应该还有应急口粮。我告诉你们去哪里找。',
        roleSpecific: 'pilot',
        skillRequired: 'mechanical_knowledge',
        consequences: {
          stress: 0,
          playerHP: -8,
          items: [{ item: 'energy_bar', quantity: 2 }],
          description: '你找到了隐藏物资（+2能量棒），暂时绕开了分配难题。',
        },
      },
    ],
  },

  // 事件3: "被诅咒的信标"
  {
    id: 'act1_cursed_beacon',
    act: 1,
    name: '被诅咒的信标',
    bias: 'false_causality',
    conflict: '如何应对迷信和巧合？',
    scene: '应急信标在驾驶舱里滋滋作响。销售总监大喊："别碰它！我刚才试着重启了一下，风雪立刻就变大了！这东西被诅咒了！"',
    npcsInvolved: ['sales', 'programmer'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '他说得对，离它远点！太邪门了。',
        consequences: {
          stress: 2,
          beaconProgress: -999, // 特殊值表示锁定
          biasRecorded: 'false_causality',
          description: '信标修复进度被锁定在0%。团队陷入迷信。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '这是巧合！我们必须尝试修复它！',
        consequences: {
          stress: 1,
          beaconProgress: 10,
          flags: [{ key: 'programmer_skill_revealed', value: true }],
          description: '程序员受到鼓舞："他说得对！...我来看看。" 信标修复进度10%。',
        },
      },
      // 程序员专属
      {
        id: 'PROGRAMMER_SKILL',
        type: 'skill',
        text: '[修复] 都让开，这不是诅咒，是短路。风雪只是巧合。给我十分钟。',
        roleSpecific: 'programmer',
        skillRequired: 'repair',
        consequences: {
          stress: -1, // 完美决策
          playerHP: -8,
          beaconProgress: 50,
          npcState: [{ roleId: 'sales', state: 'calm' }],
          perfectDecision: true,
          description: '完美决策！你用专业知识碾压了迷信。信标修复进度50%！',
        },
      },
      // 向导专属
      {
        id: 'GUIDE_SKILL',
        type: 'skill',
        text: '[荒野智慧] （你看了看外面）风雪没有变大。是风向变了，声音听起来更大了。',
        roleSpecific: 'guide',
        skillRequired: 'wilderness_wisdom',
        consequences: {
          stress: 0,
          playerHP: -8,
          beaconProgress: 10,
          description: '你用专业知识反驳了迷信。信标修复进度10%。',
        },
      },
    ],
  },

  // 事件4: "第一个夜晚"
  {
    id: 'act1_first_night',
    act: 1,
    name: '第一个夜晚',
    bias: 'emotional_reasoning',
    conflict: '如何应对他人的情绪崩溃？',
    scene: '夜晚降临，温度骤降至-20°C。只有2条毯子。助理在角落里哭泣："我好冷...我感觉我快死了...我不想死..."她的恐慌情绪在传染。',
    npcsInvolved: ['assistant'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '（对助理说）我们都会死的！别哭了！',
        consequences: {
          stress: 3,
          playerHP: -15,
          npcHP: [
            { roleId: 'assistant', value: -15 },
            { roleId: 'ceo', value: -10 },
            { roleId: 'programmer', value: -10 },
            { roleId: 'guide', value: -10 },
            { roleId: 'pilot', value: -10 },
            { roleId: 'sales', value: -10 },
          ],
          npcState: [{ roleId: 'assistant', state: 'panicked' }],
          biasRecorded: 'emotional_reasoning',
          description: '助理彻底崩溃，恐慌情绪像瘟疫般蔓延。全员HP大幅下降。',
        },
      },
      {
        id: 'B',
        type: 'neutral',
        text: '把毯子给她！让她冷静下来！',
        consequences: {
          stress: 1,
          playerHP: -10,
          npcHP: [
            { roleId: 'ceo', value: -10 },
            { roleId: 'programmer', value: -10 },
            { roleId: 'guide', value: -10 },
            { roleId: 'pilot', value: -10 },
            { roleId: 'sales', value: -10 },
          ],
          npcState: [{ roleId: 'assistant', state: 'calm' }],
          description: '助理拿到毯子，恢复冷静。但其他没有毯子的人（包括你）HP-10。',
        },
      },
      // 助理专属
      {
        id: 'ASSISTANT_SKILL',
        type: 'skill',
        text: '[急救] （对大家说）听着，保持冷静！恐慌会加速热量流失。我们所有人挤在一起...',
        roleSpecific: 'assistant',
        skillRequired: 'first_aid',
        prerequisites: [{ type: 'skill_revealed', target: 'assistant', value: true }],
        consequences: {
          stress: -1,
          playerHP: -13, // -5技能成本（助理技能成本） -8环境
          npcHP: [
            { roleId: 'ceo', value: -8 },
            { roleId: 'programmer', value: -8 },
            { roleId: 'assistant', value: -8 },
            { roleId: 'guide', value: -8 },
            { roleId: 'pilot', value: -8 },
            { roleId: 'sales', value: -8 },
          ],
          flags: [{ key: 'assistant_skill_revealed', value: true }],
          perfectDecision: true,
          description: '完美决策！你用专业知识稳定了团队。全员HP-8（最小损失）。',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_SKILL',
        type: 'skill',
        text: '[机械知识] 哭没用。把这个座位上的隔音棉扯下来！它能保暖。',
        roleSpecific: 'pilot',
        skillRequired: 'mechanical_knowledge',
        consequences: {
          stress: -1,
          playerHP: -13, // -8技能成本 -5环境
          npcHP: [
            { roleId: 'ceo', value: -5 },
            { roleId: 'programmer', value: -5 },
            { roleId: 'assistant', value: -5 },
            { roleId: 'guide', value: -5 },
            { roleId: 'pilot', value: -5 },
            { roleId: 'sales', value: -5 },
          ],
          perfectDecision: true,
          description: '完美决策！你找到了新的保暖材料。全员HP-5。',
        },
      },
    ],
  },

  // 事件5: "飞行员的腿"
  {
    id: 'act1_pilots_leg',
    act: 1,
    name: '飞行员的腿',
    bias: 'sunk_cost',
    conflict: '是否应该继续一个已经失败的救援方案？',
    prerequisites: [{ type: 'npc_alive', target: 'pilot', value: true }],
    scene: '飞行员的腿被座椅残骸卡住了，血流不止。你们已经花了一个小时试图把他拉出来，但他疼得大叫，残骸在晃动。销售总监："我们已经花了一个小时了！再试一次，一定能行！"',
    npcsInvolved: ['pilot', 'sales'],
    choices: [
      {
        id: 'A',
        type: 'trap',
        text: '同意，继续拉！我们已经投入这么多了！',
        consequences: {
          stress: 4,
          playerHP: -25,
          npcDeath: ['pilot'],
          biasRecorded: 'sunk_cost',
          description: '残骸发生二次坍塌。飞行员死亡。参与救援的你HP-25。',
        },
      },
      {
        id: 'B',
        type: 'rational',
        text: '停下！必须先想办法锯开金属，或者加固残骸。',
        consequences: {
          stress: 1,
          npcHP: [{ roleId: 'pilot', value: -20 }],
          flags: [{ key: 'assistant_skill_revealed', value: true }],
          description: '飞行员HP-20，但活着。助理主动提供止血帮助。',
        },
      },
      // 飞行员专属
      {
        id: 'PILOT_SKILL',
        type: 'skill',
        text: '[机械知识] （忍痛大喊）别拉了！去把液压管切断！那里的压力泄了，座位就能松开！',
        roleSpecific: 'pilot',
        skillRequired: 'mechanical_knowledge',
        consequences: {
          stress: 0,
          playerHP: -38, // -8技能 -30伤害
          description: '你被成功救出，但腿部重伤。HP-30。',
        },
      },
      // 助理专属
      {
        id: 'ASSISTANT_SKILL',
        type: 'skill',
        text: '[急救] 都住手！你们在杀了他！我这里有止痛剂...我先给他注射。',
        roleSpecific: 'assistant',
        skillRequired: 'first_aid',
        prerequisites: [{ type: 'skill_revealed', target: 'assistant', value: true }],
        consequences: {
          stress: 0,
          playerHP: -5,
          npcHP: [{ roleId: 'pilot', value: -10 }],
          items: [{ item: 'medkit', quantity: -1 }],
          description: '飞行员暂时脱离危险，团队冷静下来。飞行员HP-10。',
        },
      },
      // CEO专属（技能陷阱）
      {
        id: 'CEO_SKILL_TRAP',
        type: 'skill',
        text: '[指挥] （对销售总监）说得对！（对团队）所有人，听我指挥，1...2...3...拉！',
        roleSpecific: 'ceo',
        skillRequired: 'command',
        consequences: {
          stress: 3, // +1技能 +2陷阱
          playerHP: -15,
          npcDeath: ['pilot'],
          biasRecorded: 'sunk_cost',
          description: '技能陷阱！你的指挥强行触发了错误方案。飞行员死亡。',
        },
      },
    ],
  },
];
