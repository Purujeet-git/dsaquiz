import Topic from "@/models/Topic";

export async function getTopicWithNext(topicId){
    const topic = await Topic.findOne({topicId,isActive:true});
    if(!topic) return null;

    const nextTopic = await Topic.findOne({
        order: {$gt: topic.order},
        isActive:true,
    }).sort({order:1});

    return { topic, nextTopic };
}