import { Routes } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { QuizComponent } from "./core/quiz/quiz.component";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "quiz", component: QuizComponent },
  { path: "**", component: PageNotFoundComponent }
];
