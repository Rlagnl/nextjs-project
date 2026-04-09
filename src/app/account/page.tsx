import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AccountForm from "@/account/_components/account-form";
import { Button } from "@components/ui/button";
import { createClient } from "@lib/supabase/server";

export default async function Account() {
  const supabase = await createClient();
  const res = await supabase.auth.getClaims();
  const claimsData = res.data;

  return (
    <div className="container mx-auto px-4">
      <div className="flex min-h-screen flex-col">
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
        <AccountForm claims={claimsData?.claims ?? null} />
      </div>
    </div>
  );
}
