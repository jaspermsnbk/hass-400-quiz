import { Component, OnInit } from "@angular/core";
import { calculateQuiz, DEVMODE, resetQuiz } from "../../shared/util/quiz.util";
import { hogwartsHouseQuiz } from "../../shared/quizes/hogwarts.quiz";
import { Question, ResultQuiz } from "../../shared/models/quiz.model";
import { QuestionComponent } from "../../shared/question/question.component";
import {MatButtonModule} from '@angular/material/button';
import { log } from "../../shared/util/general.util";

@Component({
  selector: "app-quiz",
  imports: [QuestionComponent, MatButtonModule],
  templateUrl: "./quiz.component.html",
  styleUrl: "./quiz.component.scss",
})
export class QuizComponent implements OnInit {
  DEVMODE=DEVMODE
  //maybe get quiz from a service??
  QUIZ = hogwartsHouseQuiz;
  resQuiz!: ResultQuiz;
  
  ngOnInit(): void {
    this.resQuiz = resetQuiz(this.QUIZ);
  }

  handleSubmit($event: MouseEvent){
    log(this.resQuiz)
    log(calculateQuiz(this.resQuiz))
  }
  updateScore($score: number, cI: number, qI: number){
    this.resQuiz.resCategories[cI].resQuestions[qI].score = $score
  }
}
