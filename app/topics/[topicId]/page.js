import { notFound } from "next/navigation";
import TopicDetailClient from "./topic-detail-client";
import { connectDB } from "@/lib/db";
import Topic from "@/models/Topic";

export default async function TopicDetailPage({ params }) {
  const { topicId } = await params;

  await connectDB();

  const topic = await Topic.findOne({
    topicId,
    isActive:true,
  }).select("topicId title description");

  
  if (!topic) notFound();

  return <TopicDetailClient topic={{
    title:topic.title,
    description:topic.description,
  }} topicId={topicId} />;
}
