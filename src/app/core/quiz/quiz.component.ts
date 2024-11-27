import { Component, OnInit } from "@angular/core";
import { resetQuiz } from "../../shared/util/quiz.util";
import { hogwartsHouseQuiz } from "../../shared/quizes/hogwarts.quiz";
import { ResultQuiz } from "../../shared/models/quiz.model";
import { QuestionComponent } from "../../shared/question/question.component";

@Component({
  selector: "app-quiz",
  imports: [QuestionComponent],
  templateUrl: "./quiz.component.html",
  styleUrl: "./quiz.component.scss",
})
export class QuizComponent implements OnInit {
  //maybe get quiz from a service??
  QUIZ = hogwartsHouseQuiz;
  resQuiz!: ResultQuiz;
  
  ngOnInit(): void {
    this.resQuiz = resetQuiz(this.QUIZ);

  }
}
