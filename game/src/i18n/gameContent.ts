// 游戏内容多语言数据
// 用于事件、角色、偏误等核心游戏内容的翻译

import { Language } from './index';

// 多语言文本类型
export type LocalizedText = {
  zh: string;
  en: string;
};

// 创建多语言文本的辅助函数
export function t(texts: LocalizedText, lang: Language): string {
  return texts[lang] || texts.en || texts.zh;
}

// 认知偏误翻译数据
export const biasTranslations: Record<string, {
  name: LocalizedText;
  definition: LocalizedText;
  mechanism: LocalizedText;
  gameExample: LocalizedText;
  realExamples: LocalizedText[];
  howToDetect: LocalizedText[];
}> = {
  authority_bias: {
    name: {
      zh: '权威偏误',
      en: 'Authority Bias',
    },
    definition: {
      zh: '过度信任权威人物的观点，即使他们的决策可能是错误的。',
      en: 'Excessive trust in authority figures, even when their decisions may be wrong.',
    },
    mechanism: {
      zh: '在压力下，人们倾向于盲目服从看似权威的人，以减少决策负担和责任。',
      en: 'Under pressure, people tend to blindly obey those who appear authoritative to reduce decision-making burden and responsibility.',
    },
    gameExample: {
      zh: '你要求团队服从你的指令，团队未经质疑就接受了你的领导。',
      en: 'You demand obedience from the team, and they accept your leadership without question.',
    },
    realExamples: [
      {
        zh: '韩国航空8509号班机（1997）- 副驾驶发现错误但不敢挑战机长权威，导致坠机',
        en: 'Korean Air Flight 8509 (1997) - Co-pilot spotted error but dared not challenge captain\'s authority, leading to crash',
      },
      {
        zh: '米尔格拉姆服从实验（1961）- 65%的人服从权威，对"学习者"施加"致命电击"',
        en: 'Milgram Obedience Experiment (1961) - 65% of people obeyed authority and administered "lethal shocks"',
      },
      {
        zh: '安然公司丑闻 - 员工盲从高管的不当财务操作',
        en: 'Enron Scandal - Employees blindly followed executives\' improper financial practices',
      },
    ],
    howToDetect: [
      {
        zh: '问：这个人的权威来自何处？（专业知识 vs 职位）',
        en: 'Ask: Where does this person\'s authority come from? (Expertise vs. Position)',
      },
      {
        zh: '问：在当前情境下，这个权威是否仍然有效？',
        en: 'Ask: Is this authority still valid in the current situation?',
      },
      {
        zh: '问：我是因为他的建议合理，还是因为他是"权威"？',
        en: 'Ask: Am I following because the advice is sound, or because they\'re an "authority"?',
      },
    ],
  },

  mcnamara_fallacy: {
    name: {
      zh: '麦克纳马拉谬误',
      en: 'McNamara Fallacy',
    },
    definition: {
      zh: '过度依赖可量化的指标，忽视无法量化但同样重要的因素。',
      en: 'Over-reliance on quantifiable metrics while ignoring unquantifiable but equally important factors.',
    },
    mechanism: {
      zh: '人们倾向于关注容易测量的数据，因为这让决策看起来"客观"和"科学"。',
      en: 'People tend to focus on easily measurable data because it makes decisions appear "objective" and "scientific".',
    },
    gameExample: {
      zh: '你用"产出值"来量化团队贡献，忽视了无法量化的经验和智慧。',
      en: 'You quantify team contributions by "output value", ignoring unquantifiable experience and wisdom.',
    },
    realExamples: [
      {
        zh: '越战中美军用"敌军死亡人数"衡量胜利，忽视了民心和政治因素',
        en: 'In Vietnam War, US military measured victory by "enemy body count", ignoring public support and political factors',
      },
      {
        zh: '教育系统过度依赖考试分数，忽视创造力和社交能力',
        en: 'Education systems over-rely on test scores, ignoring creativity and social skills',
      },
      {
        zh: '医疗系统只关注"治愈率"，忽视患者的生活质量',
        en: 'Healthcare systems focus only on "cure rates", ignoring patients\' quality of life',
      },
    ],
    howToDetect: [
      {
        zh: '问：什么重要但无法量化？',
        en: 'Ask: What\'s important but can\'t be quantified?',
      },
      {
        zh: '问：我是否忽视了无形的价值（如士气、信任、创造力）？',
        en: 'Ask: Am I ignoring intangible values (like morale, trust, creativity)?',
      },
      {
        zh: '问：数字背后的人和故事是什么？',
        en: 'Ask: What are the people and stories behind the numbers?',
      },
    ],
  },

  groupthink: {
    name: {
      zh: '群体思维',
      en: 'Groupthink',
    },
    definition: {
      zh: '为了和谐而屈服于群体压力，放弃独立判断。',
      en: 'Surrendering to group pressure for harmony, abandoning independent judgment.',
    },
    mechanism: {
      zh: '人是社会动物，不愿意成为"异类"，即使知道群体是错的。',
      en: 'Humans are social animals who don\'t want to be "different", even when the group is wrong.',
    },
    gameExample: {
      zh: '团队压力要求你做出某个决定，你屈服于群体意见，放弃了独立判断。',
      en: 'Team pressure demands you make a certain decision, and you yield to group opinion, abandoning independent judgment.',
    },
    realExamples: [
      {
        zh: '挑战者号航天飞机事故 - 工程师发现问题但屈服于管理层压力',
        en: 'Challenger Space Shuttle disaster - Engineers spotted problems but yielded to management pressure',
      },
      {
        zh: '企业决策失误 - 会议中无人敢反对老板的错误决策',
        en: 'Corporate decision failures - No one dares oppose the boss\'s wrong decisions in meetings',
      },
      {
        zh: '阿希从众实验 - 75%的人至少一次跟随明显错误的群体答案',
        en: 'Asch Conformity Experiment - 75% of people followed obviously wrong group answers at least once',
      },
    ],
    howToDetect: [
      {
        zh: '问：如果我独自决策会怎样？',
        en: 'Ask: What would I decide if I were alone?',
      },
      {
        zh: '问：我是因为同意，还是因为害怕反对？',
        en: 'Ask: Am I agreeing because I agree, or because I fear disagreeing?',
      },
      {
        zh: '问：有没有人在扮演"恶魔代言人"角色？',
        en: 'Ask: Is anyone playing "devil\'s advocate"?',
      },
    ],
  },

  scarcity_bias: {
    name: {
      zh: '稀缺性偏误',
      en: 'Scarcity Bias',
    },
    definition: {
      zh: '当资源稀缺时，高估其价值并做出非理性决策。',
      en: 'Overvaluing resources when scarce and making irrational decisions.',
    },
    mechanism: {
      zh: '稀缺触发生存本能，导致囤积行为和短视决策。',
      en: 'Scarcity triggers survival instincts, leading to hoarding behavior and short-sighted decisions.',
    },
    gameExample: {
      zh: '食物短缺时，选择吃掉所有食物而不考虑未来。',
      en: 'When food is scarce, choosing to eat all food without considering the future.',
    },
    realExamples: [
      {
        zh: '疫情期间的卫生纸抢购潮',
        en: 'Toilet paper panic buying during the pandemic',
      },
      {
        zh: '"限时优惠"促销策略利用稀缺心理',
        en: '"Limited time offer" promotions exploit scarcity psychology',
      },
      {
        zh: '股市恐慌性抛售',
        en: 'Panic selling in stock markets',
      },
    ],
    howToDetect: [
      {
        zh: '问：如果资源充足，我还会做同样的决定吗？',
        en: 'Ask: Would I make the same decision if resources were abundant?',
      },
      {
        zh: '问：我是在响应真实需求，还是恐惧驱动？',
        en: 'Ask: Am I responding to real need, or fear-driven?',
      },
      {
        zh: '问：长期来看，这个决定合理吗？',
        en: 'Ask: Is this decision reasonable in the long term?',
      },
    ],
  },

  false_causality: {
    name: { zh: '虚假因果', en: 'False Causality' },
    definition: { zh: '将时间上相邻的两个事件错误地认为有因果关系。', en: 'Wrongly assuming causation between two temporally adjacent events.' },
    mechanism: { zh: '大脑倾向于寻找模式，即使在随机事件中也会强行建立联系。', en: 'The brain tends to find patterns, forcing connections even in random events.' },
    gameExample: { zh: '"重启信标后风雪变大"被认为是因果关系，实际上只是巧合。', en: '"The blizzard intensified after restarting the beacon" is mistaken for causation, when it\'s just coincidence.' },
    realExamples: [
      { zh: '迷信的根源："我戴了幸运袜，球队就赢了"', en: 'Root of superstition: "I wore my lucky socks, so the team won"' },
      { zh: '疫苗恐慌：儿童接种疫苗后出现自闭症（实际上无关）', en: 'Vaccine panic: Autism appearing after child vaccination (actually unrelated)' },
      { zh: '"凌晨3点打呵欠，天就亮了" - 时间相关不等于因果', en: '"Yawned at 3am, then the sun rose" - correlation is not causation' },
    ],
    howToDetect: [
      { zh: '问：有没有其他解释？', en: 'Ask: Are there other explanations?' },
      { zh: '问：这个关联是否可重复验证？', en: 'Ask: Can this correlation be repeatedly verified?' },
      { zh: '问：是否存在第三个隐藏变量？', en: 'Ask: Is there a third hidden variable?' },
    ],
  },

  emotional_reasoning: {
    name: { zh: '情绪化推理', en: 'Emotional Reasoning' },
    definition: { zh: '将"我感觉X"等同于"X是真的"。情绪成为判断现实的唯一依据。', en: 'Equating "I feel X" with "X is true". Emotions become the sole basis for judging reality.' },
    mechanism: { zh: '在高压下，情绪会压倒理性思考，大脑将情绪信号误认为事实。', en: 'Under high pressure, emotions overwhelm rational thinking, and the brain mistakes emotional signals for facts.' },
    gameExample: { zh: '助理"感觉要死了"，但实际上她只是很冷和恐惧，并没有生命危险。', en: 'The assistant "feels like dying", but actually she\'s just cold and scared, not in mortal danger.' },
    realExamples: [
      { zh: '焦虑症患者："我感觉心脏要停了"（实际上心脏很健康）', en: 'Anxiety patient: "I feel like my heart will stop" (heart is actually healthy)' },
      { zh: '飞行恐惧："我感觉飞机要坠毁"（实际上飞机是最安全的交通工具）', en: 'Fear of flying: "I feel the plane will crash" (planes are the safest transport)' },
      { zh: '职场焦虑："我感觉老板要开除我"（实际上只是自己的担忧）', en: 'Workplace anxiety: "I feel the boss will fire me" (just personal worry)' },
    ],
    howToDetect: [
      { zh: '问：情绪是信号，不是事实', en: 'Remember: Emotions are signals, not facts' },
      { zh: '问：有什么客观证据支持这个感觉？', en: 'Ask: What objective evidence supports this feeling?' },
      { zh: '问：如果我冷静时会怎么判断？', en: 'Ask: How would I judge this when calm?' },
    ],
  },

  sunk_cost: {
    name: { zh: '沉没成本谬误', en: 'Sunk Cost Fallacy' },
    definition: { zh: '因为已经投入了时间/精力/资源，就继续错误的决策。', en: 'Continuing wrong decisions because of already invested time/effort/resources.' },
    mechanism: { zh: '人们厌恶损失，不愿承认之前的投入是"浪费的"。', en: 'People hate losses and are reluctant to admit previous investments were "wasted".' },
    gameExample: { zh: '"我们已经花了一个小时救飞行员，不能放弃" - 但继续会导致更大损失。', en: '"We\'ve spent an hour rescuing the pilot, can\'t give up" - but continuing leads to greater loss.' },
    realExamples: [
      { zh: '"我已经在这段糟糕的关系里待了5年，不能放弃"', en: '"I\'ve been in this bad relationship for 5 years, can\'t give up"' },
      { zh: '协和飞机项目 - 明知亏损仍继续投资（协和谬误）', en: 'Concorde project - Continued investment despite knowing losses (Concorde fallacy)' },
      { zh: '赌徒："我已经输了这么多，再赌一把一定能赢回来"', en: 'Gambler: "I\'ve lost so much, one more bet will definitely win it back"' },
    ],
    howToDetect: [
      { zh: '问：如果从零开始，我还会做同样的决定吗？', en: 'Ask: If starting from zero, would I make the same decision?' },
      { zh: '问：我是在评估未来，还是在弥补过去？', en: 'Ask: Am I evaluating the future, or compensating for the past?' },
      { zh: '问：继续的边际成本和收益是什么？', en: 'Ask: What are the marginal costs and benefits of continuing?' },
    ],
  },

  survivorship_bias: {
    name: { zh: '幸存者偏差', en: 'Survivorship Bias' },
    definition: { zh: '只看到成功案例，忽视失败案例（因为失败者无法发声）。', en: 'Only seeing success stories, ignoring failures (because failures can\'t speak).' },
    mechanism: { zh: '成功者是可见的，失败者是隐形的，导致对成功概率的错误估计。', en: 'Successes are visible, failures are invisible, leading to wrong estimates of success probability.' },
    gameExample: { zh: '向导只记得"我在山洞活下来了"，忘了那是在不同条件下。', en: 'The guide only remembers "I survived in the cave", forgetting it was under different conditions.' },
    realExamples: [
      { zh: '"成功企业家都辍学创业" - 忽视了数百万辍学后失败的人', en: '"Successful entrepreneurs all dropped out" - ignoring millions who failed after dropping out' },
      { zh: '二战飞机加固案例：幸存飞机的弹孔分布不代表应加固的位置', en: 'WWII plane reinforcement: Bullet holes on surviving planes don\'t indicate where to reinforce' },
      { zh: '"股神的投资秘诀" - 忽视了采用同样方法但破产的投资者', en: '"Investment guru\'s secrets" - ignoring investors who used same methods but went bankrupt' },
    ],
    howToDetect: [
      { zh: '问：失败者在哪？', en: 'Ask: Where are the failures?' },
      { zh: '问：基数是多少？（成功的10个 vs 失败的1000个）', en: 'Ask: What\'s the base rate? (10 successes vs 1000 failures)' },
      { zh: '问：我是否只听到了"成功的故事"？', en: 'Ask: Have I only heard "success stories"?' },
    ],
  },

  gamblers_fallacy: {
    name: { zh: '赌徒谬误', en: "Gambler's Fallacy" },
    definition: { zh: '认为过去的随机事件会影响未来的独立事件（"该轮到我了"）。', en: 'Believing past random events affect future independent events ("it\'s my turn").' },
    mechanism: { zh: '大脑错误地认为概率会"自我平衡"。', en: 'The brain wrongly believes probability will "self-balance".' },
    gameExample: { zh: '"风雪已经刮了3天，该停了" - 但每天的天气是独立事件。', en: '"The blizzard has lasted 3 days, it should stop" - but each day\'s weather is independent.' },
    realExamples: [
      { zh: '赌场："这个老虎机很久没中奖了，该轮到我了"', en: 'Casino: "This slot machine hasn\'t won in a while, it\'s my turn"' },
      { zh: '彩票："这个号码太久没开了，这期一定会开"', en: 'Lottery: "This number hasn\'t been drawn in a long time, it must come up"' },
      { zh: '生育："已经生了3个女儿，下一个一定是儿子"', en: 'Fertility: "Already had 3 daughters, the next must be a son"' },
    ],
    howToDetect: [
      { zh: '问：每次都是独立事件吗？', en: 'Ask: Is each time an independent event?' },
      { zh: '问：过去的结果是否真的影响未来？', en: 'Ask: Do past results really affect the future?' },
      { zh: '问：概率是固定的吗？', en: 'Ask: Is the probability fixed?' },
    ],
  },

  confirmation_bias: {
    name: { zh: '确认偏误', en: 'Confirmation Bias' },
    definition: { zh: '只寻找支持自己观点的证据，忽视反驳证据。', en: 'Only seeking evidence that supports one\'s views, ignoring contradictory evidence.' },
    mechanism: { zh: '大脑倾向于接受符合既有信念的信息，拒绝相反的信息。', en: 'The brain tends to accept information matching existing beliefs, rejecting contrary information.' },
    gameExample: { zh: '销售总监说"我们俩聪明人才能活"，诱导你只关注支持这个观点的证据。', en: 'Sales Director says "only us smart ones can survive", leading you to only notice supporting evidence.' },
    realExamples: [
      { zh: '股市投资："我的股票一定会涨"（只看好消息，忽视风险）', en: 'Stock investing: "My stocks will definitely rise" (only seeing good news, ignoring risks)' },
      { zh: '政治立场：只看支持自己党派的新闻', en: 'Political stance: Only reading news supporting one\'s party' },
      { zh: '医学误诊：医生先入为主，只寻找支持初步诊断的症状', en: 'Medical misdiagnosis: Doctors with preconceptions only look for symptoms supporting initial diagnosis' },
    ],
    howToDetect: [
      { zh: '问：什么证据能证明我是错的？', en: 'Ask: What evidence could prove me wrong?' },
      { zh: '问：我是否主动寻找了反驳证据？', en: 'Ask: Have I actively sought contradictory evidence?' },
      { zh: '问：我是在寻找真相，还是在证明自己对？', en: 'Ask: Am I seeking truth, or proving myself right?' },
    ],
  },

  fundamental_attribution_error: {
    name: { zh: '基本归因错误', en: 'Fundamental Attribution Error' },
    definition: { zh: '高估性格因素，低估情境因素。将他人的行为归咎于性格，而非环境。', en: 'Overestimating personality factors, underestimating situational factors. Attributing others\' behavior to character, not environment.' },
    mechanism: { zh: '大脑更容易注意到个人特质，而忽视不可见的情境因素。', en: 'The brain more easily notices personal traits while ignoring invisible situational factors.' },
    gameExample: { zh: '"食物丢失"被归咎于助理"自私的性格"，而非情境（风吹走了）。', en: '"Lost food" is blamed on assistant\'s "selfish character", not situation (wind blew it away).' },
    realExamples: [
      { zh: '"他迟到是因为他懒" - 忽视了可能堵车、家里有急事', en: '"He\'s late because he\'s lazy" - ignoring possible traffic, family emergency' },
      { zh: '"他成绩差是因为笨" - 忽视了家庭环境、教育资源的差异', en: '"His grades are bad because he\'s dumb" - ignoring family environment, educational resource differences' },
      { zh: '"乞丐是因为不努力" - 忽视了系统性贫困和机会不平等', en: '"Beggars are lazy" - ignoring systemic poverty and unequal opportunities' },
    ],
    howToDetect: [
      { zh: '问：情境因素有哪些？', en: 'Ask: What are the situational factors?' },
      { zh: '问：如果我处于同样的情境会怎样？', en: 'Ask: What would I do in the same situation?' },
      { zh: '问：我是否过快下结论了？', en: 'Ask: Did I jump to conclusions too quickly?' },
    ],
  },

  omission_bias: {
    name: { zh: '不作为偏误', en: 'Omission Bias' },
    definition: { zh: '认为"作为导致的坏结果"比"不作为导致的坏结果"更糟。', en: 'Believing "bad outcomes from action" are worse than "bad outcomes from inaction".' },
    mechanism: { zh: '人们对主动造成的伤害有更强的道德负罪感。', en: 'People feel stronger moral guilt for harm they actively caused.' },
    gameExample: { zh: '拒绝冒险手术（主动作为可能导致死亡），选择坐等（不作为也导致死亡）。', en: 'Refusing risky surgery (action might cause death), choosing to wait (inaction also causes death).' },
    realExamples: [
      { zh: '电车难题：多数人拒绝主动扳道岔（即使能救更多人）', en: 'Trolley problem: Most refuse to actively switch tracks (even to save more people)' },
      { zh: '疫苗犹豫：担心疫苗副作用（作为），忽视不接种的风险（不作为）', en: 'Vaccine hesitancy: Worrying about side effects (action), ignoring risks of not vaccinating (inaction)' },
      { zh: '投资决策：不卖出亏损股票（不作为），因为卖出"确认了损失"（作为）', en: 'Investment: Not selling losing stocks (inaction), because selling "confirms loss" (action)' },
    ],
    howToDetect: [
      { zh: '问：不作为的后果是什么？', en: 'Ask: What are the consequences of inaction?' },
      { zh: '问：作为和不作为，哪个预期伤害更小？', en: 'Ask: Action vs inaction - which has lower expected harm?' },
      { zh: '问：我是否因为恐惧"主动决策"而选择逃避？', en: 'Ask: Am I avoiding because I fear "active decision-making"?' },
    ],
  },

  anchoring_effect: {
    name: { zh: '锚定效应', en: 'Anchoring Effect' },
    definition: { zh: '过度依赖第一个接触到的信息（"锚点"），后续判断都围绕它调整。', en: 'Over-relying on the first piece of information encountered (the "anchor"), adjusting subsequent judgments around it.' },
    mechanism: { zh: '大脑会以初始信息为参照点，难以摆脱其影响。', en: 'The brain uses initial information as a reference point, making it hard to escape its influence.' },
    gameExample: { zh: '程序员锚定"0.5秒的亮光"，认为方向对了，需要更多电力（实际上是短路）。', en: 'Programmer anchors on "0.5 second flash", thinks direction is right, needs more power (actually a short circuit).' },
    realExamples: [
      { zh: '商品定价：原价$100打折到$50，你觉得"好便宜"（被原价锚定）', en: 'Pricing: Original $100 discounted to $50, you think "so cheap" (anchored by original price)' },
      { zh: '薪资谈判：第一个报价会影响最终薪资', en: 'Salary negotiation: First offer influences final salary' },
      { zh: '房地产：第一套看的房子价格会影响对后续房子的评估', en: 'Real estate: Price of first house viewed influences evaluation of subsequent houses' },
    ],
    howToDetect: [
      { zh: '问：如果没有这个初始信息，我会怎么判断？', en: 'Ask: Without this initial information, how would I judge?' },
      { zh: '问：这个锚点是否合理？', en: 'Ask: Is this anchor reasonable?' },
      { zh: '问：我能否独立评估，不受初始数据影响？', en: 'Ask: Can I evaluate independently, unaffected by initial data?' },
    ],
  },

  availability_heuristic: {
    name: { zh: '可得性启发', en: 'Availability Heuristic' },
    definition: { zh: '依赖最容易想到的信息做决策，而非全面考察。', en: 'Relying on the most easily recalled information for decisions, rather than comprehensive examination.' },
    mechanism: { zh: '大脑倾向于使用"容易提取"的记忆，而非客观数据。', en: 'The brain tends to use "easily retrieved" memories rather than objective data.' },
    gameExample: { zh: '你"刚才看到助理睡得好"，就认为她最精神（实际上她发烧昏沉）。', en: 'You "just saw assistant sleeping well", so you think she\'s most energetic (actually she\'s feverish and drowsy).' },
    realExamples: [
      { zh: '"飞机不安全" - 因为飞机事故报道很多，但实际上汽车更危险', en: '"Planes are unsafe" - because plane crashes are widely reported, but cars are actually more dangerous' },
      { zh: '"鲨鱼很危险" - 因为电影和新闻，但每年被蚊子杀死的人远超鲨鱼', en: '"Sharks are dangerous" - because of movies and news, but mosquitoes kill far more people annually' },
      { zh: '疫情恐慌：因为媒体报道，过度估计感染风险', en: 'Pandemic panic: Overestimating infection risk due to media coverage' },
    ],
    howToDetect: [
      { zh: '问：什么信息我忽略了？', en: 'Ask: What information am I ignoring?' },
      { zh: '问：最容易想到的，是否等于最重要的？', en: 'Ask: Is what\'s most easily recalled the same as what\'s most important?' },
      { zh: '问：我能否查找客观数据，而非依赖印象？', en: 'Ask: Can I look up objective data rather than relying on impressions?' },
    ],
  },

  backfire_effect: {
    name: { zh: '逆火效应', en: 'Backfire Effect' },
    definition: { zh: '当核心信念被挑战时，反驳越多，越坚信原观点。', en: 'When core beliefs are challenged, more rebuttals lead to stronger belief in original view.' },
    mechanism: { zh: '反驳被视为威胁，触发防御机制，强化原有信念。', en: 'Rebuttals are seen as threats, triggering defense mechanisms that strengthen original beliefs.' },
    gameExample: { zh: '程序员崩溃坚信"我们都死定了"，越反驳他越坚信。正确方法是安抚而非辩论。', en: 'Programmer in breakdown firmly believes "we\'re all doomed", more rebuttals strengthen belief. Correct approach is comfort, not debate.' },
    realExamples: [
      { zh: '政治辩论：越多证据反而让对方更坚信原观点', en: 'Political debate: More evidence makes the other side believe their original view more strongly' },
      { zh: '疫苗争论：提供科学证据反而让反疫苗者更坚定', en: 'Vaccine debate: Providing scientific evidence makes anti-vaxxers more convinced' },
      { zh: '阴谋论：反驳被视为"官方掩盖真相"的证据', en: 'Conspiracy theories: Rebuttals are seen as evidence of "official cover-up"' },
    ],
    howToDetect: [
      { zh: '策略：安抚而非辩论', en: 'Strategy: Comfort, don\'t debate' },
      { zh: '策略：顺着对方说，再引导方向', en: 'Strategy: Go along first, then guide direction' },
      { zh: '问：我是在说服他，还是在强化他的防御？', en: 'Ask: Am I persuading them, or strengthening their defenses?' },
    ],
  },

  just_world_fallacy: {
    name: { zh: '公平世界谬误', en: 'Just-World Fallacy' },
    definition: { zh: '相信世界是公平的，好人有好报，坏人有坏报，人得到的都是应得的。', en: 'Believing the world is fair, good people get good outcomes, bad people get bad outcomes, people get what they deserve.' },
    mechanism: { zh: '这种信念提供心理安全感（"只要我做好事，就不会遭遇不幸"）。', en: 'This belief provides psychological safety ("as long as I do good, I won\'t suffer misfortune").' },
    gameExample: { zh: '销售总监认为"我贡献大，应该多得"，忽视了公平不等于人道。', en: 'Sales Director thinks "I contributed more, I should get more", ignoring that fairness isn\'t the same as humanity.' },
    realExamples: [
      { zh: '"他穷是因为他懒" - 忽视系统性不公和运气因素', en: '"He\'s poor because he\'s lazy" - ignoring systemic injustice and luck factors' },
      { zh: '受害者责备："她被侵犯是因为穿得少" - 为施害者开脱', en: 'Victim blaming: "She was assaulted because she dressed provocatively" - excusing the perpetrator' },
      { zh: '成功归因："我成功是因为我努力" - 忽视运气、资源、机遇的作用', en: 'Success attribution: "I succeeded because I worked hard" - ignoring luck, resources, opportunities' },
    ],
    howToDetect: [
      { zh: '问：运气和系统因素呢？', en: 'Ask: What about luck and systemic factors?' },
      { zh: '问：世界真的是公平的吗？', en: 'Ask: Is the world really fair?' },
      { zh: '问：我是否在为不公找借口？', en: 'Ask: Am I making excuses for injustice?' },
    ],
  },

  optimism_bias: {
    name: { zh: '乐观偏误', en: 'Optimism Bias' },
    definition: { zh: '倾向于高估积极事件发生的可能性，低估消极事件的风险。', en: 'Tendency to overestimate the likelihood of positive events and underestimate risks of negative events.' },
    mechanism: { zh: '大脑通过乐观预期来提升情绪和动机，但可能导致对风险的错误评估。', en: 'The brain uses optimistic expectations to boost mood and motivation, but this can lead to miscalculation of risks.' },
    gameExample: { zh: '销售总监相信"救援队今天就到"，导致浪费信号弹资源。', en: 'Sales Director believes "rescue will arrive today", leading to waste of signal flare resources.' },
    realExamples: [
      { zh: '"这不可能发生在我身上" - 高估自己的好运', en: '"This won\'t happen to me" - overestimating one\'s good fortune' },
      { zh: '过度投资："股价只会涨"，忽视市场风险', en: 'Over-investing: "Stock prices only go up", ignoring market risks' },
      { zh: '健康："我年轻，不会生病" - 忽视预防', en: 'Health: "I\'m young, won\'t get sick" - ignoring prevention' },
    ],
    howToDetect: [
      { zh: '问：最坏的情况是什么？', en: 'Ask: What\'s the worst-case scenario?' },
      { zh: '问：有什么证据支持/反驳这个想法？', en: 'Ask: What evidence supports/contradicts this belief?' },
      { zh: '问：如果我是悲观主义者会怎么想？', en: 'Ask: How would a pessimist think about this?' },
    ],
  },

  pattern_recognition: {
    name: { zh: '模式识别偏误', en: 'Pattern Recognition Bias' },
    definition: { zh: '在随机或无意义的信息中"发现"有意义的模式或联系。', en: '"Finding" meaningful patterns or connections in random or meaningless information.' },
    mechanism: { zh: '人类大脑是模式识别机器，但它过于敏感——宁可误报（看到不存在的模式）也不愿漏报（错过真实的模式）。', en: 'The human brain is a pattern recognition machine, but it\'s overly sensitive - preferring false positives (seeing non-existent patterns) to false negatives (missing real patterns).' },
    gameExample: { zh: '销售总监"听到"直升机声音——在风声中识别出不存在的模式。', en: 'Sales Director "hears" helicopter sounds - identifying non-existent patterns in the wind.' },
    realExamples: [
      { zh: '赌徒看到轮盘"规律"："红色已经出了5次，黑色该出了"', en: 'Gambler sees roulette "pattern": "Red came up 5 times, black is due"' },
      { zh: '阴谋论："所有事件都是某个组织策划的"——在巧合中看到阴谋', en: 'Conspiracy theories: "All events are orchestrated by some organization" - seeing conspiracies in coincidences' },
      { zh: '星座运势：在模糊描述中"发现"与自己生活的关联', en: 'Horoscopes: "Finding" connections to one\'s life in vague descriptions' },
    ],
    howToDetect: [
      { zh: '问：这个"模式"有统计学依据吗？', en: 'Ask: Does this "pattern" have statistical basis?' },
      { zh: '问：我是否在寻找确认我想法的证据？', en: 'Ask: Am I seeking evidence to confirm my thoughts?' },
      { zh: '问：随机事件能否产生类似的"模式"？', en: 'Ask: Can random events produce similar "patterns"?' },
    ],
  },

  group_attribution_error: {
    name: { zh: '群体归因错误', en: 'Group Attribution Error' },
    definition: { zh: '认为群体中个体的特征代表整个群体，或群体的决定反映了所有成员的偏好。', en: 'Believing that characteristics of individuals in a group represent the whole group, or that group decisions reflect all members\' preferences.' },
    mechanism: { zh: '大脑倾向于简化复杂的群体动态，将其归结为单一特征。这导致刻板印象和不公平的责任归属。', en: 'The brain tends to simplify complex group dynamics, reducing them to single characteristics. This leads to stereotypes and unfair attribution of responsibility.' },
    gameExample: { zh: '你责怪飞行员导致坠机——将团队失败归咎于个人，忽视系统因素。', en: 'You blame the pilot for the crash - attributing team failure to individuals while ignoring systemic factors.' },
    realExamples: [
      { zh: '种族刻板印象："所有X族人都是Y"——以偏概全', en: 'Racial stereotypes: "All X people are Y" - overgeneralization' },
      { zh: '职业偏见："所有销售都不诚实"——群体标签', en: 'Professional prejudice: "All salespeople are dishonest" - group labeling' },
      { zh: '政治极化："所有支持X的人都是傻瓜"——否认对方阵营的多样性', en: 'Political polarization: "All supporters of X are fools" - denying diversity in opposing camps' },
    ],
    howToDetect: [
      { zh: '问：我是否用"所有"、"总是"这样的绝对词？', en: 'Ask: Am I using absolute words like "all" or "always"?' },
      { zh: '问：这个群体中真的没有例外吗？', en: 'Ask: Are there really no exceptions in this group?' },
      { zh: '问：我是否了解这个群体中的个体差异？', en: 'Ask: Do I understand individual differences within this group?' },
    ],
  },

  normalcy_bias: {
    name: { zh: '常态偏误', en: 'Normalcy Bias' },
    definition: { zh: '低估灾难发生的可能性及其影响，假设一切会像往常一样正常运转。', en: 'Underestimating the likelihood and impact of disasters, assuming things will continue as normal.' },
    mechanism: { zh: '大脑抗拒处理异常情况，因为这需要消耗大量认知资源并引发焦虑。结果是在危机面前"冻结"或否认。', en: 'The brain resists dealing with abnormal situations, as this requires大量 cognitive resources and triggers anxiety. The result is "freezing" or denying crisis situations.' },
    gameExample: { zh: '暴风雪加剧时，有人说"应该没事，它已经撑了这么久了"——否认恶化的现实。', en: 'When the blizzard intensifies, someone says "It should be fine, it\'s held up this long" - denying worsening reality.' },
    realExamples: [
      { zh: '火灾时：以为"只是演习"，拒绝撤离', en: 'During fires: thinking "it\'s just a drill", refusing to evacuate' },
      { zh: '地震：室内避险而非撤离到空旷地带', en: 'Earthquakes: seeking shelter indoors instead of evacuating to open areas' },
      { zh: '疫情早期："这不会传到我们这里"', en: 'Early pandemic: "This won\'t reach us here"' },
    ],
    howToDetect: [
      { zh: '问：这个情况真的"正常"吗？', en: 'Ask: Is this situation really "normal"?' },
      { zh: '问：过去的情况能预测未来吗？', en: 'Ask: Can past situations predict the future?' },
      { zh: '问：我在为拒绝改变找借口吗？', en: 'Ask: Am I making excuses to avoid change?' },
    ],
  },
};

// 获取本地化的偏误信息
export function getLocalizedBias(biasId: string, lang: Language) {
  const translation = biasTranslations[biasId];
  if (!translation) return null;

  return {
    name: t(translation.name, lang),
    definition: t(translation.definition, lang),
    mechanism: t(translation.mechanism, lang),
    gameExample: t(translation.gameExample, lang),
    realExamples: translation.realExamples.map(ex => t(ex, lang)),
    howToDetect: translation.howToDetect.map(tip => t(tip, lang)),
  };
}

// 角色翻译数据
export const roleTranslations: Record<string, {
  occupation: LocalizedText;
  description: LocalizedText;
  personality: LocalizedText;
  secret: LocalizedText;
  skill: {
    name: LocalizedText;
    description: LocalizedText;
  };
}> = {
  ceo: {
    occupation: { zh: 'CEO（首席执行官）', en: 'CEO (Chief Executive Officer)' },
    description: { zh: '公司创始人，习惯于发号施令。在危机中试图维持控制。', en: 'Company founder, used to giving orders. Tries to maintain control during crisis.' },
    personality: { zh: '权威、理性（但可能过于自信）、有领导欲', en: 'Authoritative, rational (but may be overconfident), leadership-driven' },
    secret: { zh: '患有慢性疾病（未向团队透露）', en: 'Has chronic illness (not disclosed to team)' },
    skill: {
      name: { zh: '指挥', en: 'Command' },
      description: { zh: '强制终止争论，让团队听从你的决定', en: 'Force end arguments, make team follow your decision' },
    },
  },
  programmer: {
    occupation: { zh: '程序员', en: 'Programmer' },
    description: { zh: '技术宅，不擅社交但逻辑清晰。', en: 'Tech geek, poor social skills but clear logical thinking.' },
    personality: { zh: '理性、内向、完美主义、在压力下可能崩溃', en: 'Rational, introverted, perfectionist, may break down under pressure' },
    secret: { zh: '对数字和概率有敏锐直觉', en: 'Has keen intuition for numbers and probability' },
    skill: {
      name: { zh: '修复', en: 'Repair' },
      description: { zh: '修理电子设备，尤其是救援信标', en: 'Repair electronic devices, especially the rescue beacon' },
    },
  },
  assistant: {
    occupation: { zh: '助理', en: 'Assistant' },
    description: { zh: '看似柔弱，实则韧性惊人。', en: 'Appears fragile, but remarkably resilient.' },
    personality: { zh: '温和、善于倾听、常被低估', en: 'Gentle, good listener, often underestimated' },
    secret: { zh: '曾是医学院学生（因家庭原因辍学，但保留了医疗知识）', en: 'Former medical student (dropped out for family reasons, but retained medical knowledge)' },
    skill: {
      name: { zh: '急救', en: 'First Aid' },
      description: { zh: '治疗自己或他人的伤势（恢复15-25 HP）', en: 'Treat injuries for self or others (restore 15-25 HP)' },
    },
  },
  guide: {
    occupation: { zh: '登山向导', en: 'Mountain Guide' },
    description: { zh: '经验丰富的登山向导，对自然规律了如指掌。', en: 'Experienced mountain guide, knows nature\'s rules inside out.' },
    personality: { zh: '沉稳、实用主义、对公司政治不感兴趣', en: 'Calm, pragmatic, uninterested in corporate politics' },
    secret: { zh: '曾在类似危机中存活（但那是在不同条件下）', en: 'Survived similar crisis before (but under different conditions)' },
    skill: {
      name: { zh: '荒野智慧', en: 'Wilderness Wisdom' },
      description: { zh: '识别环境中的真正危险，找到自然资源', en: 'Identify real dangers in environment, find natural resources' },
    },
  },
  pilot: {
    occupation: { zh: '飞行员', en: 'Pilot' },
    description: { zh: '经验丰富的商务飞行员，对机械和飞机结构了如指掌。', en: 'Experienced business pilot, knows mechanics and aircraft structure inside out.' },
    personality: { zh: '务实、责任感强、可能因事故自责', en: 'Practical, strong sense of responsibility, may blame self for crash' },
    secret: { zh: '在坠机中腿部受伤', en: 'Leg injured in the crash' },
    skill: {
      name: { zh: '机械知识', en: 'Mechanical Knowledge' },
      description: { zh: '了解飞机残骸结构，找到隐藏物资或加固避难所', en: 'Know aircraft wreckage structure, find hidden supplies or reinforce shelter' },
    },
  },
  sales: {
    occupation: { zh: '销售总监', en: 'Sales Director' },
    description: { zh: '能言善辩，擅长读懂人心并影响他人。', en: 'Eloquent speaker, skilled at reading and influencing people.' },
    personality: { zh: '机敏、自私倾向、善于操纵但也能鼓舞士气', en: 'Sharp, tends toward selfishness, manipulative but can also boost morale' },
    secret: { zh: '在危机中可能展现出极端自私或意外的英雄主义', en: 'May show extreme selfishness or unexpected heroism in crisis' },
    skill: {
      name: { zh: '谈判', en: 'Negotiation' },
      description: { zh: '说服一个"激动"或"恐慌"的NPC暂时冷静下来，或尝试修复敌对关系（50%成功率）', en: 'Calm an agitated or panicked NPC, or attempt to repair hostile relationships (50% success rate)' },
    },
  },
};

// 获取本地化的角色信息
export function getLocalizedRole(roleId: string, lang: Language) {
  const translation = roleTranslations[roleId];
  if (!translation) return null;

  return {
    occupation: t(translation.occupation, lang),
    description: t(translation.description, lang),
    personality: t(translation.personality, lang),
    secret: t(translation.secret, lang),
    skill: {
      name: t(translation.skill.name, lang),
      description: t(translation.skill.description, lang),
    },
  };
}

// 结局翻译数据
export const endingTranslations = {
  rescue: {
    title: { zh: '救援', en: 'Rescue' },
    condition: { zh: '信标修复进度 >= 80%', en: 'Beacon repair progress >= 80%' },
  },
  bitter_victory: {
    title: { zh: '惨胜', en: 'Bitter Victory' },
    condition: { zh: '存活到第10天且有人死亡', en: 'Survive to day 10 with casualties' },
  },
  survival: {
    title: { zh: '幸存', en: 'Survival' },
    condition: { zh: '存活到第10天且所有人存活', en: 'Survive to day 10 with everyone alive' },
  },
  collapse: {
    title: { zh: '崩溃', en: 'Collapse' },
    condition: { zh: '压力时钟达到15格', en: 'Stress clock reaches 15' },
  },
  your_end: {
    title: { zh: '你的终点', en: 'Your End' },
    condition: { zh: '玩家HP降至0或选择背叛/逃跑', en: 'Player HP drops to 0 or chose betrayal/escape' },
  },
};

// 通用游戏文本
export const gameText = {
  roleLabels: {
    pilot: { zh: '飞行员', en: 'Pilot' },
    ceo: { zh: 'CEO', en: 'CEO' },
    assistant: { zh: '助理', en: 'Assistant' },
    guide: { zh: '向导', en: 'Guide' },
    sales: { zh: '销售总监', en: 'Sales Director' },
    programmer: { zh: '程序员', en: 'Programmer' },
  },
  states: {
    calm: { zh: '冷静', en: 'Calm' },
    agitated: { zh: '激动', en: 'Agitated' },
    panic: { zh: '恐慌', en: 'Panic' },
    breakdown: { zh: '崩溃', en: 'Breakdown' },
  },
  relationships: {
    ally: { zh: '盟友', en: 'Ally' },
    neutral: { zh: '中立', en: 'Neutral' },
    hostile: { zh: '敌对', en: 'Hostile' },
  },
};

// 获取本地化的角色标题
export function getLocalizedRoleTitle(roleId: string, lang: Language): string {
  const label = gameText.roleLabels[roleId as keyof typeof gameText.roleLabels];
  return label ? t(label, lang) : roleId;
}

// 结局描述模板
export const endingDescriptions = {
  rescue: {
    zh: (state: any) => {
      const survivors = state.npcs.filter((npc: any) => npc.alive);
      return `第${state.day}天，下午14:37。

应急信标突然发出了震耳欲聋的回应。
你们围在驾驶舱里，看着那个红色的灯光——它闪烁得如此稳定，如此真实。

几个小时后，直升机的轰鸣声穿透了风雪。
当舱门打开，救援队员跳下来时，${survivors.find((npc: any) => npc.roleId === 'assistant') ? getLocalizedRoleTitle('assistant', 'zh') + '哭了出来。' : '幸存者们喜极而泣。'}

你们获救了。

存活幸存者：${survivors.length + 1}人（包括你）
你在${state.day}天内修复了信标，拯救了所有人。
这是最理想的结局。`;
    },
    en: (state: any) => {
      const survivors = state.npcs.filter((npc: any) => npc.alive);
      return `Day ${state.day}, 2:37 PM.

The emergency beacon suddenly emits a deafening response.
You gather in the cockpit, watching that red light - it flashes so steadily, so real.

Hours later, the roar of helicopters penetrates the storm.
When the hatch opens, rescue team jumps out, ${survivors.find((npc: any) => npc.roleId === 'assistant') ? getLocalizedRoleTitle('assistant', 'en') + ' breaks down in tears.' : 'survivors weep with joy.'}

You are rescued.

Survivors: ${survivors.length + 1} people (including you)
You repaired the beacon in ${state.day} days, saving everyone.
This is the ideal ending.`;
    },
  },
  collapse: {
    zh: (state: any) => `第${state.day}天，时间不明。

理智的最后一根弦，断了。

恐慌像瘟疫一样蔓延。
有人尖叫着冲进了暴风雪...
有人抓起残骸的金属碎片...
有人蜷缩在角落里彻底崩溃...

当救援队在第10天找到残骸时，
他们只看到了一片死寂。

无人幸存。

你的团队在压力下彻底崩溃了。
理性，是生存的最后防线。`,
    en: (state: any) => `Day ${state.day}, time unknown.

The last string of sanity snaps.

Panic spreads like a plague.
Someone screams and runs into the blizzard...
Someone grabs metal fragments from the wreckage...
Someone curls up in the corner and completely breaks down...

When the rescue team finds the wreckage on day 10,
they see only silence.

No survivors.

Your team completely collapsed under pressure.
Reason is the last line of survival.`,
  },
  bitter_victory: {
    zh: (state: any) => {
      const survivors = state.npcs.filter((npc: any) => npc.alive);
      const dead = state.npcs.filter((npc: any) => !npc.alive);

      let description = `第10天，早晨7:05。

风停了。

你虚弱地爬出残骸，刺眼的阳光让你几乎睁不开眼。
天空，蓝得不可思议。

远处，有直升机的声音。

`;

      if (survivors.length > 0) {
        description += `你回头看看${survivors.map((npc: any) => getLocalizedRoleTitle(npc.roleId, 'zh')).join('、')}。
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
${dead.map((npc: any) => `- ${getLocalizedRoleTitle(npc.roleId, 'zh')}`).join('\n')}

`;
      }

      description += `你活了下来。
但你永远不会忘记那些没能活下来的人。`;

      return description;
    },
    en: (state: any) => {
      const survivors = state.npcs.filter((npc: any) => npc.alive);
      const dead = state.npcs.filter((npc: any) => !npc.alive);

      let description = `Day 10, 7:05 AM.

The wind has stopped.

You weakly climb out of the wreckage, the dazzling sunlight almost blinding you.
The sky, impossibly blue.

Helicopter sounds in the distance.

`;

      if (survivors.length > 0) {
        description += `You look back at ${survivors.map((npc: any) => getLocalizedRoleTitle(npc.roleId, 'en')).join(', ')}.
Their faces mirror yours - the numbness of survival.

`;
      } else {
        description += `You look back at the empty wreckage.
You are the only survivor.

`;
      }

      description += `The rescue team found you the moment the storm ended.

But you paid a price.

`;

      if (dead.length > 0) {
        description += `Those who didn't make it:
${dead.map((npc: any) => `- ${getLocalizedRoleTitle(npc.roleId, 'en')}`).join('\n')}

`;
      }

      description += `You survived.
But you'll never forget those who didn't.`;

      return description;
    },
  },
  survival: {
    zh: (state: any) => {
      const survivors = state.npcs.filter((npc: any) => npc.alive);

      return `第10天，早晨7:05。

风停了。

你虚弱地爬出残骸，刺眼的阳光让你几乎睁不开眼。
天空，蓝得不可思议。

远处，有直升机的声音。

你回头看看${survivors.map((npc: any) => getLocalizedRoleTitle(npc.roleId, 'zh')).join('、')}。
所有人都还活着。

虽然疲惫不堪，虽然遍体鳞伤，但你们都活了下来。

救援队在风暴结束的第一时间找到了你们。

虽然没能修复信标，但你们以团队的力量，撑过了最黑暗的10天。

存活幸存者：${survivors.length + 1}人（全员）

这已经是了不起的成就。`;
    },
    en: (state: any) => {
      const survivors = state.npcs.filter((npc: any) => npc.alive);

      return `Day 10, 7:05 AM.

The wind has stopped.

You weakly climb out of the wreckage, the dazzling sunlight almost blinding you.
The sky, impossibly blue.

Helicopter sounds in the distance.

You look back at ${survivors.map((npc: any) => getLocalizedRoleTitle(npc.roleId, 'en')).join(', ')}.
Everyone is still alive.

Though exhausted and battered, you all survived.

The rescue team found you the moment the storm ended.

Though the beacon wasn't repaired, your teamwork carried you through the darkest 10 days.

Survivors: ${survivors.length + 1} people (everyone)

This is already a remarkable achievement.`;
    },
  },
  your_end: {
    zh: (state: any) => {
      const survivors = state.npcs.filter((npc: any) => npc.alive);
      if (state.flags['betrayal_escape']) {
        return `你和${getLocalizedRoleTitle('sales', 'zh')}离开了残骸。

第一个小时，你们还能互相鼓励。
第二个小时，你们迷路了。
第三个小时，${getLocalizedRoleTitle('sales', 'zh')}倒下了。

你试图继续前进，但暴风雪吞噬了一切。

两天后，你们冻死在离残骸不到一公里的地方。

救援队在第10天找到了残骸。
${survivors.length > 0 ? '其他留下的人，获救了。' : '但所有人都已死去。'}

你选择了自私。
但在绝境中，团队才是唯一的希望。`;
      } else {
        return `你再也撑不住了。

寒冷、饥饿、伤痛...它们终于追上了你。

你最后的意识，是${survivors.length > 0 ? `${getLocalizedRoleTitle(survivors[0].roleId, 'zh')}的呼喊声："醒醒！别睡！"` : '风雪的呼啸声'}。

但你已经听不见了。

${state.beaconProgress === 100 ? `讽刺的是，信标在你死后的第二天被修复了。
救援队赶到时，其他人获救了。
只有你，长眠在了雪中。` : state.stressClock < 8 ? `你的牺牲不是没有意义的。
你的理性决策让团队保持了团结。
${survivors.length > 0 ? '他们会记住你。' : '但最终，无人幸存。'}` : `团队在你死后迅速崩溃。
三天后，无人幸存。`}`;
      }
    },
    en: (state: any) => {
      const survivors = state.npcs.filter((npc: any) => npc.alive);
      if (state.flags['betrayal_escape']) {
        return `You and ${getLocalizedRoleTitle('sales', 'en')} left the wreckage.

The first hour, you encouraged each other.
The second hour, you got lost.
The third hour, ${getLocalizedRoleTitle('sales', 'en')} collapsed.

You tried to continue, but the blizzard swallowed everything.

Two days later, you froze to death less than a kilometer from the wreckage.

The rescue team found the wreckage on day 10.
${survivors.length > 0 ? 'Those who stayed behind were rescued.' : 'But everyone was already dead.'}

You chose selfishness.
But in desperate times, the team is the only hope.`;
      } else {
        return `You can't hold on anymore.

Cold, hunger, pain... they've finally caught up to you.

Your last consciousness is ${survivors.length > 0 ? `${getLocalizedRoleTitle(survivors[0].roleId, 'en')}'s shouting: "Wake up! Don't sleep!"` : 'the howl of wind and snow'}.

But you can no longer hear it.

${state.beaconProgress === 100 ? `Ironically, the beacon was repaired the day after your death.
When the rescue team arrived, others were rescued.
Only you, forever buried in the snow.` : state.stressClock < 8 ? `Your sacrifice was not meaningless.
Your rational decisions kept the team united.
${survivors.length > 0 ? 'They will remember you.' : 'But in the end, no one survived.'}` : `The team collapsed rapidly after your death.
Three days later, no one survived.`}`;
      }
    },
  },
};

// 获取本地化的结局描述
export function getLocalizedEndingDescription(endingType: string, state: any, lang: Language): string {
  const description = endingDescriptions[endingType as keyof typeof endingDescriptions];
  if (!description) return '';

  return description[lang as 'zh' | 'en'] ? description[lang as 'zh' | 'en'](state) : '';
}
