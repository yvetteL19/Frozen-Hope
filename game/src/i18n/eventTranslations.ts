// 事件本地化数据
import { LocalizedText, t } from './gameContent';
import { Language } from './index';

// 事件翻译类型
interface EventTranslation {
  name: LocalizedText;
  conflict: LocalizedText;
  scene: LocalizedText;
  choices: Record<string, {
    text: LocalizedText;
    description: LocalizedText;
    longTermEffects?: LocalizedText;
  }>;
}

// 第一幕事件翻译
export const act1EventTranslations: Record<string, EventTranslation> = {
  act1_who_is_leader: {
    name: {
      zh: '权威的错误指令',
      en: 'The Wrong Authority',
    },
    conflict: {
      zh: '是否服从领导在非专业领域的决策？',
      en: 'Should you follow a leader\'s decision outside their expertise?',
    },
    scene: {
      zh: '清晨，程序员发现信标电路板受潮。你立刻下令："我在管理层见过类似设备，应该直接用打火机烘干电路板！"助理低声提醒："这...可能会烧坏芯片..."但你语气强硬："听我的，我管过上千万的项目，相信我的判断。"',
      en: 'Morning. The programmer discovers the beacon circuit board is wet. You immediately order: "I\'ve seen similar equipment in management, we should directly dry the circuit board with a lighter!" The assistant quietly warns: "This... might burn the chips..." But you insist: "Listen to me, I\'ve managed projects worth tens of millions, trust my judgment."',
    },
    choices: {
      A: {
        text: {
          zh: '时间紧迫，先按我说的做。我的经验不会错。',
          en: 'Time is pressing, do as I said. My experience won\'t be wrong.',
        },
        description: {
          zh: '你信任了管理经验而非技术专业。电路板被烧坏，信标进度-15%。程序员沉默了。',
          en: 'You trusted management experience over technical expertise. The circuit board was burned, beacon progress -15%. The programmer went silent.',
        },
        longTermEffects: {
          zh: '团队开始怀疑你的判断力',
          en: 'The team begins to doubt your judgment',
        },
      },
      B: {
        text: {
          zh: '这是技术问题，应该让懂技术的人来判断。',
          en: 'This is a technical issue, we should let technical people decide.',
        },
        description: {
          zh: '你让专业人士做决定，但有人觉得你不够果断。信标进度+5%，但团队出现分歧。',
          en: 'You let professionals decide, but some think you lack decisiveness. Beacon progress +5%, but team shows division.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （停顿后说）...等等，我说错了。这是技术问题，程序员，你来决定。',
          en: '[Command] (After a pause) ...Wait, I was wrong. This is a technical issue, programmer, you decide.',
        },
        description: {
          zh: '完美决策！你展示了真正的领导力——承认自己的局限性。团队士气提升，成功修复。信标进度+12%。',
          en: 'Perfect decision! You showed true leadership - admitting your limitations. Team morale improved, repair successful. Beacon progress +12%.',
        },
      },
    },
  },

  act1_first_inventory: {
    name: {
      zh: '数据驱动的陷阱',
      en: 'The Data-Driven Trap',
    },
    conflict: {
      zh: '是否只依赖可量化指标做决策？',
      en: 'Should you rely only on quantifiable metrics for decisions?',
    },
    scene: {
      zh: '销售总监拿出笔记本做统计分析："修复信标的\'产出值\'最高，急救的\'成功率\'最高，导航和野外生存的\'量化贡献\'最低。今后资源分配必须按这些数据来。"飞行员愤怒地反驳："我的导航经验、向导的生存知识，这些你怎么量化？！"',
      en: 'The Sales Director pulls out a notebook for statistical analysis: "Beacon repair has the highest \'output value\', first aid has the highest \'success rate\', navigation and wilderness survival have the lowest \'quantified contributions\'. Resource allocation must follow these metrics from now on." The pilot angrily retorts: "My navigation experience, the guide\'s survival knowledge - how do you quantify that?!"',
    },
    choices: {
      A: {
        text: {
          zh: '销售总监说得有道理。客观数据比主观经验更可靠。',
          en: 'The Sales Director makes sense. Objective data is more reliable than subjective experience.',
        },
        description: {
          zh: '你用"科学"包装了偏见。飞行员和向导感到被轻视，拒绝再分享经验。压力+3。',
          en: 'You wrapped bias in "science". The pilot and guide feel slighted and refuse to share experience. Stress +3.',
        },
        longTermEffects: {
          zh: '飞行员和向导将不再主动提供建议',
          en: 'The pilot and guide will no longer proactively offer advice',
        },
      },
      B: {
        text: {
          zh: '数据有用，但不是全部。有些救命的东西没法放进表格里。',
          en: 'Data is useful, but not everything. Some life-saving things can\'t fit in spreadsheets.',
        },
        description: {
          zh: '你拒绝了"科学管理"，有人认为你不够理性。但飞行员和向导感激你重视他们。',
          en: 'You rejected "scientific management", some think you\'re not rational enough. But the pilot and guide appreciate your respect.',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] 向导冷静地说："老板，你能量化\'在暴风雪中不迷路的直觉\'吗？能量化\'知道哪里有水源\'的经验吗？"',
          en: '[Wilderness Wisdom] The guide says calmly: "Boss, can you quantify \'the intuition to not get lost in a blizzard\'? Can you quantify \'knowing where to find water\'?"',
        },
        description: {
          zh: '向导用具体例子揭示了量化的局限性。你沉默了。团队意识到，生存需要数据，更需要智慧。',
          en: 'The guide revealed the limitations of quantification with concrete examples. You fell silent. The team realized survival needs data, but wisdom even more.',
        },
      },
      PROGRAMMER_SKILL: {
        text: {
          zh: '[修复] 程序员站出来："我反对。我修信标靠的是飞行员教我电路原理，向导帮我找工具。这不是我一个人的\'产出\'。"',
          en: '[Repair] The programmer speaks up: "I object. I fix the beacon because the pilot taught me circuit principles, the guide found tools. This isn\'t my \'output\' alone."',
        },
        description: {
          zh: '程序员主动拒绝了"特权"，强调团队协作的不可量化价值。你意识到自己错了。全员士气大幅提升，压力-2。',
          en: 'The programmer actively rejected "privilege", emphasizing the unquantifiable value of teamwork. You realize you were wrong. Everyone\'s morale significantly improved, stress -2.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （停顿后）...我想起了公司倒闭的原因。我们盯着季度报表，忘记了客户信任无法量化。我错了。',
          en: '[Command] (After a pause) ...I remember why our company failed. We focused on quarterly reports, forgetting customer trust can\'t be quantified. I was wrong.',
        },
        description: {
          zh: '完美决策！你从失败中学到了教训，公开承认量化思维的局限性。这是真正的领导力，团队信任感大幅提升。',
          en: 'Perfect decision! You learned from failure and publicly admitted the limitations of quantitative thinking. This is true leadership, team trust significantly improved.',
        },
      },
    },
  },

  act1_cursed_beacon: {
    name: {
      zh: '被诅咒的信标',
      en: 'The Cursed Beacon',
    },
    conflict: {
      zh: '如何应对迷信和巧合？',
      en: 'How to deal with superstition and coincidence?',
    },
    scene: {
      zh: '应急信标在驾驶舱里滋滋作响。销售总监大喊："别碰它！我刚才试着重启了一下，风雪立刻就变大了！这东西被诅咒了！"',
      en: 'The emergency beacon crackles in the cockpit. The Sales Director shouts: "Don\'t touch it! I just tried to restart it and the blizzard immediately got worse! This thing is cursed!"',
    },
    choices: {
      A: {
        text: {
          zh: '宁可信其有。在这种环境下，我们承受不起更多风险。',
          en: 'Better safe than sorry. In this situation, we can\'t afford more risks.',
        },
        description: {
          zh: '你选择了"安全"，但实际上浪费了宝贵的时间。信标修复进度-30%，团队士气受挫。',
          en: 'You chose "safety", but actually wasted precious time. Beacon repair progress -30%, team morale drops.',
        },
      },
      B: {
        text: {
          zh: '巧合而已。但为了安抚大家，让我们小心地检查一下。',
          en: 'Coincidence. But to reassure everyone, let\'s carefully check it.',
        },
        description: {
          zh: '你用理性战胜了恐惧，但有人仍然不安。信标修复进度15%。',
          en: 'You overcame fear with reason, but some remain uneasy. Beacon repair progress 15%.',
        },
      },
      PROGRAMMER_SKILL: {
        text: {
          zh: '[修复] 都让开，这不是诅咒，是短路。风雪只是巧合。给我十分钟。',
          en: '[Repair] Everyone step back, this isn\'t a curse, it\'s a short circuit. The blizzard is just coincidence. Give me ten minutes.',
        },
        description: {
          zh: '完美决策！你用专业知识碾压了迷信。信标修复进度40%！',
          en: 'Perfect decision! You crushed superstition with expertise. Beacon repair progress 40%!',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] （你看了看外面）风雪没有变大。是风向变了，声音听起来更大了。',
          en: '[Wilderness Wisdom] (You look outside) The blizzard didn\'t get worse. The wind direction changed, making it sound louder.',
        },
        description: {
          zh: '你用专业知识反驳了迷信。信标修复进度10%。',
          en: 'You refuted the superstition with expertise. Beacon repair progress 10%.',
        },
      },
    },
  },

  act1_first_night: {
    name: {
      zh: '第一个夜晚',
      en: 'The First Night',
    },
    conflict: {
      zh: '如何应对他人的情绪崩溃？',
      en: 'How to handle someone\'s emotional breakdown?',
    },
    scene: {
      zh: '夜晚降临，温度骤降至-20°C。只有2条毯子。助理在角落里哭泣："我好冷...我感觉我快死了...我不想死..."她的恐慌情绪在传染。',
      en: 'Night falls, temperature drops to -20°C. Only 2 blankets. The assistant cries in a corner: "I\'m so cold... I feel like I\'m dying... I don\'t want to die..." Her panic is spreading.',
    },
    choices: {
      A: {
        text: {
          zh: '直接告诉她真相：情况很危险，但哭解决不了问题。',
          en: 'Tell her the truth directly: the situation is dangerous, but crying won\'t solve anything.',
        },
        description: {
          zh: '你的"直率"让助理彻底崩溃。恐慌情绪传染，全员士气大跌。',
          en: 'Your "directness" made the assistant completely break down. Panic spreads, everyone\'s morale plummets.',
        },
      },
      B: {
        text: {
          zh: '先稳定她的情绪。把你的毯子让给她，虽然你会更冷。',
          en: 'First stabilize her emotions. Give her your blanket, even though you\'ll be colder.',
        },
        description: {
          zh: '助理冷静下来了，但你自己受冻（HP-8）。没有毯子的夜晚很难熬。',
          en: 'The assistant calmed down, but you got cold (HP-8). A night without blankets is tough.',
        },
      },
      ASSISTANT_SKILL: {
        text: {
          zh: '[急救] （对大家说）听着，保持冷静！恐慌会加速热量流失。我们所有人挤在一起...',
          en: '[First Aid] (To everyone) Listen, stay calm! Panic accelerates heat loss. Everyone huddle together...',
        },
        description: {
          zh: '你稳定了团队情绪，但消耗巨大。程序员对拥挤不满。全员HP-6。',
          en: 'You stabilized team emotions, but at great cost. The programmer resents the crowding. Everyone HP -6.',
        },
      },
      PILOT_SKILL: {
        text: {
          zh: '[机械知识] 哭没用。把这个座位上的隔音棉扯下来！它能保暖。',
          en: '[Mechanical Knowledge] Crying won\'t help. Tear off the insulation from this seat! It can keep us warm.',
        },
        description: {
          zh: '你找到保暖材料，但语气粗暴刺激了助理的情绪。全员HP-4，助理HP-4。',
          en: 'You found insulation material, but your harsh tone irritated the assistant. Everyone HP -4, assistant HP -4.',
        },
      },
    },
  },

  act1_pilots_leg: {
    name: {
      zh: '飞行员的腿',
      en: 'The Pilot\'s Leg',
    },
    conflict: {
      zh: '是否应该继续一个已经失败的救援方案？',
      en: 'Should you continue a rescue plan that\'s already failing?',
    },
    scene: {
      zh: '飞行员的腿被座椅残骸卡住了，血流不止。你们已经花了一个小时试图把他拉出来，但他疼得大叫，残骸在晃动。销售总监："我们已经花了一个小时了！再试一次，一定能行！"',
      en: 'The pilot\'s leg is trapped by seat wreckage, bleeding heavily. You\'ve spent an hour trying to pull him out, but he screams in pain and the wreckage is shaking. Sales Director: "We\'ve spent an hour already! One more try, we can do it!"',
    },
    choices: {
      A: {
        text: {
          zh: '不能放弃！他还有意识，说明还有机会。再试一次！',
          en: 'Don\'t give up! He\'s still conscious, meaning there\'s still a chance. One more try!',
        },
        description: {
          zh: '残骸发生二次坍塌。飞行员死亡。参与救援的你HP-25。',
          en: 'The wreckage collapses again. The pilot dies. You HP -25 from participating in the rescue.',
        },
      },
      B: {
        text: {
          zh: '停！蛮力不行。必须先锯开金属或加固残骸，虽然会耽误时间。',
          en: 'Stop! Brute force won\'t work. We need to cut the metal or stabilize the wreckage first, even though it takes time.',
        },
        description: {
          zh: '你花了宝贵时间找工具。飞行员因为延误多流了血（HP-25），但活着。',
          en: 'You spent precious time finding tools. The pilot lost more blood due to the delay (HP-25), but survived.',
        },
      },
      PILOT_SKILL: {
        text: {
          zh: '[机械知识] （忍痛大喊）别拉了！去把液压管切断！那里的压力泄了，座位就能松开！',
          en: '[Mechanical Knowledge] (Shouting through the pain) Stop pulling! Cut the hydraulic line! Once the pressure is released, the seat will loosen!',
        },
        description: {
          zh: '你被成功救出，但腿部重伤。HP-30。',
          en: 'You were successfully rescued, but your leg is severely injured. HP -30.',
        },
      },
      ASSISTANT_SKILL: {
        text: {
          zh: '[急救] 都住手！你们在杀了他！我这里有止痛剂...我先给他注射。',
          en: '[First Aid] Everyone stop! You\'re killing him! I have painkillers... let me inject him first.',
        },
        description: {
          zh: '飞行员暂时脱离危险并恢复冷静，团队也平静下来。飞行员HP-5（比强行移动少损失5HP）。',
          en: 'The pilot is temporarily out of danger and calms down, team also calms down. Pilot HP -5 (5 HP less than forced movement).',
        },
      },
      CEO_SKILL_TRAP: {
        text: {
          zh: '[指挥] （对销售总监）说得对！（对团队）所有人，听我指挥，1...2...3...拉！',
          en: '[Command] (To Sales Director) You\'re right! (To team) Everyone, on my command, 1...2...3...pull!',
        },
        description: {
          zh: '技能陷阱！你的指挥强行触发了错误方案。飞行员死亡。',
          en: 'Skill trap! Your command forced the wrong approach. The pilot dies.',
        },
      },
    },
  },
};

// 第二幕事件翻译
export const act2EventTranslations: Record<string, EventTranslation> = {
  act2_guides_gamble: {
    name: {
      zh: '向导的赌博',
      en: 'The Guide\'s Gamble',
    },
    conflict: {
      zh: '是否相信单一成功案例？',
      en: 'Should you trust a single success case?',
    },
    scene: {
      zh: '风暴没有减弱的迹象。向导突然激动地说："我想起来了！我上次就在附近的一个山洞躲过了风暴！我们必须马上出发去那里！"',
      en: 'The storm shows no signs of weakening. The guide suddenly exclaims excitedly: "I remember now! I survived a storm in a cave nearby last time! We must leave for there immediately!"',
    },
    choices: {
      A: {
        text: {
          zh: '向导有实战经验，比我们坐以待毙强。跟他走！',
          en: 'The guide has practical experience, better than sitting here waiting to die. Follow him!',
        },
        description: {
          zh: '经验不等于真理。暴风雪中迷路，什么也没找到。全员-35 HP，狼狈逃回。向导崩溃了。',
          en: 'Experience doesn\'t equal truth. Lost in the blizzard, found nothing. Everyone -35 HP, fled back in disarray. The guide broke down.',
        },
      },
      B: {
        text: {
          zh: '一次成功不代表总能成功。现在的条件不一样。',
          en: 'One success doesn\'t mean it will always succeed. Current conditions are different.',
        },
        description: {
          zh: '你质疑了"专家"，向导感到被冒犯。但团队留在了安全的地方。',
          en: 'You questioned the "expert", the guide felt offended. But the team stayed in a safe place.',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] （你仔细回忆）...等一下...当时没有暴风雪。现在去，我们都会死。',
          en: '[Wilderness Wisdom] (You recall carefully) ...Wait a moment... there was no blizzard back then. If we go now, we\'ll all die.',
        },
        description: {
          zh: '完美决策！你用专业知识否定了自己的错误判断。',
          en: 'Perfect decision! You used professional knowledge to reject your own wrong judgment.',
        },
      },
      PILOT_SKILL: {
        text: {
          zh: '[机械知识] （查看仪表）气压计显示风暴中心正在接近。向导，时机是错的。',
          en: '[Mechanical Knowledge] (Checking instruments) The barometer shows the storm center is approaching. Guide, the timing is wrong.',
        },
        description: {
          zh: '完美决策！你用数据说服了向导。',
          en: 'Perfect decision! You convinced the guide with data.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （冷静地）向导，你确定吗？详细描述一下上次的情况——天气、距离、时间。',
          en: '[Command] (Calmly) Guide, are you sure? Describe the last time in detail - weather, distance, time.',
        },
        description: {
          zh: '完美决策！你用提问引导向导自己发现错误。他承认上次没有暴风雪，情况完全不同。团队避免了灾难。',
          en: 'Perfect decision! You guided the guide to discover his own mistake through questioning. He admitted there was no blizzard last time, the situation was completely different. The team avoided disaster.',
        },
      },
    },
  },

  act2_last_medicine: {
    name: {
      zh: '最后的药品',
      en: 'The Last Medicine',
    },
    conflict: {
      zh: '一份药品，两个病人，如何选择？',
      en: 'One dose of medicine, two patients, how to choose?',
    },
    scene: {
      zh: '飞行员的腿伤感染了，发烧严重。同时，销售总监因慢性病在颤抖。你手里只有最后一份抗生素。助理："我们已经在飞行员身上花了那么多精力！"向导："销售总监状态也很糟糕！"',
      en: 'The pilot\'s leg wound is infected, with severe fever. Meanwhile, the Sales Director is trembling from a chronic condition. You only have the last dose of antibiotics. Assistant: "We\'ve already invested so much effort in the pilot!" Guide: "The Sales Director is in bad shape too!"',
    },
    choices: {
      A: {
        text: {
          zh: '把药给飞行员。',
          en: 'Give the medicine to the pilot.',
        },
        description: {
          zh: '飞行员稳定。销售总监HP-20，进入"恐慌"状态。',
          en: 'The pilot stabilized. Sales Director HP -20, enters "panicked" state.',
        },
      },
      B: {
        text: {
          zh: '把药给销售总监。',
          en: 'Give the medicine to the Sales Director.',
        },
        description: {
          zh: '销售总监稳定。飞行员HP-20，进入"恐慌"状态。',
          en: 'The Sales Director stabilized. Pilot HP -20, enters "panicked" state.',
        },
      },
      ASSISTANT_SKILL: {
        text: {
          zh: '[急救] 别吵了。我能把药精确地分成两半，虽然效果减半，但都能稳住。',
          en: '[First Aid] Stop arguing. I can precisely split the medicine in half. Though the effect is halved, both can be stabilized.',
        },
        description: {
          zh: '你用专业技巧暂时稳住两人，但分裂药品引发争议。全员不满增加。',
          en: 'You temporarily stabilized both with professional skills, but splitting the medicine caused controversy. Team resentment increased.',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] 抗生素给销售总监。我认识一种苔藓，可以给飞行员的伤口外部消炎。',
          en: '[Wilderness Wisdom] Give the antibiotics to the Sales Director. I know a type of moss that can reduce inflammation on the pilot\'s wound externally.',
        },
        description: {
          zh: '你用替代方案解决了两难。销售总监稳定，飞行员HP-10。',
          en: 'You solved the dilemma with an alternative. Sales Director stabilized, pilot HP -10.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （深吸一口气）让助理评估谁更危急。这是医疗决策，不是管理决策。',
          en: '[Command] (Taking a deep breath) Let the assistant assess who is more critical. This is a medical decision, not a management decision.',
        },
        description: {
          zh: '你把决策权交给助理，但她压力太大，两人恢复效果有限。全员紧张。',
          en: 'You delegated the decision to the assistant, but she was under too much pressure, resulting in limited recovery for both. Everyone is tense.',
        },
      },
    },
  },

  act2_sunk_cost_fixed: {
    name: {
      zh: '沉没的无线电',
      en: 'The Sunken Radio',
    },
    conflict: {
      zh: '是否继续投入已经失败的项目？',
      en: 'Should you continue investing in a failing project?',
    },
    scene: {
      zh: '程序员沮丧地说："应急无线电彻底烧坏了，修复它至少还要2天和最后的工具包。"你的直觉告诉你不能放弃——已经在它上面花了那么多时间和资源，现在放弃就是前功尽弃。但向导低声提醒："还有最后一次机会用燃烧的残骸制作信号烟火，但只能今天...明天风向会变..."',
      en: 'The programmer says frustratedly: "The emergency radio is completely burned out, repairing it needs at least 2 more days and the last toolkit." Your instinct says you can\'t give up - you\'ve already spent so much time and resources on it, giving up now means losing everything. But the guide whispers: "There\'s one last chance to make signal flares from burning wreckage, but only today... tomorrow the wind direction will change..."',
    },
    choices: {
      A: {
        text: {
          zh: '坚持就是胜利。再给它两天，说不定就修好了。',
          en: 'Persistence is victory. Give it two more days, maybe it\'ll be fixed.',
        },
        description: {
          zh: '"坚持"变成了"固执"。2天后无线电仍然报废，信号烟火的时机也错过了。信标进度-5%。',
          en: '"Persistence" became "stubbornness". 2 days later the radio is still dead, and the signal flare opportunity was missed. Beacon progress -5%.',
        },
        longTermEffects: {
          zh: '错失了替代救援方案',
          en: 'Missed the alternative rescue plan',
        },
      },
      B: {
        text: {
          zh: '及时止损。把资源投到更有希望的方案上。',
          en: 'Cut losses in time. Invest resources in a more promising plan.',
        },
        description: {
          zh: '你放弃了"心血"，程序员有些失落（HP-5）。但信号烟火成功引起注意。信标进度+15%。',
          en: 'You abandoned your "hard work", the programmer is somewhat disappointed (HP -5). But the signal flare successfully attracted attention. Beacon progress +15%.',
        },
      },
      PROGRAMMER_SKILL: {
        text: {
          zh: '[修复] 抱歉，作为工程师我必须说实话：它修不好了。我们该及时止损。',
          en: '[Repair] Sorry, as an engineer I must be honest: it can\'t be fixed. We should cut our losses.',
        },
        description: {
          zh: '完美决策！你用专业判断说服团队放弃无效投资。成功制作信号烟火并修复部分信标系统，信标进度+20%。',
          en: 'Perfect decision! You convinced the team to abandon the failed investment with professional judgment. Successfully made signal flares and repaired part of the beacon system, beacon progress +20%.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （深呼吸）...我错了。止损也是管理决策的一部分。向导，你说怎么做。',
          en: '[Command] (Deep breath) ...I was wrong. Cutting losses is also part of management decisions. Guide, tell us what to do.',
        },
        description: {
          zh: '完美决策！你展示了真正的领导力——及时纠错。团队士气大幅提升，成功制作信号烟火，信标进度+18%。',
          en: 'Perfect decision! You showed true leadership - correcting mistakes in time. Team morale greatly improved, successfully made signal flares, beacon progress +18%.',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] （坚定地说）时间窗口只有今天！我不管你们之前投入了什么，现在的选择才决定我们的生死！',
          en: '[Wilderness Wisdom] (Firmly) The window is only today! I don\'t care what you\'ve invested before, today\'s choice determines our life or death!',
        },
        description: {
          zh: '完美决策！你用生存经验打破了沉没成本陷阱。团队采纳了你的建议，成功制作并点燃信号烟火，信标进度+25%！',
          en: 'Perfect decision! You broke the sunk cost trap with survival experience. The team adopted your advice, successfully made and lit the signal flares, beacon progress +25%!',
        },
      },
    },
  },

  act2_gamblers_storm: {
    name: {
      zh: '赌徒的风暴',
      en: 'The Gambler\'s Storm',
    },
    conflict: {
      zh: '风暴会"该停了"吗？',
      en: 'Will the storm "be due to stop"?',
    },
    scene: {
      zh: '连续第3天，暴风雪丝毫没有减弱。食物快吃完了。助理说："风雪已经刮了这么久，它一定快停了！我们应该把最后的食物全吃了，为明天天晴出发做准备！"',
      en: 'For the 3rd consecutive day, the blizzard shows no signs of weakening. Food is running out. The assistant says: "The storm has been raging for so long, it must be about to stop! We should eat all our remaining food to prepare for departure when it clears tomorrow!"',
    },
    choices: {
      A: {
        text: {
          zh: '概率上讲，连续这么多天暴风雪，明天应该会好转。吃饱才有力气行动。',
          en: 'Statistically speaking, after so many days of blizzard, tomorrow should improve. We need to eat well to have energy to act.',
        },
        description: {
          zh: '天气不讲"概率平衡"。第二天风雪加倍，全员饿得头晕眼花。HP-30。',
          en: 'Weather doesn\'t follow "probability balance". The next day the storm doubled, everyone dizzy from hunger. HP -30.',
        },
      },
      B: {
        text: {
          zh: '天气是独立事件，不会因为"刮够了"就停。继续配给。',
          en: 'Weather events are independent, it won\'t stop just because "it\'s been long enough". Continue rationing.',
        },
        description: {
          zh: '你的"冷酷理性"让助理失望（HP-5）。但食物储备延长了一天。',
          en: 'Your "cold rationality" disappointed the assistant (HP -5). But food reserves were extended by one day.',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] 你们看雪的积向。这是季风，不会因为"刮得久了"就停下。',
          en: '[Wilderness Wisdom] Look at the snow accumulation direction. This is a monsoon, it won\'t stop just because "it\'s been blowing long enough".',
        },
        description: {
          zh: '完美决策！你用专业知识阻止了灾难。',
          en: 'Perfect decision! You prevented disaster with professional knowledge.',
        },
      },
      PROGRAMMER_SPECIAL: {
        text: {
          zh: '这是统计学谬误。过去的随机事件不会影响未来的独立事件。',
          en: 'This is a statistical fallacy. Past random events don\'t affect future independent events.',
        },
        description: {
          zh: '完美决策！你的理性分析说服了大家。',
          en: 'Perfect decision! Your rational analysis convinced everyone.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （坚定地）我理解大家的心情，但天气不欠我们晴天。继续配给，这是命令。',
          en: '[Command] (Firmly) I understand everyone\'s feelings, but the weather doesn\'t owe us sunshine. Continue rationing, that\'s an order.',
        },
        description: {
          zh: '完美决策！你用领导力压制了赌徒心理。助理冷静下来接受了你的决定。食物储备延长。',
          en: 'Perfect decision! You suppressed the gambler\'s mentality with leadership. The assistant calmed down and accepted your decision. Food reserves extended.',
        },
      },
    },
  },

  act2_hidden_reserve: {
    name: {
      zh: '隐藏的储备',
      en: 'The Hidden Reserve',
    },
    conflict: {
      zh: '是否加入自私阵营？',
      en: 'Should you join the selfish faction?',
    },
    scene: {
      zh: '你发现销售总监在角落里鬼鬼祟祟。他藏了一小块巧克力。他低声说："嘘...CEO和飞行员都是累赘。你跟我合作，我们两个聪明人才能活下来。这块给你。"',
      en: 'You catch the Sales Director acting suspicious in a corner. He\'s hidden a small piece of chocolate. He whispers: "Shh... The CEO and pilot are dead weight. Work with me, only us two smart people can survive. This is for you."',
    },
    choices: {
      A: {
        text: {
          zh: '他说得有道理...在这种环境下，聪明人确实更容易活下来。',
          en: 'He has a point... In this environment, smart people do have a better chance of survival.',
        },
        description: {
          zh: '你接受了"利益交换"（HP+10）。但你和销售总监绑在了一起，后患无穷。',
          en: 'You accepted the "deal" (HP +10). But you\'re now tied to the Sales Director, with endless future troubles.',
        },
      },
      B: {
        text: {
          zh: '团队要共同进退。把巧克力交出来，平分给大家。',
          en: 'The team advances and retreats together. Hand over the chocolate and share it with everyone.',
        },
        description: {
          zh: '销售总监进入"敌对"。巧克力被平分给全队（全员HP+2）。',
          en: 'The Sales Director becomes "hostile". The chocolate is shared with the whole team (everyone HP +2).',
        },
      },
      SALES_CHOICE: {
        text: {
          zh: '（公开）我找到了这个！我们平分吧。',
          en: '(Publicly) I found this! Let\'s share it.',
        },
        description: {
          zh: '完美决策！你赢得了团队的信任。全员HP+5。',
          en: 'Perfect decision! You won the team\'s trust. Everyone HP +5.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （看着销售总监的眼睛）你在干什么？把东西拿出来，现在。',
          en: '[Command] (Looking into the Sales Director\'s eyes) What are you doing? Hand it over, now.',
        },
        description: {
          zh: '完美决策！你展示了领导者的威严和公正。销售总监不情愿地交出巧克力（全员+3HP），但对你怀恨在心。',
          en: 'Perfect decision! You displayed a leader\'s authority and fairness. The Sales Director reluctantly handed over the chocolate (everyone +3 HP), but holds a grudge against you.',
        },
      },
    },
  },

  act2_fire_crisis: {
    name: {
      zh: '火源危机',
      en: 'The Fire Crisis',
    },
    conflict: {
      zh: '是否过度乐观？',
      en: 'Are you being overly optimistic?',
    },
    scene: {
      zh: '篝火的燃料快用完了。销售总监说："别担心！我们把所有木头一次性烧掉，今晚暖和一点。明天肯定会获救的！"温度是-30°C。',
      en: 'The campfire fuel is running out. The Sales Director says: "Don\'t worry! Let\'s burn all the wood at once, stay warmer tonight. We\'ll definitely be rescued tomorrow!" The temperature is -30°C.',
    },
    choices: {
      A: {
        text: {
          zh: '士气很重要。今晚暖和一点，大家明天才有精神等待救援。',
          en: 'Morale is important. Being warmer tonight means everyone will have more energy to await rescue tomorrow.',
        },
        description: {
          zh: '第二天救援没来，燃料耗尽。全员冻伤，HP-25，压力+3。',
          en: 'Rescue didn\'t come the next day, fuel exhausted. Everyone frostbitten, HP -25, stress +3.',
        },
      },
      B: {
        text: {
          zh: '今晚挨冻，但燃料要省着用。我们不知道还要撑多久。',
          en: 'We\'ll freeze tonight, but we must conserve fuel. We don\'t know how long we need to hold out.',
        },
        description: {
          zh: '寒冷的一夜，全员受冻（HP-8）。但燃料延续了两天。',
          en: 'A cold night, everyone suffered from the cold (HP -8). But fuel lasted two more days.',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] 我能从残骸中找到更多可燃物。我们分批烧。',
          en: '[Wilderness Wisdom] I can find more combustibles from the wreckage. We\'ll burn them in batches.',
        },
        description: {
          zh: '完美决策！你找到了替代方案。',
          en: 'Perfect decision! You found an alternative solution.',
        },
      },
      PILOT_SKILL: {
        text: {
          zh: '[机械知识] 等等，飞机座椅的泡沫是可燃的。我们有更多燃料。',
          en: '[Mechanical Knowledge] Wait, the airplane seat foam is combustible. We have more fuel.',
        },
        description: {
          zh: '完美决策！你的专业知识解决了问题。',
          en: 'Perfect decision! Your professional knowledge solved the problem.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （冷静地）向导、飞行员，你们有专业知识。有没有替代燃料的方案？',
          en: '[Command] (Calmly) Guide, pilot, you have professional knowledge. Are there any alternative fuel options?',
        },
        description: {
          zh: '完美决策！你把问题交给专业人士，他们找到了座椅泡沫和飞机残骸的隔热层作为替代燃料。全员只损失-5HP。',
          en: 'Perfect decision! You delegated the problem to professionals, they found seat foam and aircraft insulation as alternative fuel. Everyone only lost -5 HP.',
        },
      },
    },
  },

  act2_beacon_breakthrough: {
    name: {
      zh: '信标突破',
      en: 'The Beacon Breakthrough',
    },
    conflict: {
      zh: '相信数据"模式"还是坚持安全程序？',
      en: 'Trust the data "pattern" or stick to safety procedures?',
    },
    scene: {
      zh: '程序员兴奋地说："我找到模式了！每30分钟电场波动一次，这是规律！我们可以在低谷期修复，成功率90%！"飞行员摇头："这太冒险，数据样本不够..."',
      en: 'The programmer says excitedly: "I found the pattern! Electric field fluctuates every 30 minutes, this is the rule! We can repair during the low period, 90% success rate!" Pilot shakes head: "Too risky, not enough data samples..."',
    },
    choices: {
      A: {
        text: {
          zh: '相信程序员的分析！数据不会说谎，在低谷期修复！',
          en: 'Trust the programmer\'s analysis! Data doesn\'t lie, repair during the low period!',
        },
        description: {
          zh: '你相信了"模式"，但这只是巧合。电场突然异常，信标进一步受损。进度-20%。程序员陷入自责。',
          en: 'You believed the "pattern", but it was just coincidence. Electric field suddenly abnormal, beacon further damaged. Progress -20%. Programmer falls into self-blame.',
        },
      },
      B: {
        text: {
          zh: '数据不足太冒险。按照安全程序来。',
          en: 'Insufficient data is too risky. Follow safety procedures.',
        },
        description: {
          zh: '你拒绝了"模式"诱惑。花了2小时安全修复，但程序员因分析被否定而沮丧。进度+10%。',
          en: 'You rejected the "pattern" temptation. Took 2 hours to safely repair, but programmer depressed from analysis being denied. Progress +10%.',
        },
      },
      PROGRAMMER_SKILL: {
        text: {
          zh: '[修复] （深呼吸）让我继续观察一天，收集更多数据再决定。',
          en: '[Repair] (Deep breath) Let me continue observing for a day, collecting more data before deciding.',
        },
        description: {
          zh: '你选择谨慎观察，收集更多数据。进度+15%，但等待一天消耗了时间和精力。',
          en: 'You chose careful observation, collecting more data. Progress +15%, but waiting a day consumed time and energy.',
        },
      },
      PILOT_SKILL: {
        text: {
          zh: '[机械知识] （翻阅手册）手册提到类似问题...应该是电容老化，需要逐级测试。',
          en: '[Mechanical Knowledge] (Reading manual) Manual mentions similar problems... should be capacitor aging, needs step-by-step testing.',
        },
        description: {
          zh: '你按手册安全操作。进度+15%，但程序员的"模式"理论被彻底否定，引发争执。',
          en: 'You operated safely following the manual. Progress +15%, but programmer\'s "pattern" theory was completely denied, causing conflict.',
        },
      },
      CEO_SPECIAL: {
        text: {
          zh: '（征求大家意见）大家都怎么说？让我们民主决定。',
          en: '(Seeking everyone\'s opinion) What does everyone think? Let\'s decide democratically.',
        },
        description: {
          zh: '你选择征求意见但延误了时机。最终选择保守方案，进度+8%。团队觉得你缺乏决断。',
          en: 'You chose to seek opinions but delayed timing. Finally chose conservative plan, progress +8%. Team feels you lack decisiveness.',
        },
      },
    },
  },

  act2_trust_test: {
    name: {
      zh: '信任测试',
      en: 'The Trust Test',
    },
    conflict: {
      zh: '如何分配有限的信任？',
      en: 'How to allocate limited trust?',
    },
    scene: {
      zh: '有人偷吃了最后的食物。所有人都在互相指责。助理："一定是那个受伤的飞行员！他行动不便，所以需要更多能量！"',
      en: 'Someone stole the last of the food. Everyone is accusing each other. Assistant: "It must be the injured pilot! He can\'t move easily, so he needs more energy!"',
    },
    choices: {
      A: {
        text: {
          zh: '助理说得有道理。飞行员行动不便，确实有动机和机会。',
          en: 'The assistant has a point. The pilot can\'t move easily, he does have motive and opportunity.',
        },
        description: {
          zh: '飞行员被孤立和殴打，HP-30。实际上是销售总监偷的。',
          en: 'The pilot was isolated and beaten, HP -30. It was actually the Sales Director who stole it.',
        },
      },
      B: {
        text: {
          zh: '没有证据之前，不能随意指控任何人。',
          en: 'Without evidence, we cannot accuse anyone.',
        },
        description: {
          zh: '你拒绝跟风指责。助理不满你没有支持她的判断。矛盾被压制但未解决。',
          en: 'You refused to follow the mob. The assistant is unhappy you didn\'t support her judgment. Conflict suppressed but not resolved.',
        },
      },
      ASSISTANT_SPECIAL: {
        text: {
          zh: '（轻声说）...我看到了...但我不想说...',
          en: '(Whispering) ...I saw it... but I don\'t want to say...',
        },
        description: {
          zh: '你选择沉默。这个秘密可能在未来有用。',
          en: 'You chose silence. This secret might be useful in the future.',
        },
      },
      SALES_SKILL: {
        text: {
          zh: '[谈判] （快速转移话题）现在不是内斗的时候！我们需要团结！',
          en: '[Negotiation] (Quickly changing the subject) Now is not the time for infighting! We need unity!',
        },
        description: {
          zh: '你成功转移了注意力。矛盾被掩盖。',
          en: 'You successfully diverted attention. The conflict was covered up.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （严肃地）在没有证据之前，我不允许任何人指控任何人。这是我的底线。',
          en: '[Command] (Seriously) Without evidence, I will not allow anyone to accuse anyone. This is my bottom line.',
        },
        description: {
          zh: '完美决策！你展示了领导者应有的公正。飞行员感激你的保护，成为你的坚定盟友。指控被搁置。',
          en: 'Perfect decision! You displayed the fairness a leader should have. The pilot is grateful for your protection and becomes your steadfast ally. The accusations were shelved.',
        },
      },
    },
  },

  act2_freezing_night: {
    name: {
      zh: '极寒之夜',
      en: 'The Freezing Night',
    },
    conflict: {
      zh: '面对极端寒冷如何分配资源？',
      en: 'How to allocate resources facing extreme cold?',
    },
    scene: {
      zh: '夜晚，温度骤降至-35°C。所有人都在发抖。只有一个取暖器，但电池只能支撑4小时。销售总监建议："我们把所有毯子给最重要的人！"',
      en: 'Night falls, temperature drops to -35°C. Everyone is shivering. There\'s only one heater, but the battery can only last 4 hours. The Sales Director suggests: "Let\'s give all the blankets to the most important people!"',
    },
    choices: {
      A: {
        text: {
          zh: '资源有限时，应该优先保护能干活的人。这是理性的选择。',
          en: 'When resources are limited, we should prioritize protecting those who can work. This is the rational choice.',
        },
        description: {
          zh: '被排除的人严重冻伤，濒临死亡。HP大幅下降，团队分裂。',
          en: 'Those excluded suffered severe frostbite, near death. HP dropped significantly, team split.',
        },
      },
      B: {
        text: {
          zh: '所有人围成一圈，共享体温。取暖器放中间。',
          en: 'Everyone form a circle, share body heat. Put the heater in the middle.',
        },
        description: {
          zh: '所有人都挨冻（全员-12HP），效率不如集中取暖。但团队保持了团结。',
          en: 'Everyone suffered cold (everyone -12 HP), less efficient than concentrated heating. But the team stayed united.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] 向导、飞行员，用你们的专业知识。有没有更好的取暖方案？',
          en: '[Command] Guide, pilot, use your professional knowledge. Is there a better heating solution?',
        },
        description: {
          zh: '完美决策！你调动专业资源。向导找到了更多隔热材料，飞行员调整了取暖器角度。全员损失最小化（-8HP）。',
          en: 'Perfect decision! You mobilized professional resources. The guide found more insulation materials, the pilot adjusted the heater angle. Everyone\'s loss minimized (-8 HP).',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] 我知道一个技巧——在雪地里挖个坑，上面盖残骸。雪是天然隔热层。',
          en: '[Wilderness Wisdom] I know a technique - dig a pit in the snow, cover it with wreckage. Snow is a natural insulator.',
        },
        description: {
          zh: '完美决策！你用荒野求生知识建造了雪洞。向导辛苦挖掘（HP-10），但其他人损失最小（-6HP）。',
          en: 'Perfect decision! You built a snow cave with wilderness survival knowledge. The guide worked hard digging (HP -10), but others had minimal loss (-6 HP).',
        },
      },
    },
  },

  act2_food_shortage: {
    name: {
      zh: '食物短缺',
      en: 'The Food Shortage',
    },
    conflict: {
      zh: '饥饿会让人做出什么选择？',
      en: 'What choices will hunger make people make?',
    },
    scene: {
      zh: '食物只剩下3份。所有人都饿了两天。助理开始翻找残骸，寻找任何可以吃的东西。',
      en: 'Only 3 portions of food remain. Everyone has been hungry for two days. The assistant starts rummaging through the wreckage, searching for anything edible.',
    },
    choices: {
      A: {
        text: {
          zh: '大家都饿了两天了，体力快撑不住。先吃饱恢复体力，才能想办法。',
          en: 'Everyone has been hungry for two days, energy is almost gone. We need to eat first to regain strength, then we can figure things out.',
        },
        description: {
          zh: '第二天更加绝望。全员因严重饥饿HP-35。',
          en: 'The next day was even more desperate. Everyone HP -35 from severe hunger.',
        },
      },
      B: {
        text: {
          zh: '严格配给。饿着肚子很痛苦，但我们必须撑更久。',
          en: 'Strict rationing. Being hungry is painful, but we must hold out longer.',
        },
        description: {
          zh: '持续的饥饿折磨着每个人（全员-10HP），销售总监抱怨不断。但食物延长了三天。',
          en: 'Continuous hunger tormented everyone (everyone -10 HP), the Sales Director complained constantly. But food was extended by three days.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （站起来）我带头少吃。领导者应该承担更多。向导，能找到其他食物来源吗？',
          en: '[Command] (Standing up) I\'ll lead by eating less. Leaders should bear more burden. Guide, can you find other food sources?',
        },
        description: {
          zh: '完美决策！你的牺牲精神感动了团队。向导在附近找到了一些可食用的苔藓。你承担最大损失（-15HP），但团队损失最小化（-5HP）。',
          en: 'Perfect decision! Your spirit of sacrifice moved the team. The guide found some edible moss nearby. You bore the greatest loss (-15 HP), but team loss was minimized (-5 HP).',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] 让我出去看看。这个季节有些树皮和苔藓是可以吃的。',
          en: '[Wilderness Wisdom] Let me go outside and look. Some bark and moss are edible this season.',
        },
        description: {
          zh: '完美决策！你在风雪中找到了补充食物（自己HP-12）。团队损失最小化（-5HP），食物储备延长。',
          en: 'Perfect decision! You found supplementary food in the blizzard (your HP -12). Team loss minimized (-5 HP), food reserves extended.',
        },
      },
    },
  },

  act2_groupthink: {
    name: {
      zh: '集体的决定',
      en: 'The Collective Decision',
    },
    conflict: {
      zh: '当所有人都赞同一个危险的决定时，你敢反对吗？',
      en: 'When everyone agrees to a dangerous decision, do you dare to object?',
    },
    scene: {
      zh: '团队情绪紧张。销售总监召集会议："我们必须采取行动！"助理："我同意！不能再等了！"飞行员："对！"有人附和："...我觉得也是。"所有人都在点头。他们的计划是：在暴风雪中向东徒步3公里，去寻找"可能存在"的气象站。向导犹豫："东边...我不确定..."但销售总监打断："我们已经达成共识了！"所有人都看着你，等待你的附议。',
      en: 'The team is tense. The Sales Director calls a meeting: "We must take action!" Assistant: "I agree! We can\'t wait anymore!" Pilot: "Right!" Someone echoes: "...I think so too." Everyone is nodding. Their plan: trek 3 kilometers east in the blizzard to find a "possibly existing" weather station. The guide hesitates: "East... I\'m not sure..." But the Sales Director interrupts: "We\'ve already reached consensus!" Everyone looks at you, waiting for your agreement.',
    },
    choices: {
      A: {
        text: {
          zh: '（沉默点头）既然大家都同意...那就出发吧。',
          en: '(Nodding silently) Since everyone agrees... let\'s go then.',
        },
        description: {
          zh: '你屈服于群体压力。东边根本没有气象站，只有悬崖和冰裂缝。全员受伤（HP-25），差点迷路。团队士气受挫，压力+3。',
          en: 'You succumbed to group pressure. There was no weather station to the east, only cliffs and ice crevasses. Everyone injured (HP -25), nearly got lost. Team morale dampened, stress +3.',
        },
        longTermEffects: {
          zh: '群体思维差点导致团灭，幸存者心理创伤严重',
          en: 'Groupthink nearly caused total annihilation, survivors severely traumatized',
        },
      },
      B: {
        text: {
          zh: '等等！我们没有任何证据证明东边有气象站！',
          en: 'Wait! We have no evidence that there\'s a weather station to the east!',
        },
        description: {
          zh: '你打破了群体共识，但代价是被孤立。销售总监和助理都对你不满，认为你在"破坏团结"。只有向导理解你。',
          en: 'You broke the group consensus, but at the cost of being isolated. The Sales Director and assistant are both unhappy with you, thinking you\'re "breaking unity". Only the guide understands you.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （举手）慢着。作为领导者，我必须确保这不是集体盲从。向导，说出你的专业意见。',
          en: '[Command] (Raising hand) Hold on. As a leader, I must ensure this isn\'t blind conformity. Guide, give us your professional opinion.',
        },
        description: {
          zh: '完美决策！你展现了真正的领导力——鼓励异议而非压制。向导说出真相后，计划被废弃。团队学会了批判性思考，压力-2。',
          en: 'Perfect decision! You displayed true leadership - encouraging dissent rather than suppressing it. After the guide spoke the truth, the plan was abandoned. The team learned critical thinking, stress -2.',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] （坚定地站起来）不行！东边是悬崖区！你们在地图上看到的"建筑标记"是50年前的废弃矿井！',
          en: '[Wilderness Wisdom] (Standing up firmly) No! East is a cliff area! The "building marker" you saw on the map is a 50-year-old abandoned mine!',
        },
        description: {
          zh: '完美决策！你用专业知识和勇气打破了群体思维。虽然遭到质疑，但你的坚持拯救了所有人。',
          en: 'Perfect decision! You broke groupthink with professional knowledge and courage. Though questioned, your persistence saved everyone.',
        },
      },
      PROGRAMMER_SPECIAL: {
        text: {
          zh: '（小声）...我其实不同意，但大家都说要去...算了，我附议吧...',
          en: '(Quietly) ...I actually disagree, but everyone says we should go... fine, I\'ll agree...',
        },
        description: {
          zh: '你没有勇气反对群体。结果是灾难性的——你们差点全灭在悬崖边。全员HP-45，压力+5。这次教训代价惨重。',
          en: 'You lacked the courage to oppose the group. The result was catastrophic - you nearly all died at the cliff edge. Everyone HP -45, stress +5. A costly lesson.',
        },
      },
    },
  },

  act2_emotional_reasoning: {
    name: {
      zh: '恐惧的声音',
      en: 'The Voice of Fear',
    },
    conflict: {
      zh: '强烈的恐惧感是否等同于真实的危险？',
      en: 'Does intense fear equal real danger?',
    },
    scene: {
      zh: '深夜，助理突然惊醒，浑身颤抖："我有一种非常强烈的不祥预感...飞机残骸要塌了！我们必须马上搬到外面的雪地里！"你犹豫了："可是外面是-30°C..."助理尖叫："你们不懂！我的直觉从来没有这么强烈过！我感觉到了死亡！我们会被压死的！"',
      en: 'Late at night, the assistant suddenly wakes up, trembling all over: "I have a very strong ominous feeling... the plane wreckage is going to collapse! We must move outside to the snow immediately!" You hesitate: "But it\'s -30°C outside..." The assistant screams: "You don\'t understand! My intuition has never been this strong! I sense death! We\'ll be crushed!"',
    },
    choices: {
      A: {
        text: {
          zh: '她的直觉一直很准。在这种环境下，宁可信其有，不可信其无。',
          en: 'Her intuition has always been accurate. In this situation, better safe than sorry.',
        },
        description: {
          zh: '你被情绪而非事实驱动。在-30°C的雪地里度过一夜，全员严重冻伤（HP-35）。残骸完好无损。助理进入"恐慌"状态，压力+3。',
          en: 'You were driven by emotion rather than facts. Spending a night in -30°C snow, everyone severely frostbitten (HP -35). The wreckage was intact. Assistant enters "panicked" state, stress +3.',
        },
        longTermEffects: {
          zh: '团队开始质疑助理的判断力',
          en: 'The team begins to question the assistant\'s judgment',
        },
      },
      B: {
        text: {
          zh: '先检查结构再决定。恐惧不能代替事实。',
          en: 'Check the structure before deciding. Fear cannot replace facts.',
        },
        description: {
          zh: '检查后确认结构稳固。但助理觉得你不信任她的直觉，变得"激动"。',
          en: 'After checking, confirmed the structure is solid. But the assistant feels you don\'t trust her intuition, becomes "agitated".',
        },
      },
      ASSISTANT_SKILL: {
        text: {
          zh: '[急救]（深呼吸，自我检查）...等等...这是恐慌发作的症状...让我冷静下来...',
          en: '[First Aid] (Deep breath, self-examination) ...Wait... these are symptoms of a panic attack... let me calm down...',
        },
        description: {
          zh: '完美决策！你用医学知识识别了自己的情绪化推理。这是自我觉察的高光时刻。团队压力-2。',
          en: 'Perfect decision! You identified your own emotional reasoning with medical knowledge. This is a shining moment of self-awareness. Team stress -2.',
        },
      },
      PROGRAMMER_SKILL: {
        text: {
          zh: '[修复]（拿出工具）我用震动传感器测试结构。数据显示：稳定性98%。不是直觉的问题，是恐惧。',
          en: '[Repair] (Taking out tools) I\'ll test the structure with a vibration sensor. Data shows: 98% stability. It\'s not an intuition problem, it\'s fear.',
        },
        description: {
          zh: '完美决策！你用客观数据替代了主观恐惧。助理看到数据后迅速恢复"冷静"。科学方法的胜利。',
          en: 'Perfect decision! You replaced subjective fear with objective data. The assistant quickly returned to "calm" after seeing the data. A victory for scientific method.',
        },
      },
      SALES_SKILL: {
        text: {
          zh: '[谈判]（握住助理的手）我理解你的恐惧。但恐惧不等于事实。我们一起检查，好吗？',
          en: '[Negotiation] (Holding the assistant\'s hand) I understand your fear. But fear doesn\'t equal fact. Let\'s check together, okay?',
        },
        description: {
          zh: '完美决策！你用同理心和理性相结合的方式处理了情绪危机。助理恢复"冷静"并成为你的盟友。',
          en: 'Perfect decision! You handled the emotional crisis by combining empathy with rationality. The assistant returned to "calm" and became your ally.',
        },
      },
    },
  },

  act2_omission_bias: {
    name: {
      zh: '不作为的代价',
      en: 'The Cost of Inaction',
    },
    conflict: {
      zh: '冒险行动还是危险地等待？',
      en: 'Risky action or dangerous waiting?',
    },
    scene: {
      zh: '飞行员的伤口严重感染，已经开始发高烧说胡话。程序员说："还记得昨天我们远处看到的那个烟雾吗？可能是另一个幸存者营地，距离大约2公里。"向导："暴风雪中徒步2公里...很危险，但如果那里有抗生素..."你陷入两难：如果不去，飞行员可能撑不过今晚；但如果去了，可能全死在路上...',
      en: 'The pilot\'s wound is severely infected, he\'s already started having high fever and talking deliriously. The programmer says: "Remember that smoke we saw in the distance yesterday? It might be another survivor camp, about 2 kilometers away." Guide: "Trekking 2 kilometers in a blizzard... very dangerous, but if there are antibiotics there..." You\'re torn: if you don\'t go, the pilot might not survive tonight; but if you go, you might all die on the way...',
    },
    choices: {
      A: {
        text: {
          zh: '暴风雪中徒步太危险了。如果我们全死在路上，飞行员也活不了。',
          en: 'Trekking in the blizzard is too dangerous. If we all die on the way, the pilot won\'t survive either.',
        },
        description: {
          zh: '你选择了"安全"的不作为。当晚，飞行员因感染死亡。团队陷入深深的自责和愤怒——你们本可以救他。压力+3（+2因NPC死亡），士气崩溃。',
          en: 'You chose "safe" inaction. That night, the pilot died from infection. The team fell into deep guilt and anger - you could have saved him. Stress +3 (+2 from NPC death), morale collapsed.',
        },
        longTermEffects: {
          zh: '飞行员的死亡将永远是团队的心理阴影',
          en: 'The pilot\'s death will forever be the team\'s psychological shadow',
        },
      },
      B: {
        text: {
          zh: '我们必须行动。向导，带路。为了飞行员，值得冒险。',
          en: 'We must act. Guide, lead the way. For the pilot, it\'s worth the risk.',
        },
        description: {
          zh: '完美决策！艰难的徒步后，你们找到了一个废弃的医疗站，获得了抗生素。全员受冻（-15HP），但飞行员得救了（+25HP，恢复"冷静"），他对你感激涕零。行动胜过空等。',
          en: 'Perfect decision! After a difficult trek, you found an abandoned medical station and got antibiotics. Everyone suffered cold (-15 HP), but the pilot was saved (+25 HP, returned to "calm"), he was deeply grateful. Action beats waiting.',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] 我一个人去。我速度快，风险小。你们照顾飞行员。',
          en: '[Wilderness Wisdom] I\'ll go alone. I\'m fast, less risk. You take care of the pilot.',
        },
        description: {
          zh: '完美决策！你独自承担风险，成功带回了抗生素（自己HP-20）。飞行员得救（+30HP），全队对你的勇气肃然起敬。',
          en: 'Perfect decision! You took the risk alone and successfully brought back antibiotics (your HP -20). The pilot was saved (+30 HP), the whole team was in awe of your courage.',
        },
      },
      PILOT_CHOICE: {
        text: {
          zh: '（虚弱地）...不要...为了我...冒险...让我...安静地...',
          en: '(Weakly) ...Don\'t... risk it... for me... let me... go quietly...',
        },
        description: {
          zh: '你尊重了飞行员的意愿，选择了不作为。但这只是你逃避责任的借口。飞行员HP降至危险水平（-50），可能无法存活到救援。',
          en: 'You respected the pilot\'s wishes and chose inaction. But this is just your excuse to avoid responsibility. Pilot HP dropped to dangerous levels (-50), may not survive until rescue.',
        },
      },
      ASSISTANT_SKILL: {
        text: {
          zh: '[急救] （检查飞行员）他还有6-8小时。我和向导去，速度够快。',
          en: '[First Aid] (Examining the pilot) He has 6-8 hours left. The guide and I will go, we\'re fast enough.',
        },
        description: {
          zh: '完美决策！你用专业判断确定了时间窗口，和向导成功完成任务。飞行员得救（+35HP），你们证明了计算风险后的行动胜过盲目等待。',
          en: 'Perfect decision! You determined the time window with professional judgment and completed the mission with the guide. The pilot was saved (+35 HP), you proved that calculated risk-taking beats blind waiting.',
        },
      },
    },
  },
};

// 第三幕事件翻译
export const act3EventTranslations: Record<string, EventTranslation> = {
  act3_last_spark: {
    name: {
      zh: '最后的火花',
      en: 'The Last Spark',
    },
    conflict: {
      zh: '是否孤注一掷？',
      en: 'Should you go all in?',
    },
    scene: {
      zh: '信标还是没反应。程序员说："我上次尝试时，它亮了0.5秒！我知道这次一定行，我只需要...更多电力！把取暖器的电池给我！"',
      en: 'The beacon still isn\'t responding. The programmer says: "Last time I tried, it lit up for 0.5 seconds! I know it will work this time, I just need... more power! Give me the heater\'s battery!"',
    },
    choices: {
      A: {
        text: {
          zh: '它亮过！说明方向是对的。在这个阶段，我们必须孤注一掷。',
          en: 'It lit up! That means we\'re on the right track. At this stage, we must go all in.',
        },
        description: {
          zh: '信标短路，彻底报废。取暖器也停了。全员严重冻伤HP-35。',
          en: 'The beacon short-circuited and is completely destroyed. The heater stopped too. Everyone severely frostbitten, HP -35.',
        },
      },
      B: {
        text: {
          zh: '等等，0.5秒的亮光可能只是短路。我们不能冒这个险。',
          en: 'Wait, the 0.5-second light might just be a short circuit. We can\'t take this risk.',
        },
        description: {
          zh: '你否定了"希望"，程序员很失望。信标进度保持不变，但你保住了取暖器。',
          en: 'You denied "hope", the programmer is disappointed. Beacon progress unchanged, but you saved the heater.',
        },
      },
      PROGRAMMER_SKILL: {
        text: {
          zh: '[修复] （你仔细检查）...不...我错了。0.5秒的亮光是短路。我需要的是更换电容。',
          en: '[Repair] (You examine carefully) ...No... I was wrong. The 0.5-second light was a short circuit. What I need is to replace the capacitor.',
        },
        description: {
          zh: '完美决策！你用专业知识否定了自己的错误锚定。信标修复进度+30%！',
          en: 'Perfect decision! You used professional knowledge to reject your own wrong anchoring. Beacon repair progress +30%!',
        },
      },
      PILOT_SKILL: {
        text: {
          zh: '[机械知识] 你疯了吗！电压根本不匹配！听我的，用驾驶舱的备用电池。',
          en: '[Mechanical Knowledge] Are you crazy! The voltage doesn\'t match at all! Listen to me, use the cockpit\'s backup battery.',
        },
        description: {
          zh: '完美决策！你阻止了灾难。信标修复进度+25%。',
          en: 'Perfect decision! You prevented disaster. Beacon repair progress +25%.',
        },
      },
      CEO_SKILL_TRAP: {
        text: {
          zh: '[指挥] 我批准这个方案。执行吧。',
          en: '[Command] I approve this plan. Execute it.',
        },
        description: {
          zh: '技能陷阱！你用权威强行批准了错误方案。信标报废。',
          en: 'Skill trap! You used authority to force through the wrong plan. Beacon destroyed.',
        },
      },
    },
  },

  act3_betrayal: {
    name: {
      zh: '背叛',
      en: 'Betrayal',
    },
    conflict: {
      zh: '是否抛弃团队？',
      en: 'Should you abandon the team?',
    },
    scene: {
      zh: '压力时钟很高。销售总监秘密把你拉到一边："听着，这群人是累赘。我藏了一点食物和一条毯子。跟我走，我们俩有机会活下去。"',
      en: 'Stress is high. The Sales Director secretly pulls you aside: "Listen, these people are dead weight. I\'ve hidden some food and a blanket. Come with me, the two of us have a chance to survive."',
    },
    choices: {
      A: {
        text: {
          zh: '...你说得对。资源有限，只有最聪明的人才能活下来。',
          en: '...You\'re right. Resources are limited, only the smartest can survive.',
        },
        description: {
          zh: '游戏立即结束：【结局D：你的终点】。两天后，你们冻死在离残骸不到一公里的地方。',
          en: 'Game ends immediately: [Ending D: Your End]. Two days later, you froze to death less than a kilometer from the wreckage.',
        },
      },
      B: {
        text: {
          zh: '不。无论发生什么，我们要一起面对。',
          en: 'No. Whatever happens, we face it together.',
        },
        description: {
          zh: '你拒绝了他。销售总监进入"敌对"状态，可能在关键时刻背叛你。',
          en: 'You refused him. The Sales Director becomes "hostile" and may betray you at a critical moment.',
        },
      },
      SALES_CHOICE: {
        text: {
          zh: '（放弃念头，留下）不...我不能这么做。',
          en: '(Abandoning the thought, staying) No... I can\'t do this.',
        },
        description: {
          zh: '你战胜了自私。这是销售总监的救赎时刻。',
          en: 'You overcame selfishness. This is the Sales Director\'s moment of redemption.',
        },
      },
    },
  },

  act3_last_watchman: {
    name: {
      zh: '最后的守夜人',
      en: 'The Last Watchman',
    },
    conflict: {
      zh: '谁去守夜？',
      en: 'Who keeps watch?',
    },
    scene: {
      zh: '暴风雪最猛烈的一夜。必须有一个人在残骸入口处守夜，防止积雪堵住房门。但守夜的人会暴露在风雪口，HP-50。销售总监："让助理去吧。我刚才看到她睡得很好，她肯定最精神。"',
      en: 'The most intense night of the blizzard. Someone must keep watch at the wreckage entrance to prevent snow from blocking the door. But the watchman will be exposed to the wind, HP -50. Sales Director: "Let the assistant go. I just saw her sleeping well, she must be the most energetic."',
    },
    choices: {
      A: {
        text: {
          zh: '销售总监说得有道理。助理状态最好，应该由她来。',
          en: 'The Sales Director has a point. The assistant is in the best condition, she should do it.',
        },
        description: {
          zh: '助理因为发烧和寒冷，死在了守夜岗位上。你基于片面印象做出了致命决定。',
          en: 'The assistant died at the watch post from fever and cold. You made a fatal decision based on a superficial impression.',
        },
      },
      B: {
        text: {
          zh: '抽签决定。不能基于主观印象判断谁"最精神"。',
          en: 'Draw lots. We can\'t judge who\'s "most energetic" based on subjective impressions.',
        },
        description: {
          zh: '抽签决定。你被抽中，守夜HP-50。公平但痛苦。',
          en: 'Drawing lots decided. You were picked, watch duty HP -50. Fair but painful.',
        },
      },
      PILOT_SKILL: {
        text: {
          zh: '[机械知识] 别吵。我可以做一个自动除雪装置。人不用待在风口。',
          en: '[Mechanical Knowledge] Stop arguing. I can build an automatic snow removal device. No one needs to stay in the wind.',
        },
        description: {
          zh: '完美决策！你用工程学解决了人命问题。无人需要守夜。',
          en: 'Perfect decision! You solved the life-threatening problem with engineering. No one needs to keep watch.',
        },
      },
      PROGRAMMER_SKILL: {
        text: {
          zh: '[修复] 如果我把PDA的警报器连接到门的压力传感器上...我们轮流除雪。',
          en: '[Repair] If I connect the PDA alarm to the door\'s pressure sensor... we can take turns clearing snow.',
        },
        description: {
          zh: '完美决策！你用技术解决了问题。全员HP-10（轮流除雪）。',
          en: 'Perfect decision! You solved the problem with technology. Everyone HP -10 (taking turns clearing snow).',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] 守夜是必须的。我来吧。我比你们更懂怎么在暴雪中节省体力。',
          en: '[Wilderness Wisdom] Keeping watch is necessary. I\'ll do it. I know better than any of you how to conserve energy in a blizzard.',
        },
        description: {
          zh: '你主动承担了守夜。你的HP-30（专业技能减少损失）。',
          en: 'You volunteered for watch duty. Your HP -30 (professional skills reduced the loss).',
        },
      },
    },
  },

  act3_share_or_monopolize: {
    name: {
      zh: '分享还是独占',
      en: 'Share or Monopolize',
    },
    conflict: {
      zh: '贡献大就该多得吗？',
      en: 'Should those who contribute more get more?',
    },
    scene: {
      zh: '只剩下最后一块食物。销售总监把它拿在手里："这几天，我找的柴火最多，我贡献最大。飞行员和助理一直在生病。根据\'公平\'，这块食物应该归我。"',
      en: 'Only the last piece of food remains. The Sales Director holds it: "These past days, I found the most firewood, I contributed the most. The pilot and assistant have been sick. According to \'fairness\', this food should be mine."',
    },
    choices: {
      A: {
        text: {
          zh: '按贡献分配资源是合理的。他确实付出最多。',
          en: 'Allocating resources by contribution is reasonable. He did contribute the most.',
        },
        description: {
          zh: '团队因"公平"的自私而彻底分裂。其他人因饥饿HP-15，进入"敌对"。',
          en: 'The team completely split due to "fair" selfishness. Others HP -15 from hunger, become "hostile".',
        },
      },
      B: {
        text: {
          zh: '我们是一个团队。最后一块食物，所有人分。',
          en: 'We are a team. The last piece of food, we share with everyone.',
        },
        description: {
          zh: '食物被平分，没人能吃饱。销售总监不满，但团队保持了团结。',
          en: 'Food was shared equally, no one was satisfied. The Sales Director was unhappy, but the team stayed united.',
        },
      },
      ASSISTANT_SKILL: {
        text: {
          zh: '[急救] 把它给病得最重的人。他们需要的比我们多。',
          en: '[First Aid] Give it to whoever is most seriously ill. They need it more than us.',
        },
        description: {
          zh: '完美决策！你提出了基于"需求"而非"贡献"的最高人道主义方案。',
          en: 'Perfect decision! You proposed the highest humanitarian solution based on "need" rather than "contribution".',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （从他手里拿过食物）现在的\'公平\'是我们都活下去。分成所有人份。',
          en: '[Command] (Taking the food from his hands) The \'fairness\' now is that we all survive. Divide it among everyone.',
        },
        description: {
          zh: '你用权威压制了自私。食物被平分。',
          en: 'You suppressed selfishness with authority. Food was shared equally.',
        },
      },
    },
  },

  act3_false_signal: {
    name: {
      zh: '虚假的信号',
      en: 'The False Signal',
    },
    conflict: {
      zh: '在绝望中寻找希望？',
      en: 'Seeking hope in despair?',
    },
    scene: {
      zh: '深夜。销售总监突然喊："听！是直升机的声音！"所有人都竖起耳朵。外面只有风声。销售总监坚持："不，我确定我听到了引擎声！"',
      en: 'Late at night. The Sales Director suddenly shouts: "Listen! It\'s the sound of a helicopter!" Everyone listens intently. Outside, there\'s only wind. The Sales Director insists: "No, I\'m sure I heard engine noise!"',
    },
    choices: {
      A: {
        text: {
          zh: '这可能是我们最后的机会！就算只有一点希望也值得冒险！',
          en: 'This could be our last chance! Even a slim hope is worth the risk!',
        },
        description: {
          zh: '在暴风雪中冲出去，什么也没有。信号弹浪费，全员冻伤HP-25。',
          en: 'Rushing out into the blizzard, there was nothing. Flares wasted, everyone frostbitten HP -25.',
        },
      },
      B: {
        text: {
          zh: '冷静。在这种风声中，人很容易产生幻听。',
          en: 'Stay calm. In this wind, it\'s easy to have auditory hallucinations.',
        },
        description: {
          zh: '你打碎了销售总监的"希望"。他崩溃了，进入"恐慌"状态。',
          en: 'You shattered the Sales Director\'s "hope". He broke down, entering "panicked" state.',
        },
      },
      PILOT_SPECIAL: {
        text: {
          zh: '（你听了一会）那是发动机吗？不...频率不对，是风。',
          en: '(You listen for a moment) Is that an engine? No... the frequency is wrong, it\'s the wind.',
        },
        description: {
          zh: '完美决策！你的专业知识阻止了灾难。',
          en: 'Perfect decision! Your professional knowledge prevented disaster.',
        },
      },
      PROGRAMMER_SPECIAL: {
        text: {
          zh: '等等，我计算一下...在这种天气下，直升机无法飞行。这是幻听。',
          en: 'Wait, let me calculate... In this weather, helicopters can\'t fly. This is an auditory hallucination.',
        },
        description: {
          zh: '完美决策！你的逻辑分析说服了大家。',
          en: 'Perfect decision! Your logical analysis convinced everyone.',
        },
      },
    },
  },

  act3_team_collapse: {
    name: {
      zh: '团队崩溃边缘',
      en: 'Edge of Team Collapse',
    },
    conflict: {
      zh: '如何面对团队内部的崩溃？',
      en: 'How to face internal team collapse?',
    },
    scene: {
      zh: '压力时钟已经很高。销售总监突然对飞行员大吼："都是你！如果你飞得好一点，我们就不会坠机！"飞行员反击："你才是问题！你一直在瞎指挥！"团队在崩溃边缘。',
      en: 'Stress is very high. The Sales Director suddenly yells at the pilot: "It\'s all your fault! If you had flown better, we wouldn\'t have crashed!" The pilot retorts: "You\'re the problem! You\'ve been giving stupid orders!" The team is on the edge of collapse.',
    },
    choices: {
      A: {
        text: {
          zh: '找出责任人很重要。飞行员是机长，他应该为坠机负责。',
          en: 'Finding who\'s responsible is important. The pilot is the captain, he should be responsible for the crash.',
        },
        description: {
          zh: '团队分裂。飞行员遭受言语暴力HP-20，进入"敌对"，可能在关键时刻拒绝合作。',
          en: 'Team split. The pilot suffered verbal abuse HP -20, becomes "hostile", may refuse cooperation at critical moments.',
        },
      },
      B: {
        text: {
          zh: '停！现在追究责任没有意义。我们需要团结。',
          en: 'Stop! Assigning blame now is meaningless. We need unity.',
        },
        description: {
          zh: '你压制了冲突，但销售总监觉得你在"和稀泥"。矛盾暂时平息，但怨气未消。',
          en: 'You suppressed the conflict, but the Sales Director thinks you\'re "smoothing things over". Tensions temporarily eased, but resentment remains.',
        },
      },
      ASSISTANT_SKILL: {
        text: {
          zh: '[急救] （柔声说）我们都累了...让我检查一下你们的伤口...休息一下吧。',
          en: '[First Aid] (Speaking softly) We\'re all exhausted... Let me check your wounds... Take a rest.',
        },
        description: {
          zh: '完美决策！你用同理心化解了冲突，两人恢复冷静。销售总监和飞行员各恢复15HP。',
          en: 'Perfect decision! You defused the conflict with empathy, both calmed down. Sales Director and pilot each recovered 15 HP.',
        },
      },
      SALES_SKILL: {
        text: {
          zh: '[谈判] （对两人分别说）你们都做得很好...现在需要互相支持...我们快到终点了。',
          en: '[Negotiation] (Speaking to both separately) You\'ve both done well... Now we need to support each other... We\'re almost at the finish line.',
        },
        description: {
          zh: '完美决策！你的情商挽救了团队。',
          en: 'Perfect decision! Your emotional intelligence saved the team.',
        },
      },
    },
  },

  act3_blizzard_intensifies: {
    name: {
      zh: '暴风雪加剧',
      en: 'Blizzard Intensifies',
    },
    conflict: {
      zh: '是否低估了环境的危险？',
      en: 'Are you underestimating environmental danger?',
    },
    scene: {
      zh: '暴风雪突然加剧，残骸的一侧墙壁开始摇晃。温度降到-40°C。销售总监说："应该没事，它已经撑了这么久了..."',
      en: 'The blizzard suddenly intensifies, one side of the wreckage wall starts shaking. Temperature drops to -40°C. The Sales Director says: "It should be fine, it\'s held up this long..."',
    },
    choices: {
      A: {
        text: {
          zh: '它已经撑了这么久了，应该没问题。大家都累了，省点力气。',
          en: 'It\'s held up this long, should be fine. Everyone\'s tired, save your energy.',
        },
        description: {
          zh: '墙壁部分坍塌！全员受伤，HP-25。过去的稳定不代表未来的安全。',
          en: 'The wall partially collapsed! Everyone injured, HP -25. Past stability doesn\'t guarantee future safety.',
        },
      },
      B: {
        text: {
          zh: '不能冒险。立刻加固，所有人行动！',
          en: 'We can\'t take the risk. Reinforce immediately, everyone move!',
        },
        description: {
          zh: '在暴风雪中加固墙壁，全员精疲力竭（HP-15）。但避免了灾难。',
          en: 'Reinforcing the wall in the blizzard, everyone exhausted (HP -15). But disaster was avoided.',
        },
      },
    },
  },

  act1_optimism_trap: {
    name: {
      zh: '乐观的陷阱',
      en: 'The Optimism Trap',
    },
    conflict: {
      zh: '是否应该为最坏情况做准备？',
      en: 'Should you prepare for the worst case?',
    },
    scene: {
      zh: '销售总监充满自信地说："大家听好，救援队肯定今天就会到。我们把所有的信号弹都发射出去，让他们更容易找到我们！"向导皱眉："可是...如果今天不来呢？我们只有3发信号弹..."',
      en: 'The Sales Director says confidently: "Listen up everyone, the rescue team will definitely arrive today. Let\'s fire all our signal flares to make it easier for them to find us!" The guide frowns: "But... what if they don\'t come today? We only have 3 flares..."',
    },
    choices: {
      A: {
        text: {
          zh: '保持积极！乐观能提振士气。集中火力，增加被发现的概率！',
          en: 'Stay positive! Optimism boosts morale. Fire them all to increase our chances of being found!',
        },
        description: {
          zh: '乐观没有换来救援。信号弹耗尽，你们失去了未来的求救手段。信标进度-10%。',
          en: 'Optimism didn\'t bring rescue. The flares are exhausted, you\'ve lost future means of asking for help. Beacon progress -10%.',
        },
        longTermEffects: {
          zh: '后续无法发射信号弹',
          en: 'Can no longer fire signal flares later',
        },
      },
      B: {
        text: {
          zh: '做最坏的打算。每天只用一发，谁知道要等多久。',
          en: 'Prepare for the worst. Use only one per day, who knows how long we\'ll wait.',
        },
        description: {
          zh: '你的悲观让一些人感到绝望，助理情绪低落（HP-5）。但你保住了资源。信标进度+5%。',
          en: 'Your pessimism made some feel desperate, the assistant is downcast (HP -5). But you preserved resources. Beacon progress +5%.',
        },
      },
      GUIDE_SKILL: {
        text: {
          zh: '[荒野智慧] 等等，我知道什么时候发射最有效。让我根据天气和能见度来判断。',
          en: '[Wilderness Wisdom] Wait, I know when firing would be most effective. Let me judge based on weather and visibility.',
        },
        description: {
          zh: '完美决策！你用专业知识选择了最佳时机。信号弹在能见度最好时发射，被路过的飞机发现！信标进度+15%。',
          en: 'Perfect decision! You used expertise to choose the optimal timing. Flares fired at best visibility, spotted by passing aircraft! Beacon progress +15%.',
        },
      },
      CEO_SKILL: {
        text: {
          zh: '[指挥] （停顿后）...等等，我需要考虑最坏情况。向导，你来制定信号弹使用计划。',
          en: '[Command] (After a pause) ...Wait, I need to consider the worst case. Guide, you制定信号弹使用plan。',
        },
        description: {
          zh: '完美决策！你展示了真正的领导力——克服自己的乐观偏误。向导制定了合理计划，信标进度+10%。',
          en: 'Perfect decision! You showed true leadership - overcoming your own optimism bias. The guide made a reasonable plan. Beacon progress +10%.',
        },
      },
    },
  },

  act1_backfire_effect: {
    name: {
      zh: '逆火效应',
      en: 'The Backfire Effect',
    },
    conflict: {
      zh: '如何处理团队成员的绝望情绪？',
      en: 'How to handle team member\'s despair?',
    },
    scene: {
      zh: '程序员崩溃了："没用的！我们死定了！所有人都会死！"其他人试图安慰他，但你越是反驳，他越坚信自己的绝望观点："你们不懂！数据都显示..."',
      en: 'The programmer has a breakdown: "It\'s useless! We\'re all going to die! Everyone will die!" Others try to comfort him, but the more you refute him, the more firmly he clings to his despair: "You don\'t understand! All the data shows..."',
    },
    choices: {
      A: {
        text: {
          zh: '提供更多证据和数据证明救援的可能性。',
          en: 'Provide more evidence and data proving the possibility of rescue.',
        },
        description: {
          zh: '程序员更加坚信自己的绝望。反驳越多，他的防御心理越强。',
          en: 'The programmer clings to despair even more. The more you refute, the stronger his defensive psychology becomes.',
        },
        longTermEffects: {
          zh: '程序员进入长期悲观状态',
          en: 'Programmer enters long-term pessimism',
        },
      },
      B: {
        text: {
          zh: '暂时不讨论这个问题，让大家都冷静一下。',
          en: 'Temporarily avoid this topic, let everyone calm down.',
        },
        description: {
          zh: '程序员暂时平静，但问题没有真正解决。压力+1。',
          en: 'Programmer temporarily calms, but problem isn\'t truly solved. Stress +1.',
        },
      },
      ASSISTANT_SKILL: {
        text: {
          zh: '[急救] （坐在程序员旁边）我知道你很害怕...我们都很害怕。但这不会让事情变得更好。',
          en: '[First Aid] (Sitting beside programmer) I know you\'re scared... We\'re all scared. But this won\'t make things better.',
        },
        description: {
          zh: '完美决策！你用同理心化解了防御情绪。程序员平静下来，压力-2。',
          en: 'Perfect decision! You defused defensive emotions with empathy. Programmer calms down, stress -2.',
        },
      },
      PILOT_SKILL: {
        text: {
          zh: '[机械知识] （展示飞机仪表盘）你看，这些数据显示系统在正常工作。至少通讯设备没坏。',
          en: '[Mechanical Knowledge] (Showing aircraft dashboard) Look, this data shows systems are working normally. At least communication equipment isn\'t damaged.',
        },
        description: {
          zh: '程序员看到技术细节，稍微平静。但仍需持续关注。',
          en: 'Programmer sees technical details, slightly calms. Still needs continued attention.',
        },
      },
    },
  },
};

// 获取本地化的事件内容
export function getLocalizedEvent(eventId: string, lang: Language) {
  const allTranslations = {
    ...act1EventTranslations,
    ...act2EventTranslations,
    ...act3EventTranslations,
  };

  const translation = allTranslations[eventId];
  if (!translation) return null;

  return {
    name: t(translation.name, lang),
    conflict: t(translation.conflict, lang),
    scene: t(translation.scene, lang),
    getChoiceText: (choiceId: string) => {
      const choice = translation.choices[choiceId];
      return choice ? t(choice.text, lang) : null;
    },
    getChoiceDescription: (choiceId: string) => {
      const choice = translation.choices[choiceId];
      return choice ? t(choice.description, lang) : null;
    },
    getChoiceLongTermEffects: (choiceId: string) => {
      const choice = translation.choices[choiceId];
      return choice?.longTermEffects ? t(choice.longTermEffects, lang) : null;
    },
  };
}
