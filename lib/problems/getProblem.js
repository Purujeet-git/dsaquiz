import { PROBLEMS_BY_TOPIC_AND_DIFFICULTY } from "./problemRegistry";


export function getProblem(topicId,difficulty,problemId) {
    const problems =PROBLEMS_BY_TOPIC_AND_DIFFICULTY?.[topicId]?.[difficulty];
    
    if(!problems) return null;

    return problems.find((p) => p.id === problemId || null);
};