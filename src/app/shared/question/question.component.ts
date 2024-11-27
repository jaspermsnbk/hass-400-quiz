import { Component, Input } from '@angular/core';
import { Question } from '../models/quiz.model';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-question',
  imports: [MatCardModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() question!: Question;
}
