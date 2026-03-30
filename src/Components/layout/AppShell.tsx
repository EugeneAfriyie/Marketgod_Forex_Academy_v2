import { Outlet } from "react-router-dom";

interface AppShellProps {
  title: string;
  description: string;
}

export default function AppShell({ title, description }: AppShellProps) {
  return (
    <main className="min-h-screen bg-mg-dark-bg px-6 py-10 text-mg-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-mg-gold/20 bg-white/5 p-6 backdrop-blur-sm">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-mg-gold">Marketgod Platform</p>
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-mg-dark-textSecondary md:text-base">{description}</p>
        </div>
        <Outlet />
      </div>
    </main>
  );
}
