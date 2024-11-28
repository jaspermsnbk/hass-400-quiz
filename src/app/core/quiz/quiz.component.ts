import { Component, OnInit } from "@angular/core";
import { calculateQuiz, resultQuizFromQuiz } from "../../shared/util/quiz.util";
import { hogwartsHouseQuiz } from "../../shared/quizes/hogwarts.quiz";
import { Question, ResultQuiz } from "../../shared/models/quiz.model";
import { QuestionComponent } from "../../shared/question/question.component";
import {MatButtonModule} from '@angular/material/button';
import { log } from "../../shared/util/general.util";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { DbService } from "../../shared/services/db.service";
import { DEVMODE } from "../../shared/util/penv.util";

@Component({
  selector: "app-quiz",
  imports: [QuestionComponent, MatButtonModule, RouterModule],
  templateUrl: "./quiz.component.html",
  styleUrl: "./quiz.component.scss",
})
export class QuizComponent implements OnInit {
  DEVMODE=DEVMODE
  //maybe get quiz from a service??
  QUIZ = hogwartsHouseQuiz;
  resQuiz!: ResultQuiz;
  
  constructor(private router: Router, private dbService: DbService) {}

  ngOnInit(): void {
    this.resQuiz = resultQuizFromQuiz(this.QUIZ);
  }

  handleSubmit($event: MouseEvent){
    const resultVec = calculateQuiz(this.resQuiz)
    log(this.resQuiz)
    log(resultVec)
    console.log(this.dbService.resultVector());
    
    this.dbService.resultVector.set(resultVec)
    this.router.navigate(['results'])
  }
  updateScore($score: number, cI: number, qI: number){
    this.resQuiz.resCategories[cI].resQuestions[qI].score = $score
  }
}
