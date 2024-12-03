import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../models/quiz.model';
import {MatCardModule} from '@angular/material/card';
import { QuestionInputAComponent } from "../question-input-a/question-input-a.component";
import { QuestionInputTfComponent } from '../question-input-tf/question-input-tf.component';

@Component({
  selector: 'app-question',
  imports: [MatCardModule, QuestionInputAComponent, QuestionInputTfComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() question!: Question;

  // @Input() score: number = 0;
  @Output() scoreChange = new EventEmitter<number>();

  updateScore(newScore: number){
    // this.score = newScore;
    this.scoreChange.emit(newScore)
  }
}
