# 项目 AI 规则

## 技术栈

- nextjs + TypeScript + shadcn ui + tailwind css
- 工具：ESLint + Prettier
- 禁止：`any`、`// @ts-ignore`、直接操作 DOM

# 代码风格

- 组件：PascalCase（例如 `Button.tsx`）
- 文件：kebab-case（例如 `user-profile.ts`）
- 命名：新定义的 `interface` 命名必须以 `I` 开头，新定义的 `type` 命名必须以 `Type` 结尾
- 缩进：2 空格，分号必须
- 类型：显式返回类型，`Props` 必须使用 `interface`
- `Props` 需要先解构再使用，例如：`const { children } = props;`

# 路径引用规范

- 所有文件引用必须使用绝对路径（例如 `@/scenes/GameScene`），禁止使用相对路径（例如 `./GameScene`）
- 绝对路径基于 `tsconfig.ts` 中的 alias 配置：

# 网络请求与数据服务封装

- 禁止在组件中（尤其是 Client Component）直接编写 `fetch(...)` 等网络请求细节。
- 需要发起网络请求时，必须将请求封装为函数放到 `@services` 目录下的恰当文件中（按“读/写”“server/client”边界划分），组件只调用服务函数。
- 若服务函数只能在服务端使用（依赖 `server-only`、`next/headers` 等），必须放到 `@services/server`（或同等明确的 server-only 文件）并避免被 Client Component 引用。

# 与 AI 协作（通用需求描述规则）

当你希望 AI 一次性把需求做到位，请尽量用“**最终形态 + 约束 + 验收标准**”来描述，而不是只描述过程。

## 必须包含

- **最终目录结构/文件清单**：明确要新增/移动/拆分的文件路径（最好用树形列表），并注明每个文件的职责边界。
- **职责边界**：尤其是“数据获取在哪一层”“状态/副作用在哪一层”“组件是否必须为 Server/Client Component”等必须写死。
- **不可更改的约束**：例如必须使用 shadcn/ui、必须保持某些 API 形态、禁止引入新依赖、禁止改动某目录等。
- **验收标准**：例如 TS/ESLint 必须为 0、视觉/交互必须包含哪些区块、每个文件不超过 N 行、必须保留现有功能点等。

## 提醒机制（默认行为）

当你提出“重构/拆分/迁移/改造/重新设计”等需求，但未提供以上任意一项信息时，AI 必须先提醒你补齐缺失项（给出最小补充清单/模板），再开始实施改动，避免反复迭代。

## 推荐写法（模板）

```text
目标：<一句话说明最终效果>

最终结构（必须一致）：
- <path1>：<职责>
- <path2>：<职责>

边界规则（必须遵守）：
- 数据获取：<放在何处/禁止放在何处>
- 组件形态：<Server/Client、是否允许 hooks>
- 路径引用：必须绝对路径（按 tsconfig alias）

验收标准：
- TS/ESLint：0 报错
- UI/功能：<必须存在的 UI 区块/行为>
```
