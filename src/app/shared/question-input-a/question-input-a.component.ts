import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question-input-a',
  imports: [],
  templateUrl: './question-input-a.component.html',
  styleUrl: './question-input-a.component.scss'
})
export class QuestionInputAComponent {
  @Input() leftText?: string = "disagree"
  @Input() rightText?: string = "agree"

  @Input() score!: number;
  @Output() scoreChange = new EventEmitter<number>();

  updateScore(newScore: number){
    this.score = newScore;
    this.scoreChange.emit(this.score)
  }
}
