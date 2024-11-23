import { Routes } from "@angular/router";
import { TestComponent } from "./core/test/test.component";
import { HomeComponent } from "./core/home/home.component";

export const routes: Routes = [
  { path: "test", component: TestComponent },
  { path: "", component: HomeComponent },
];
