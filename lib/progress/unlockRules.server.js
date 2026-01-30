export const EASY_TO_MEDIUM_THRESHOLD = 0.8;
export const MEDIUM_TO_HARD_THRESHOLD = 0.7;


export function isMediumUnlocked(easyCompleted, easyTotal) {
    if(easyTotal === 0) return false;
    return easyCompleted / easyTotal >= EASY_TO_MEDIUM_THRESHOLD;
}

export function isHardUnlocked(mediumCompleted, mediumTotal){
    if(mediumTotal === 0) return false;
    return mediumCompleted/mediumTotal >= MEDIUM_TO_HARD_THRESHOLD;
}