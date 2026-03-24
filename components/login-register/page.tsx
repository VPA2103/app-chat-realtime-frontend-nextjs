import { AuthCard } from "./AuthCard";

export default function AuthPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-950 px-4 py-12">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Radial glow top-right */}
        <div className="absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-3xl" />
        {/* Radial glow bottom-left */}
        <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-stone-400) 1px, transparent 1px),
                              linear-gradient(90deg, var(--color-stone-400) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <AuthCard />
    </main>
  );
}
