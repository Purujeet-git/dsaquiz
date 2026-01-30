export const LEVELS = [
    {level: 1,minXP: 0,title:"Beginner"},
    {level: 2,minXP: 50,title:"Learner"},
    {level: 3,minXP: 120,title:"Problem Solver"},
    {level: 4,minXP: 250,title:"DSA Explorer"},
    {level: 5,minXP: 450,title:"Algorithm Thinker"},
    {level: 6,minXP: 700,title:"Interview Ready"},
    {level: 7,minXP: 1000,title:"DSA Master"}
];

export function getLevelFromXP(totalXP) {
    let current = LEVELS[0];

    for(const lvl of LEVELS){
        if(totalXP > lvl.minXP) {
            current = lvl;
        }else{
            break;
        }
    }

    return current;
}