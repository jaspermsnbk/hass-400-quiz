import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-question-input-a',
  imports: [MatRadioModule],
  templateUrl: './question-input-a.component.html',
  styleUrl: './question-input-a.component.scss'
})
export class QuestionInputAComponent {
  @Input() leftText?: string = "disagree"
  @Input() rightText?: string = "agree"

  @Input() score!: number;
  @Output() scoreChange = new EventEmitter<number>();

  updateScore(newScore: number){
    console.log(newScore)
    this.score = newScore;
    this.scoreChange.emit(this.score)
  }
}
