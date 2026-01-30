import Link from "next/link";

export default function TopicCard({ topic, progress, unlocked }) {
  return (
    <div
      className={`relative rounded-xl border p-6 transition-all
        ${
          unlocked
            ? "bg-white hover:shadow-lg"
            : "bg-gray-100 opacity-60"
        }`}
    >
      {!unlocked && (
        <div className="absolute top-4 right-4 text-lg">🔒</div>
      )}

      <div className="text-3xl mb-3">{topic.icon}</div>

      <h3 className="text-xl font-semibold">{topic.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {topic.description}
      </p>

      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-black h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {progress}% completed
        </p>
      </div>

      <div className="mt-5">
        {unlocked ? (
          <Link
            href={`/topics/${topic.id}`}
            className="inline-block text-sm font-medium text-white bg-black px-4 py-2 rounded-lg"
          >
            Continue →
          </Link>
        ) : (
          <p className="text-xs text-gray-500">
            Complete previous topics to unlock
          </p>
        )}
      </div>
    </div>
  );
}
