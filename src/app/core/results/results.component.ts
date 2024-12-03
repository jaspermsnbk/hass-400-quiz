import { Component, input, OnInit, Signal } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { log } from '../../shared/util/general.util';
import { ResultVector } from '../../shared/models/quiz.model';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { getMinDistLeader } from '../../shared/util/vector.util';
import { Leader } from '../../shared/models/leader.model';

@Component({
  selector: 'app-results',
  imports: [MatCardModule, MatProgressBarModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {

  resultsVecSig?: Signal<ResultVector>
  visualResultsVecSig?: Signal<ResultVector>
  closestLeader?: Signal<Leader | null>
  dist = 0
  constructor(private dbService:DbService) {}
  
  ngOnInit(): void {
    log("results page", this.dbService.resultVector())
    this.resultsVecSig = this.dbService.resultVector
    this.visualResultsVecSig = this.dbService.visualResultVector
    this.closestLeader = this.dbService.closestLeader


    if(this.resultsVecSig !== undefined && this.resultsVecSig() !== undefined && this.dbService.leaders && this.dbService.leaders()){
      console.log(this.dbService.leaders());
      console.log(this.resultsVecSig()) 
      const res = getMinDistLeader(this.dbService.leaders(), this.resultsVecSig())
      if(!res){
        console.log("error occured in finding closest leader");
        return
      }
      this.dbService.setClosestLeader(res.leader)
      this.dist = res.dist
      console.log(this.closestLeader());
      console.log(this.dist);
    }
  }

}
