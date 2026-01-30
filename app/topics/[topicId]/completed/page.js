import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { getTopicWithNext } from "@/lib/getTopicWithNext";
import AutoRedirect from "@/components/AutoRedirect";

export default async function TopicCompletedPage({ params }) {
  const { topicId } = await params;

  await connectDB();

  const result = await getTopicWithNext(topicId);
  if (!result) notFound();

  const { topic, nextTopic } = result;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold mb-2">
          Topic Completed!
        </h1>

        <p className="text-gray-600 mb-6">
          You’ve successfully completed all questions in{" "}
          <span className="font-semibold">{topic.title}</span>.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">
            What you mastered
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Core concepts of {topic.title}</li>
            <li>Problem-solving patterns</li>
            <li>Time & space complexity thinking</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          {nextTopic ? (
            <Link
              href={`/topics/${nextTopic.topicId}`}
              className="bg-black text-white py-2 rounded-lg font-medium"
            >
              Start {nextTopic.title} →
            </Link>
          ) : (
            <Link
              href="/topics"
              className="bg-black text-white py-2 rounded-lg font-medium"
            >
              View All Topics →
            </Link>
          )}

          <p className="text-xs text-gray-500">
            You’ll be redirected automatically…
          </p>
        </div>
      </div>

      {nextTopic && (
        <AutoRedirect nextUrl={`/topics/${nextTopic.topicId}`} />
      )}
    </div>
  );
}
