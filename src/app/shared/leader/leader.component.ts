import { Component, Input } from "@angular/core";
import { Leader } from "../models/leader.model";

@Component({
  selector: "app-leader",
  imports: [],
  templateUrl: "./leader.component.html",
  styleUrl: "./leader.component.scss",
})
export class LeaderComponent {
  @Input() leader!: Leader;
  @Input() dist?: number;
  round = (number: number) => (Math.round(number * 100) / 100);
}
