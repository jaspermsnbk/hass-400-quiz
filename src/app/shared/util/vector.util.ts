import { ResultVector } from "../models/quiz.model";
import { log } from "./general.util";

export function basicDist(lhs: ResultVector, rhs: ResultVector) {
  rhs.basic.reduce((acc, num, i) => acc + Math.abs(num - lhs.basic[i]), 0);
}

//this dist allows for difference in quiz version and out of order result vectors
export function detailedDist(lhs: ResultVector, rhs: ResultVector) {
  return rhs.details.reduce((acc, cr, i) => {
    const lhsDetail = lhs.details[i];
    if (cr.title !== lhsDetail.title) {
      const temp = lhs.details.find((t) => t.title === cr.title);
      if (!temp) {
        console.log();
        
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
