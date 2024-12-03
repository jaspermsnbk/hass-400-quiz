import { computed, inject, Injectable, signal } from '@angular/core';
import { Quiz, ResultQuiz, ResultVector } from '../models/quiz.model';
import { hogwartsHouseQuiz } from '../data/quizes/hogwarts.quiz';
import { Leader } from '../models/leader.model';
import { HttpClient } from '@angular/common/http';
// import json
@Injectable({
  providedIn: 'root'
})
export class DbService {
  resultVector = signal<ResultVector>(new ResultVector())
  visualResultVector = computed(() => {
    return new ResultVector(this.resultVector().details.map((cr)=>{
      console.log(Math.round(cr.score * 100));
      return {...cr, score: Math.round(cr.score * 100)}
    }))
  })
  // resultQuiz = signal<ResultQuiz>(resultQuizFromQuiz(this.QUIZ))
  quiz = signal<Quiz>(hogwartsHouseQuiz)
  leaders = signal<Leader []>([])
  
  constructor(private http: HttpClient) { 
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
