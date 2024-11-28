import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import { log } from '../util/general.util';
import { DEVMODE } from '../util/penv.util';

@Component({
  selector: 'app-question-input-a',
  imports: [MatRadioModule],
  templateUrl: './question-input-a.component.html',
  styleUrl: './question-input-a.component.scss'
})
export class QuestionInputAComponent implements OnInit{
  vals = [-2, -1, 0, 1, 2]

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
