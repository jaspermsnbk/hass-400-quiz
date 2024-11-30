import { Injectable, signal } from '@angular/core';
import { ResultQuiz, ResultVector } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  resultVector = signal<ResultVector>(new ResultVector())
  // resultQuiz = signal<ResultQuiz>(resultQuizFromQuiz(this.QUIZ))

  constructor() { 
    const tempRes = localStorage.getItem("resultVector");
    if(tempRes){
      this.resultVector.set(JSON.parse(tempRes) as ResultVector)
    }
  }

  setResultVector(resVec: ResultVector){
    localStorage.setItem("resultVector", JSON.stringify(resVec))
    this.resultVector.set(resVec)
  }
}
