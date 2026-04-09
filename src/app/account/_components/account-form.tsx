"use client";

import { useCallback, useEffect, useState } from "react";
import type { JwtPayload } from "@supabase/supabase-js";
import { createClient } from "@lib/supabase/client";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { Skeleton } from "@components/ui/skeleton";
import Avatar from "@/account/_components/avatar";

interface IAccountFormProps {
  claims: JwtPayload | null;
}

export default function AccountForm(props: IAccountFormProps) {
  const { claims } = props;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      if (!claims?.sub) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("user_id", claims.sub)
        .maybeSingle();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (_error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [claims, supabase]);

  useEffect(() => {
    getProfile();
  }, [claims, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      if (!claims?.sub) {
        alert("You must be logged in to update your profile");
        return;
      }

      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        user_id: claims.sub,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (_error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 pt-24 pb-8">
      <Card>
        <CardHeader>
          <CardTitle>个人资料</CardTitle>
          <CardDescription>管理您的个人信息和账户设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 头像区域 */}
          <div className="flex flex-col items-center space-y-4">
            {loading ? (
              <Skeleton className="h-[150px] w-[150px] rounded-full" />
            ) : (
              <Avatar
                uid={claims?.sub ?? null}
                url={avatar_url}
                size={150}
                onUpload={(url: string) => {
                  setAvatarUrl(url);
                  updateProfile({
                    fullname,
                    username,
                    website,
                    avatar_url: url,
                  });
                }}
              />
            )}
          </div>

          <Separator />

          {/* 表单字段 */}
          <div className="space-y-4">
            {/* 邮箱 */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                邮箱
              </label>
              <input
                id="email"
                type="text"
                value={claims?.email ?? ""}
                disabled
                className="flex h-9 w-full rounded-md border border-input bg-muted px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* 全名 */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                全名
              </label>
              <input
                id="fullName"
                type="text"
                value={fullname || ""}
                onChange={(e) => setFullname(e.target.value)}
                disabled={loading}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* 用户名 */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                用户名
              </label>
              <input
                id="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* 网站 */}
            <div className="space-y-2">
              <label
                htmlFor="website"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                网站
              </label>
              <input
                id="website"
                type="url"
                value={website || ""}
                onChange={(e) => setWebsite(e.target.value)}
                disabled={loading}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            disabled={loading || !claims?.sub}
            className="w-full sm:w-auto"
          >
            {loading ? "加载中..." : "更新资料"}
          </Button>
          <form
            action="/auth/signout"
            method="post"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              type="submit"
              className="w-full sm:w-auto"
            >
              退出登录
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
