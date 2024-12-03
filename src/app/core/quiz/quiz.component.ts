import { Component, computed, OnInit, signal, Signal } from "@angular/core";
import { calculateQuiz, resultQuizFromQuiz } from "../../shared/util/quiz.util";
import { Question, Quiz, ResultQuiz } from "../../shared/models/quiz.model";
import { QuestionComponent } from "../../shared/question/question.component";
import { MatButtonModule } from "@angular/material/button";
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
  DEVMODE = DEVMODE;
  //maybe get quiz from a service??
  QUIZ = hogwartsHouseQuiz;
  quizSig = signal<Quiz>(hogwartsHouseQuiz);
  resQuiz = signal<ResultQuiz>(resultQuizFromQuiz(hogwartsHouseQuiz));
  // resQuizComputed = computed(() => {
  //   const resQuizTemp = resultQuizFromQuiz(this.quizSig());
  //   this.resQuiz.set(resQuizTemp)
  //   return resQuizTemp
  // });

  constructor(
    private router: Router,
    private dbService: DbService,
    private http: HttpClient
  ) {}

  loadQuizFromJson(path: string) {
    this.http.get(path).subscribe((res) => {
      console.log(res as Quiz);
      this.quizSig.set(res as Quiz);
      this.resQuiz.set(resultQuizFromQuiz(this.quizSig()))
    });
  }

  ngOnInit(): void {
    this.loadQuizFromJson("./assets/Extremist-Leader-Commonality-Quiz.json");
    this.quizSig = this.dbService.quiz;
    console.log(this.resQuiz());

    // this.resQuiz = resultQuizFromQuiz(this.QUIZ);
  }

  handleSubmit($event: MouseEvent) {
    console.log(this.resQuiz());

    if (!this.resQuiz || !this.resQuiz()) return;
    const resultVec = calculateQuiz(this.resQuiz() as ResultQuiz);
    log(this.resQuiz);
    log(resultVec);
    console.log(this.dbService.resultVector());

    this.dbService.setResultVector(resultVec);
    this.router.navigate(["results"]);
  }
  updateScore($score: number, cI: number, qI: number) {
    const temp = {...this.resQuiz()}
    temp.resCategories[cI].resQuestions[qI].score = $score
    this.resQuiz.set(temp)
  }
}
