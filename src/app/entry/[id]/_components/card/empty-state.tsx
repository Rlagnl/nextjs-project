export function EmptyState() {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
      <div className="space-y-2">
        <div className="font-medium">暂无数据</div>
        <div className="text-sm text-muted-foreground">
          你可以返回首页重新发起查询。
        </div>
      </div>
    </div>
  );
}

