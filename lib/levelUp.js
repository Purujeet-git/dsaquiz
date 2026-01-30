import { getLevelFromXP } from "./levels";

export function detectLevelUp(prevXP, nextXP) {
    const before = getLevelFromXP(prevXP);
    const after = getLevelFromXP(nextXP);
    
    
    return{
        leveledUp:after.level > before.level,
        from:before.level,
        to:after.level,
        title:after.level,
    };
}