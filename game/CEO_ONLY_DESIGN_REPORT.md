# 👔 CEO-Only 游戏设计报告

**设计日期**: 2025年11月23日
**设计意图**: 简化游戏体验，专注CEO领导力决策
**执行者**: Claude Code

---

## 🎯 设计概述

经过讨论，确认游戏设计为**CEO-Only**模式：
- 玩家只能选择CEO角色进行游戏
- 其他5个角色（Programmer, Assistant, Guide, Pilot, Sales）固定为NPC
- 专注于CEO的领导力、决策和认知偏误体验

---

## 🏗️ 当前实现状态

### ✅ 已实现的CEO-Only设计

**1. 角色选择系统**
```typescript
// src/data/roles.ts
export const PLAYABLE_ROLES: Record<PlayableRoleType, Role> = {
  ceo: { /* CEO配置 */ },
  // 只有CEO是可玩的
};

export const NPC_ROLES: Record<NPCRoleType, Role> = {
  programmer: { /* NPC配置 */ },
  assistant: { /* NPC配置 */ },
  guide: { /* NPC配置 */ },
  pilot: { /* NPC配置 */ },
  sales: { /* NPC配置 */ },
};
```

**2. 事件系统**
- ✅ 事件文件中保留所有`roleSpecific`选项（虽然存在但不会显示）
- ✅ `getAvailableChoices()`函数正确过滤角色专属选项
- ✅ 只有当前玩家角色（CEO）的选项会被显示
- ✅ 非CEO的`roleSpecific`选项永远不会出现在选择列表中

**3. 游戏体验**
- ✅ 角色选择界面只显示CEO（因为`PLAYABLE_ROLES`只有CEO）
- ✅ 游戏过程中只显示CEO的技能选项
- ✅ 所有其他角色都是NPC，有自己的HP、状态和关系

---

## 📊 游戏平衡

### 当前选择结构
每个事件平均有 **3-4个选择**：

1. **A选项** - trap类型（认知陷阱）
2. **B选项** - rational类型（理性选择）
3. **CEO_SKILL** - skill类型（CEO专属技能）
4. **可选的CEO_SKILL_TRAP** - 技能陷阱选项

### 技能系统
- **CEO技能**: `command`（指挥）
  - 消耗: `stress: 2`
  - 作用: 强制终止争论，做出领导决策
  - 出现频率: 约50%的事件有CEO技能选项

---

## 🎮 游戏流程

### Day 1-3 (Act 1)
- 事件聚焦生存基础
- CEO学习使用指挥技能
- 建立团队关系

### Day 4-7 (Act 2)
- 事件复杂度增加
- 认知偏误更隐蔽
- 团队动态变化

### Day 8-10 (Act 3)
- 高压力决策
- 团队关系考验
- 生存或崩溃结局

---

## ✅ 代码完整性

### 保留的非CEO角色选项
事件文件中仍存在非CEO的`roleSpecific`选项：
```
grep "roleSpecific:" src/data/events-act*.ts | wc -l
# 结果: 约50个选项
```

**为什么保留？**
1. **代码一致性** - 保持事件数据完整性
2. **未来扩展** - 如需支持多角色，可直接启用
3. **文档价值** - 展示完整的游戏设计
4. **无副作用** - 这些选项永远不会显示给玩家

### NPC系统
```typescript
// NPC状态管理
npcs: [
  { roleId: 'programmer', alive: true, hp: 100, mentalState: 'calm', ... },
  { roleId: 'assistant', alive: true, hp: 100, mentalState: 'calm', ... },
  // ... 其他NPC
]
```

---

## 🎯 设计优势

### 1. 专注的游戏体验
- ✅ 单一角色，深度体验
- ✅ 聚焦CEO的领导力挑战
- ✅ 认知偏误学习更集中

### 2. 简化的开发维护
- ✅ 角色选择界面简洁
- ✅ 不需要平衡6个角色的难度
- ✅ 技能系统简单清晰

### 3. 教学价值
- ✅ 突出领导力决策的重要性
- ✅ 展示认知偏误对CEO的影响
- ✅ 团队管理的人性层面

---

## 📈 统计数据

| 指标 | 数量 |
|------|------|
| 可玩角色 | 1个 (CEO) |
| NPC角色 | 5个 |
| 总事件数 | 27个 |
| CEO技能选项 | ~13个事件有CEO技能 |
| 平均每事件选择数 | 3-4个 |

---

## ✅ 验证结果

### 构建测试
```bash
npm run build
# ✅ 通过
# ✓ 66 modules transformed
# ✓ built in 925ms
```

### 功能测试
- ✅ 角色选择只显示CEO
- ✅ 游戏进程正常
- ✅ 事件选项正确显示
- ✅ CEO技能可以正常使用
- ✅ NPC状态正确管理

---

## 💡 结论

**CEO-Only设计已完成并正常工作！**

游戏专注于CEO的领导力决策体验，通过27个精心设计的事件，让玩家在极端环境下体验认知偏误对决策的影响。代码结构清晰，游戏平衡良好，无需进一步修改。

---

**设计状态**: ✅ 完成
**代码状态**: ✅ 健康
**测试状态**: ✅ 通过
**推荐**: 可以部署到生产环境
