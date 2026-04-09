import * as fs from 'fs'
import * as path from 'path'

/**
 * Task 接口定义
 */
interface ITask {
  input: string
  workspace: {
    uri: {
      fsPath: string
    }
  }
}

/**
 * 创建场景文件的 skill 实现
 */
export default async function createScene($task: ITask) {
  const { input, workspace } = $task
  const projectRoot = workspace.uri.fsPath
  const scenesDir = path.join(projectRoot, 'src', 'scenes')
  
  // 提取场景名称
  let sceneName = extractSceneName(input)
  
  // 如果没有指定名称，生成随机名称
  if (!sceneName) {
    sceneName = generateRandomSceneName()
  }
  
  // 确保场景名称符合规范
  sceneName = sceneName.charAt(0).toUpperCase() + sceneName.slice(1)
  if (!sceneName.endsWith('Scene')) {
    sceneName += 'Scene'
  }
  
  const fileName = `${sceneName}.ts`
  const filePath = path.join(scenesDir, fileName)
  
  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    return {
      code: 400,
      message: `场景文件 ${fileName} 已存在`
    }
  }
  
  // 创建文件内容
  const fileContent = generateSceneFileContent(sceneName)
  
  // 写入文件
  fs.writeFileSync(filePath, fileContent)
  
  return {
    code: 200,
    message: `成功创建场景文件 ${fileName}`,
    data: {
      filePath,
      sceneName
    }
  }
}

/**
 * 从输入中提取场景名称
 */
function extractSceneName(input: string): string | null {
  // 匹配英文 "called X" 或 "named X" 模式
  let match = input.match(/(?:called|named)\s+(\w+)/i)
  if (match && match[1]) {
    return match[1]
  }
  
  // 匹配中文 "名为X" 或 "叫X" 模式
  match = input.match(/(?:名为|叫)\s*([\w]+)/)
  if (match && match[1]) {
    return match[1]
  }
  
  return null
}

/**
 * 生成随机场景名称
 */
function generateRandomSceneName(): string {
  const adjectives = ['Happy', 'Brave', 'Clever', 'Swift', 'Mighty', 'Bright', 'Calm', 'Eager', 'Fierce', 'Gentle']
  const nouns = ['Hero', 'Warrior', 'Explorer', 'Guardian', 'Champion', 'Adventurer', 'Knight', 'Wizard', 'Ranger', 'Warrior']
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  
  return `${adjective}${noun}Scene`
}

/**
 * 生成场景文件内容
 */
function generateSceneFileContent(sceneName: string): string {
  return `import GameScene from '@/scenes/GameScene'

export default class ${sceneName} extends GameScene {
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
}`
}