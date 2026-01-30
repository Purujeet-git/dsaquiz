export default function CompletionBanner({rewardGranted}) {
    return(
        <div className="p-4 rounded bg-green-100 border border-green-300">
            <h2 className="font-bold text-green-800">
                🎉 Daily Quest Completed!
            </h2>
            <p className="text-sm text-green-700 mt-1">
                {rewardGranted
                ?"You earned your daily bonus XP."
                :"Come back tomorrow for a new quest!"}
            </p>
        </div>
    );
}