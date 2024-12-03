import { Leader } from "../models/leader.model";
import { ResultVector } from "../models/quiz.model";
import { log } from "./general.util";

export function basicDist(lhs: ResultVector, rhs: ResultVector) {
  rhs.basic.reduce((acc, num, i) => acc + Math.abs(num - lhs.basic[i]), 0);
}

//this dist allows for difference in quiz version and out of order result vectors
export function detailedDist(lhs: ResultVector, rhs: ResultVector) {
  console.log(lhs, rhs);
  
  return rhs.details.reduce((acc, cr, i) => {
    const lhsDetail = lhs.details[i];
    if (cr.title !== lhsDetail.title) {
      const temp = lhs.details.find((t) => t.title === cr.title);
      if (!temp) {
        throw new Error("incompatable vectors");
      }
      acc += normDist(temp.score, temp.maxScore, cr.score, cr.maxScore);
    }
    acc += normDist(lhsDetail.score, lhsDetail.maxScore, cr.score, cr.maxScore);
    log(acc)
    return acc;
  }, 0);
}

//normailize each score and get diff
export function normDist(s1: number, sm1: number, s2: number, sm2: number) {
  return Math.abs(s1 / (2 * sm1) - s2 / (2 * sm2));
}

export function getMinDistLeader(leaders: Leader [], resVect: ResultVector){
  console.log(leaders);
  if(leaders.length === 0) return undefined
  let minLeader = leaders[0]
  let minDist = detailedDist(leaders[0].resVect, resVect)
  leaders.forEach((l) => {
    if(detailedDist(l.resVect, resVect) > minDist){
      minLeader = l
    }
  })
  return {leader: minLeader, dist: minDist}
}