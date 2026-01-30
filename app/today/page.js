import ProgressBar from "@/components/ProgressBar";
import ProblemCard from "@/components/ProblemCard";
import CompletionBanner from "@/components/CompletionBanner";


async function getTodayDate() {
    const res = await fetch("http://localhost:3000/api/quests/today",{
        headers: {
            "x-user-id": "6952716a34d4d7d807fbde9b"
        },
        cache: "no-store",
    });

    return res.json();
}

export default async function TodayPage () {
    const data = await getTodayDate();

    if(!data.success){
        return(
            <div className="p-8 text-red-500">
                Failed to load today's quest
            </div>
        );
    }

    const {
        todayCompleted,
        progress,
        quest,
        user,
        rewards,
    } = data;

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Today</h1>
                    <p className="text-sm text-gray-500"> 
                        Level {user.level} . {user.title}
                    </p>
                </div>

                <div className="text-sm text-gray-600">
                    🔥 Streak: {user.streakCount}
                </div>
            </header>

            <ProgressBar
                completed={progress.completed}
                total={progress.total}
                percentage={progress.percentage}
            />

            <section className="space-y-4">
                {quest.problems.map((problem)  => (
                    <ProblemCard
                    
                        key={problem.quizTag}
                        problem={problem}
                        disabled={todayCompleted}
                    />
                ))}
            </section>

            {todayCompleted && (
                <CompletionBanner rewardGranted={rewards.rewardGranted} />
            )}
        </main>
    );

}