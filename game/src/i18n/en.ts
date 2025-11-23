// English translations
export const enTranslations: Record<string, string> = {
  // General
  'app.title': 'Frozen Hope',
  'app.version': 'v1.0 | A survival decision game exploring cognitive biases',

  // Start screen
  'start.description': 'A private plane crashes deep in the snowy mountains.\nSix survivors, -30°C blizzard, ten days of life or death.\nAs the team leader, can you see through cognitive traps and lead everyone to safety?',
  'start.play': 'Start Game',
  'start.tip': 'Tip: Every choice has a cost, there are no perfect answers',
  'start.howToPlay': 'How to Play',
  'start.guide1': '📖 Read the scenario and understand the current dilemma',
  'start.guide2': '🎯 Choose from multiple options ([Skill] options cost HP)',
  'start.guide3': '⚠️ Watch out for cognitive traps! Reasonable choices may be biases',
  'start.guide4': '❤️ Manage HP and stress - they determine survival',
  'start.winCondition': 'Win Condition',
  'start.winDesc': 'Repair the beacon (≥80%) to trigger rescue, or survive 10 days until the storm ends',
  'start.loseCondition': 'Lose Condition',
  'start.loseDesc': 'Your HP reaches zero, or stress clock hits 15 causing team collapse',

  // Character select (deprecated, kept for compatibility)
  'select.title': 'Ready to Begin',
  'select.description': 'You will play as the company CEO, leading your team to survive in desperate circumstances.',
  'select.age': 'Age',
  'select.difficulty': 'Difficulty',
  'select.skill': 'Skill',
  'select.cost': 'Cost',
  'select.hp': 'HP',
  'select.stress': 'Stress',
  'select.choose': 'Choose This Character',
  'select.back': 'Back',
  'select.yearsOld': ' years old',

  // Game screen
  'game.day': 'Day {{day}}',
  'game.dayLabel': 'Day',
  'game.yourHP': 'Your HP',
  'game.stressClock': 'Stress Clock',
  'game.beaconProgress': 'Beacon Progress',
  'game.perfectStreak': 'Perfect Streak',
  'game.streakReward': '{{count}} more',
  'game.peakState': 'Peak Performance!',
  'game.loading': 'Loading next event...',
  'game.teamStatus': 'Team Status',
  'game.dead': 'Deceased',
  'game.skillCostHP': 'HP Cost',
  'game.skillCostStress': 'Stress Cost',

  // NPC states
  'npc.calm': 'Calm',
  'npc.agitated': 'Agitated',
  'npc.panicked': 'Panicked',

  // Ending screen
  'ending.viewReplay': 'View Psychological Review',
  'ending.restart': 'Start Over',

  // Replay screen
  'replay.title': 'Your Psychological Review',
  'replay.description': 'Review the cognitive traps and perfect decisions from your survival journey',
  'replay.result': 'Game Result',
  'replay.day': 'Days Survived',
  'replay.days': 'days',
  'replay.finalHP': 'Final HP',
  'replay.beaconProgress': 'Beacon Progress',
  'replay.cognitiveTraps': 'Cognitive Traps',
  'replay.noTraps': 'You didn\'t fall into any cognitive traps throughout your survival!',
  'replay.perfectRationalist': '🎉 Perfect Rationalist 🎉',
  'replay.clickToLearn': 'Click on a trap to view detailed analysis',
  'replay.perfectDecisions': 'Perfect Decisions',
  'replay.noPerfect': 'No perfect decisions recorded.',
  'replay.dayChoice': 'Day {{day}} | Your choice: {{choice}}',
  'replay.teamFinalStatus': 'Team Final Status',
  'replay.stressHistory': 'Stress History',
  'replay.backToEnding': 'Back to Ending',
  'replay.newGame': 'Start Over',
  'replay.definition': 'Definition',
  'replay.whyHappens': 'Why does it happen?',
  'replay.inGame': 'In-game manifestation',
  'replay.realCases': 'Real-world examples',
  'replay.howToDetect': 'How to detect it?',
  'replay.close': 'Close',

  // Role names
  'role.ceo': 'CEO',
  'role.programmer': 'Programmer',
  'role.assistant': 'Assistant',
  'role.guide': 'Guide',
  'role.pilot': 'Pilot',
  'role.sales': 'Sales Director',

  // Role occupations
  'role.ceo.occupation': 'Tech Company CEO',
  'role.programmer.occupation': 'Senior Programmer',
  'role.assistant.occupation': 'Administrative Assistant',
  'role.guide.occupation': 'Mountain Guide',
  'role.pilot.occupation': 'Pilot',
  'role.sales.occupation': 'Sales Director',

  // Role descriptions
  'role.ceo.description': 'Accustomed to giving orders, he tries to control everything in a crisis. His decisions may bring unity or cause division.',
  'role.programmer.description': 'Strong logical thinking, good at analyzing problems. But under extreme pressure, he may over-rely on data and ignore humanity.',
  'role.assistant.description': 'Careful and observant, she is the team\'s peacemaker. She can spot details others miss.',
  'role.guide.description': 'Experienced outdoor expert, key to team survival. But his overconfidence sometimes brings danger.',
  'role.pilot.description': 'Calm and professional, limited mobility after injury. His technical knowledge may be key to rescue.',
  'role.sales.description': 'Good at persuasion and manipulation, may become a threat when resources are scarce. His charm masks a selfish nature.',

  // Skill names
  'skill.command': 'Command',
  'skill.repair': 'Repair',
  'skill.firstAid': 'First Aid',
  'skill.wildernessWisdom': 'Wilderness Wisdom',
  'skill.mechanicalKnowledge': 'Mechanical Knowledge',
  'skill.negotiation': 'Negotiation',

  // Skill descriptions
  'skill.command.description': 'Force a decision, ignoring others\' objections',
  'skill.repair.description': 'Repair damaged equipment, increase rescue probability',
  'skill.firstAid.description': 'Treat injured teammates, restore HP',
  'skill.wildernessWisdom.description': 'Use environmental knowledge to find resources or avoid danger',
  'skill.mechanicalKnowledge.description': 'Analyze plane wreckage to find useful parts',
  'skill.negotiation.description': 'Persuade or manipulate others to accept your plan',

  // Audio control
  'audio.title': 'Audio Settings',
  'audio.master': 'Master Volume',
  'audio.sfx': 'Sound Effects',
  'audio.music': 'Background Music',
  'audio.tip': 'Right-click the volume button to open this panel',
  'audio.mute': 'Click to mute | Right-click for settings',
  'audio.unmute': 'Click to unmute | Right-click for settings',

  // UI status displays
  'ui.failed': 'Failed',
  'ui.streakStar': '⭐{{count}}',
  'ui.hpHeart': '❤️',
  'ui.energyBolt': '⚡',
  'ui.dangerWarning': '⚠️',
  'ui.dead': '💀',
  'ui.maxStress': '15',

  // Streak rewards
  'streak.reward3': '3 Streak! All HP +10',
  'streak.reward5': '5 Streak! Stress -2',
  'streak.reward7': '7 Streak! Beacon +10%',

  // Ending titles
  'ending.rescue.title': 'Rescued!',
  'ending.survival.title': 'Survived',
  'ending.bitter_victory.title': 'Bitter Victory',
  'ending.collapse.title': 'Team Collapse',
  'ending.your_end.title': 'Your End',
};
