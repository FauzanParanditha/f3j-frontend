import DurationSelector from "@/components/Duration Selector";
import ModeSelector from "@/components/ModeSelector";
import ScoreForm from "@/components/ScoreForm";
import ScoreTable from "@/components/ScoreTable";
import TimerControls from "@/components/TimerControls";
import WorkingTimeStatus from "@/components/WorkTimeStatus";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">F3J Flight Timer</h1>
      <div className="w-full max-w-2xl space-y-6">
        <ModeSelector />
        <DurationSelector />
        <WorkingTimeStatus />
        {/* <TimerDisplay /> */}
        <TimerControls />
        <ScoreForm />
        <ScoreTable />
      </div>
    </main>
  );
}
