import { Routes } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { QuizComponent } from "./core/quiz/quiz.component";

export const routes: Routes = [
  { path: "quiz", component: QuizComponent },
  { path: "", component: HomeComponent },
];
