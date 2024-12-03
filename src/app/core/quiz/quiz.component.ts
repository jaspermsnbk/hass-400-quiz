import { Component, computed, OnInit, signal, Signal } from "@angular/core";
import { calculateQuiz, resultQuizFromQuiz } from "../../shared/util/quiz.util";
import { Question, Quiz, ResultQuiz, ResultVector } from "../../shared/models/quiz.model";
import { QuestionComponent } from "../../shared/question/question.component";
import { MatButtonModule } from "@angular/material/button";
import { log, shuffle } from "../../shared/util/general.util";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { DbService } from "../../shared/services/db.service";
import { DEVMODE } from "../../shared/util/penv.util";
import { hogwartsHouseQuiz } from "../../shared/data/quizes/hogwarts.quiz";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Leader } from "../../shared/models/leader.model";

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
  questions = computed<Question []>(() => {
    const arr = []
    for (let catId = 0; catId < this.quizSig().categories.length; catId++){
      for (let qId = 0; qId < this.quizSig().categories[catId].questions.length; qId++){
        arr.push({
          ...this.quizSig().categories[catId].questions[qId],
          qId,
          catId
        })
      }
    }
    console.log(arr);
    return shuffle(arr)
  })
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

  loadLeadersFromJson(path: string){
    this.http.get(path).subscribe((res) => {
      console.log(res as Leader []);
      this.dbService.leaders.set((res as Leader []).map((l) => {
        const tempL = l
        tempL.resVect = new ResultVector(tempL.resVect.details)
        return tempL
      }))
      console.log(this.dbService.leaders());

    });
  }

  ngOnInit(): void {
    this.loadQuizFromJson("./assets/Extremist-and-Cult-Leader-Commonality-Quiz.json");
    this.loadLeadersFromJson("./assets/leaders.json");
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
