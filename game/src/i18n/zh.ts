// 中文翻译
export const zhTranslations: Record<string, string> = {
  // 通用
  'app.title': '冰封希望',
  'app.version': 'v1.0 | 一款探索认知偏误的生存决策游戏',

  // 开始界面
  'start.description': '一架私人飞机坠毁在雪山深处。\n六名幸存者，零下三十度的暴风雪，十天的生死考验。\n作为团队的领导者，你能识破认知陷阱，带领所有人活着走出去吗？',
  'start.play': '开始游戏',
  'start.tip': '提示：每个选择都有代价，没有完美答案',
  'start.howToPlay': '游戏玩法',
  'start.guide1': '📖 阅读场景描述，理解当前困境',
  'start.guide2': '🎯 从多个选项中做出选择（带[技能]标记的选项需要消耗HP）',
  'start.guide3': '⚠️ 小心认知陷阱！看似合理的选择可能是偏误',
  'start.guide4': '❤️ 管理好HP和压力，它们决定团队存亡',
  'start.winCondition': '胜利条件',
  'start.winDesc': '修复信标（进度≥80%）触发救援，或坚持10天等待风暴结束',
  'start.loseCondition': '失败条件',
  'start.loseDesc': '你的HP归零，或压力时钟达到15格导致团队崩溃',

  // 角色选择（已弃用，保留兼容）
  'select.title': '准备开始',
  'select.description': '你将扮演公司CEO，带领团队在绝境中求生。',
  'select.age': '年龄',
  'select.difficulty': '难度',
  'select.skill': '技能',
  'select.cost': '代价',
  'select.hp': 'HP',
  'select.stress': '压力',
  'select.choose': '选择此角色',
  'select.back': '返回',
  'select.yearsOld': '岁',

  // 游戏界面
  'game.day': '第 {{day}} 天',
  'game.dayLabel': '天数',
  'game.yourHP': '你的HP',
  'game.stressClock': '压力时钟',
  'game.beaconProgress': '信标进度',
  'game.perfectStreak': '完美连击',
  'game.streakReward': '还需{{count}}次',
  'game.peakState': '巅峰状态！',
  'game.loading': '正在加载下一个事件...',
  'game.teamStatus': '团队状态',
  'game.dead': '已死亡',
  'game.skillCostHP': 'HP消耗',
  'game.skillCostStress': '压力消耗',

  // NPC状态
  'npc.calm': '冷静',
  'npc.agitated': '激动',
  'npc.panicked': '恐慌',

  // 结局界面
  'ending.viewReplay': '查看心理复盘',
  'ending.restart': '重新开始',

  // 复盘界面
  'replay.title': '你的心理复盘',
  'replay.description': '回顾你在这次求生旅程中的认知陷阱和完美决策',
  'replay.result': '游戏结果',
  'replay.day': '存活天数',
  'replay.days': '天',
  'replay.finalHP': '最终HP',
  'replay.beaconProgress': '信标进度',
  'replay.cognitiveTraps': '认知陷阱',
  'replay.noTraps': '你在整个求生过程中，没有陷入任何认知陷阱！',
  'replay.perfectRationalist': '🎉 完美理性者 🎉',
  'replay.clickToLearn': '点击陷阱可查看详细解析',
  'replay.perfectDecisions': '完美决策',
  'replay.noPerfect': '没有记录到完美决策。',
  'replay.dayChoice': '第{{day}}天 | 你的选择: {{choice}}',
  'replay.teamFinalStatus': '团队最终状态',
  'replay.stressHistory': '压力变化曲线',
  'replay.backToEnding': '返回结局',
  'replay.newGame': '重新开始',
  'replay.definition': '定义',
  'replay.whyHappens': '为什么会发生？',
  'replay.inGame': '在游戏中的表现',
  'replay.realCases': '现实案例',
  'replay.howToDetect': '如何识破？',
  'replay.close': '关闭',

  // 角色名称
  'role.ceo': 'CEO',
  'role.programmer': '程序员',
  'role.assistant': '助理',
  'role.guide': '向导',
  'role.pilot': '飞行员',
  'role.sales': '销售总监',

  // 角色职业
  'role.ceo.occupation': '科技公司CEO',
  'role.programmer.occupation': '高级程序员',
  'role.assistant.occupation': '行政助理',
  'role.guide.occupation': '登山向导',
  'role.pilot.occupation': '飞行员',
  'role.sales.occupation': '销售总监',

  // 角色描述
  'role.ceo.description': '习惯发号施令，在危机中试图掌控一切。他的决策可能带来团结，也可能引发分裂。',
  'role.programmer.description': '逻辑思维强，善于分析问题。但在极端压力下，他可能过度依赖数据而忽视人性。',
  'role.assistant.description': '细心、善于观察，是团队的润滑剂。她能发现其他人忽略的细节。',
  'role.guide.description': '经验丰富的户外专家，是团队生存的关键。但他的过度自信有时会带来危险。',
  'role.pilot.description': '冷静、专业，受伤后行动受限。他的技术知识可能是获救的关键。',
  'role.sales.description': '善于说服和操纵，在资源匮乏时可能成为威胁。他的魅力掩盖着自私的本性。',

  // 技能名称
  'skill.command': '指挥',
  'skill.repair': '修复',
  'skill.firstAid': '急救',
  'skill.wildernessWisdom': '荒野智慧',
  'skill.mechanicalKnowledge': '机械知识',
  'skill.negotiation': '谈判',

  // 技能描述
  'skill.command.description': '强制执行一个决策，无视其他人的反对',
  'skill.repair.description': '修复损坏的设备，提高救援概率',
  'skill.firstAid.description': '治疗受伤的队员，恢复HP',
  'skill.wildernessWisdom.description': '利用环境知识找到资源或避开危险',
  'skill.mechanicalKnowledge.description': '分析飞机残骸，找到有用的零件',
  'skill.negotiation.description': '说服或操纵其他人接受你的方案',

  // 音频控制
  'audio.title': '音频设置',
  'audio.master': '主音量',
  'audio.sfx': '音效',
  'audio.music': '背景音',
  'audio.tip': '右键点击音量按钮打开此面板',
  'audio.mute': '点击静音 | 右键打开设置',
  'audio.unmute': '点击开启声音 | 右键打开设置',

  // UI 状态显示
  'ui.failed': '失败',
  'ui.streakStar': '⭐{{count}}',
  'ui.hpHeart': '❤️',
  'ui.energyBolt': '⚡',
  'ui.dangerWarning': '⚠️',
  'ui.dead': '💀',
  'ui.maxStress': '15',

  // 连击奖励提示
  'streak.reward3': '3连击！全员HP+10',
  'streak.reward5': '5连击！压力-2',
  'streak.reward7': '7连击！信标+10%',

  // 结局标题
  'ending.rescue.title': '成功获救',
  'ending.survival.title': '坚持到底',
  'ending.bitter_victory.title': '惨胜',
  'ending.collapse.title': '团队崩溃',
  'ending.your_end.title': '你的终点',
};
