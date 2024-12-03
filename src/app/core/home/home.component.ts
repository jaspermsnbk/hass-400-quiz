import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { ResearchProcessComponent } from "../research-process/research-process.component";
@Component({
  selector: "app-home",
  imports: [
    MatButtonModule,
    RouterModule,
    ResearchProcessComponent,
    ResearchProcessComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  constructor() {}
}
