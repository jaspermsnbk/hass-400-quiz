import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import { DEVMODE } from '../util/quiz.util';
import { log } from '../util/general.util';

@Component({
  selector: 'app-question-input-a',
  imports: [MatRadioModule],
  templateUrl: './question-input-a.component.html',
  styleUrl: './question-input-a.component.scss'
})
export class QuestionInputAComponent implements OnInit{

  @Input() leftText?: string = "disagree"
  @Input() rightText?: string = "agree"
  vals = [-2, -1, 0, 1, 2]
  @Output() scoreChange = new EventEmitter<number>();

  @ViewChild("radio", {static:true}) radioGroup!: ElementRef<MatRadioGroup>;

  ngOnInit(): void {
    log(this.radioGroup);
  }

  updateScore(newScore: number){
    this.scoreChange.emit(newScore)
  }

  pickRandVal(){
    if(DEVMODE){
      const tempIdx = Math.floor(Math.random() * 5)
      return this.vals[tempIdx]
    }
    return 0
  }
}
