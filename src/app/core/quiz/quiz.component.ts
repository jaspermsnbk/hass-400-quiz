import { Component, OnInit, signal, Signal } from "@angular/core";
import { calculateQuiz, resultQuizFromQuiz } from "../../shared/util/quiz.util";
import { Question, Quiz, ResultQuiz } from "../../shared/models/quiz.model";
import { QuestionComponent } from "../../shared/question/question.component";
import {MatButtonModule} from '@angular/material/button';
import { log } from "../../shared/util/general.util";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { DbService } from "../../shared/services/db.service";
import { DEVMODE } from "../../shared/util/penv.util";
import { hogwartsHouseQuiz } from "../../shared/data/quizes/hogwarts.quiz";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-quiz",
  imports: [QuestionComponent, MatButtonModule, RouterModule, HttpClientModule],
  templateUrl: "./quiz.component.html",
  styleUrl: "./quiz.component.scss",
})
export class QuizComponent implements OnInit {
  DEVMODE=DEVMODE
  //maybe get quiz from a service??
  QUIZ = hogwartsHouseQuiz;
  quizSig = signal<Quiz>(hogwartsHouseQuiz);
  resQuiz!: ResultQuiz;
  
  constructor(private router: Router, private dbService: DbService, private http: HttpClient) {}

  loadQuizFromJson(path: string){
    this.http.get(path).subscribe((res) => {
      console.log(res as Quiz);
      this.quizSig.set(res as Quiz)
    })
  }
  ngOnInit(): void {
    this.loadQuizFromJson("./assets/Extremist-Leader-Commonality-Quiz.json")
    this.resQuiz = resultQuizFromQuiz(this.QUIZ);
    this.quizSig = this.dbService.quiz
  }

  handleSubmit($event: MouseEvent){
    const resultVec = calculateQuiz(this.resQuiz)
    log(this.resQuiz)
    log(resultVec)
    console.log(this.dbService.resultVector());
    
    this.dbService.setResultVector(resultVec)
    this.router.navigate(['results'])
  }
  updateScore($score: number, cI: number, qI: number){
    this.resQuiz.resCategories[cI].resQuestions[qI].score = $score
  }
}
