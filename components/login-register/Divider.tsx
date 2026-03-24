export function Divider({ label = "hoặc" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-stone-800" />
      <span className="text-xs text-stone-600 uppercase tracking-widest">{label}</span>
      <div className="h-px flex-1 bg-stone-800" />
    </div>
  );
}
