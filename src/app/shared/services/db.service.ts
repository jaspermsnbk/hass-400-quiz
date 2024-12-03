import { computed, inject, Injectable, signal } from '@angular/core';
import { Quiz, ResultQuiz, ResultVector } from '../models/quiz.model';
import { hogwartsHouseQuiz } from '../data/quizes/hogwarts.quiz';
import { Leader } from '../models/leader.model';
import { HttpClient } from '@angular/common/http';
import { resultQuizFromQuiz } from '../util/quiz.util';
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
  resQuiz = signal<ResultQuiz>(resultQuizFromQuiz(this.quiz()))

  constructor(private http: HttpClient) { 
    console.log("here");
    
    const tempRes = localStorage.getItem("resultVector");
    if(tempRes){
      this.resultVector.set(JSON.parse(tempRes) as ResultVector)
    }

    this.loadQuizFromJson("./assets/Extremist-and-Cult-Leader-Commonality-Quiz.json");
    this.loadLeadersFromJson("./assets/leaders.json");
  }

  setResultVector(resVec: ResultVector){
    localStorage.setItem("resultVector", JSON.stringify(resVec))
    this.resultVector.set(resVec)
  }

  loadQuizFromJson(path: string) {
    this.http.get(path).subscribe((res) => {
      console.log(res as Quiz);
      this.quiz.set(res as Quiz);
      this.resQuiz.set(resultQuizFromQuiz(this.quiz()))
      console.log(this.quiz());
      
    });
  }

  loadLeadersFromJson(path: string){
    this.http.get(path).subscribe((res) => {
      console.log(res as Leader []);
      this.leaders.set((res as Leader []).map((l) => {
        const tempL = l
        tempL.resVect = new ResultVector(tempL.resVect.details)
        return tempL
      }))
      console.log(this.leaders());
    });
  }
}
