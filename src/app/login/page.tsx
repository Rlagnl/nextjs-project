import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { login, signup } from "@lib/supabase/actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* 导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-6">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="size-4" />
              回到首页
            </Link>
          </Button>
        </div>
      </header>

      {/* 登录表单 */}
      <main className="flex flex-1 items-center justify-center px-6 pt-16">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">欢迎回来</CardTitle>
            <CardDescription>请登录您的账户以继续</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  邮箱
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  密码
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="请输入密码"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button formAction={login} className="w-full">
                  登录
                </Button>
                <Button
                  formAction={signup}
                  variant="outline"
                  className="w-full"
                >
                  注册账户
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="#"
                className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                忘记密码？
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* 页脚 */}
      <footer className="border-t py-6">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
          © 2024 Next.js App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
