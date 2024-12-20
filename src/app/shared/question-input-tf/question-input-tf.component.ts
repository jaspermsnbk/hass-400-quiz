import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { log } from '../util/general.util';
import { POSRANGEMAX } from '../util/penv.util';

@Component({
  selector: 'app-question-input-tf',
  imports: [MatRadioModule],
  templateUrl: './question-input-tf.component.html',
  styleUrl: './question-input-tf.component.scss'
})
export class QuestionInputTfComponent {
  vals = [-POSRANGEMAX, 0, POSRANGEMAX]

  @Input() leftText?: string = "disagree"
  @Input() rightText?: string = "agree"
  @Output() scoreChange = new EventEmitter<number>();
  @ViewChild("radio", {static:true}) radioGroup!: ElementRef<MatRadioGroup>;

  ngOnInit(): void {
    log(this.radioGroup);
  }

  updateScore(newScore: number){
    this.scoreChange.emit(newScore)
  }
}
