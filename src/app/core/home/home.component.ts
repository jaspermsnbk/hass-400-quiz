import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { ResearchProcessComponent } from "../research-process/research-process.component";
import { DbService } from "../../shared/services/db.service";
import { LeaderComponent } from "../../shared/leader/leader.component";
@Component({
  selector: "app-home",
  imports: [
    MatButtonModule,
    RouterModule,
    ResearchProcessComponent,
    ResearchProcessComponent,
    LeaderComponent
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  constructor(public dbService: DbService) {}
}
