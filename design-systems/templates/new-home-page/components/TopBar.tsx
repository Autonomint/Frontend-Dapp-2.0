export function TopBar() {
  return (
    <div className="flex justify-between items-center mb-7 px-1">
      <div className="flex items-center gap-2.5 font-serif font-medium text-[20px] tracking-tight">
        <span className="brand-mark inline-flex w-7 h-7 rounded-full bg-ink items-center justify-center relative">
          <span className="absolute w-3 h-[1.5px] bg-white rotate-[-45deg]" />
        </span>
        Nondollar <em className="not-italic-fix italic font-normal text-muted ml-1">/ options</em>
      </div>

      <div className="flex gap-[26px] items-center text-[13px] text-muted">
        <span className="ticker font-mono text-[11px] tracking-[0.04em] text-ink bg-white px-2.5 py-1.5 rounded-full border border-line inline-flex gap-2 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1d8a4a] shadow-[0_0_0_3px_rgba(29,138,74,0.18)]" />
          Markets open · NYSE
        </span>
        <a href="#" className="text-muted hover:text-ink transition-colors">Docs</a>
        <a href="#" className="text-muted hover:text-ink transition-colors">About</a>
      </div>
    </div>
  );
}
