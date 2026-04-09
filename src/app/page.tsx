import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* 导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Logo"
              width={80}
              height={18}
              priority
            />
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">登录</Link>
          </Button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pt-16">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          {/* 标题 */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            开始构建你的
            <span className="block text-muted-foreground">下一个项目</span>
          </h1>

          {/* 描述 */}
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            基于 Next.js + TypeScript + Tailwind CSS 构建的现代化应用。
            快速、安全、可扩展。
          </p>

          {/* 按钮组 */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/login">
                开始使用
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/vercel/next.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
          © 2024 Next.js App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
