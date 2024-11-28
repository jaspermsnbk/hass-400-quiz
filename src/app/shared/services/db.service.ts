import { Injectable, signal } from '@angular/core';
import { ResultQuiz, ResultVector } from '../models/quiz.model';
import { hogwartsHouseQuiz } from '../quizes/hogwarts.quiz';
import { resultQuizFromQuiz } from '../util/quiz.util';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  // QUIZ = hogwartsHouseQuiz //this is where the quiz is set

  resultVector = signal<ResultVector>(new ResultVector())
  // resultQuiz = signal<ResultQuiz>(resultQuizFromQuiz(this.QUIZ))

  constructor() { }

}
