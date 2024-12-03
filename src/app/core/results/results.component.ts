import { Component, input, OnInit, Signal } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { log } from '../../shared/util/general.util';
import { ResultVector } from '../../shared/models/quiz.model';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Leader } from '../../shared/models/leader.model';
import { leaders } from '../../shared/data/leaders/leader.data';
import { detailedDist } from '../../shared/util/vector.util';

@Component({
  selector: 'app-results',
  imports: [MatCardModule, MatProgressBarModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {

  resultsVecSig?: Signal<ResultVector>
  closestLeader?: Leader

  constructor(private dbService:DbService) {}
  
  ngOnInit(): void {
      log("results page", this.dbService.resultVector())
      this.resultsVecSig = this.dbService.resultVector
      if(this.resultsVecSig !== undefined && this.resultsVecSig() !== undefined){
        // log( this.resultsVecSig())
        // leaders.forEach((l) => {
        //   log("dist: ", detailedDist(this.dbService.resultVector(), l.resVect))
        // })
      }
  }


}
