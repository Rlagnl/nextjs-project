---
name: "create-scene"
description: "Creates a new scene file in src/scenes directory that extends GameScene. Invoke when user wants to add a new scene to the Phaser 3 project."
---

# 创建场景技能

此技能用于在 Phaser 3 项目的 `/src/scenes` 目录中创建新的场景文件。

## 使用方法

当需要创建新的场景文件时调用此技能。

## 功能特性

- 在 `/src/scenes` 目录中创建新的 TypeScript 文件
- 文件名格式：`[Name]Scene.ts`
- 自动继承 `GameScene`
- 包含必需的 `init` 和 `create` 方法
- 如果未指定名称，自动生成随机场景名

## 使用示例

指定场景名称：
- "Create a new scene called MyScene"
- "Generate a scene file named PlayerScene"
- "创建一个名为 MyScene 的文件"

随机生成场景名称：
- "Create a new scene"
- "Add a new scene to the project"
- "创建一个新场景"

## 文件结构

生成的文件具有以下结构：

```typescript
import GameScene from '@/scenes/GameScene'

export default class [Name]Scene extends GameScene {
	public constructor($config) {
		super($config)
	}

	public init($data): void {
		// 初始化逻辑
	}

	public create($data): void {
		super.create($data)
		// 创建场景内容
	}
}
```

## 实现说明

- 技能会检查用户请求中是否提供了场景名称
- 如果没有提供名称，会使用形容词和名词的组合生成随机名称
- 文件将创建在 `/src/scenes` 目录中
- 生成的类继承自 `GameScene`
- 包含 `init` 和 `create` 方法
