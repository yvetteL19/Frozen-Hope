// 检查所有事件的consequences和description是否匹配

const fs = require('fs');
const path = require('path');

const files = [
  './src/data/events-act1.ts',
  './src/data/events-act2.ts',
  './src/data/events-act3.ts'
];

const issues = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  let currentEvent = null;
  let currentChoice = null;
  let inConsequences = false;
  let consequencesStart = 0;
  let consequencesContent = [];

  lines.forEach((line, index) => {
    // 检测事件开始
    if (line.includes("id: 'act")) {
      const match = line.match(/id: '([^']+)'/);
      if (match) currentEvent = match[1];
    }

    // 检测choice id
    if (line.includes("id: '") && currentEvent) {
      const match = line.match(/id: '([^']+)'/);
      if (match && match[1].length < 20) {
        currentChoice = match[1];
      }
    }

    // 检测consequences开始
    if (line.includes('consequences: {')) {
      inConsequences = true;
      consequencesStart = index;
      consequencesContent = [];
    }

    if (inConsequences) {
      consequencesContent.push(line);

      // 检测consequences结束
      if (line.includes('},') && !line.includes('consequences: {')) {
        const consequencesText = consequencesContent.join('\n');

        // 检查是否提到"全员"但缺少npcHP
        if (consequencesText.includes('全员') && consequencesText.includes('HP')) {
          const hasNpcHP = consequencesText.includes('npcHP:');
          const hasPlayerHP = consequencesText.includes('playerHP:');

          if (!hasNpcHP && consequencesText.match(/全员.*HP/)) {
            issues.push({
              file: path.basename(file),
              event: currentEvent,
              choice: currentChoice,
              line: consequencesStart + 1,
              issue: '描述提到"全员HP"但缺少npcHP数组',
              snippet: consequencesText.substring(0, 200)
            });
          }
        }

        // 检查是否提到"其他人"但缺少npcHP
        if (consequencesText.includes('其他') && consequencesText.includes('HP')) {
          const hasNpcHP = consequencesText.includes('npcHP:');

          if (!hasNpcHP) {
            issues.push({
              file: path.basename(file),
              event: currentEvent,
              choice: currentChoice,
              line: consequencesStart + 1,
              issue: '描述提到"其他人HP"但缺少npcHP数组',
              snippet: consequencesText.substring(0, 200)
            });
          }
        }

        inConsequences = false;
      }
    }
  });
});

console.log('=== 发现的问题 ===\n');
issues.forEach((issue, i) => {
  console.log(`问题 ${i + 1}:`);
  console.log(`  文件: ${issue.file}`);
  console.log(`  事件: ${issue.event}`);
  console.log(`  选项: ${issue.choice}`);
  console.log(`  行号: ${issue.line}`);
  console.log(`  问题: ${issue.issue}`);
  console.log(`  片段: ${issue.snippet.replace(/\n/g, ' ').substring(0, 150)}...`);
  console.log('');
});

console.log(`总计发现 ${issues.length} 个问题`);
