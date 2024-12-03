import { Component, input, OnInit, Signal } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { log } from '../../shared/util/general.util';
import { ResultVector } from '../../shared/models/quiz.model';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { detailedDist, getMinDistLeader } from '../../shared/util/vector.util';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Leader } from '../../shared/models/leader.model';

@Component({
  selector: 'app-results',
  imports: [MatCardModule, MatProgressBarModule, HttpClientModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {

  resultsVecSig?: Signal<ResultVector>
  visualResultsVecSig?: Signal<ResultVector>
  closestLeader?: Leader
  dist = 0
  constructor(private dbService:DbService, private http: HttpClient) {}
  
  ngOnInit(): void {
    log("results page", this.dbService.resultVector())
    this.resultsVecSig = this.dbService.resultVector
    this.visualResultsVecSig = this.dbService.visualResultVector
    if(this.resultsVecSig !== undefined && this.resultsVecSig() !== undefined && this.dbService.leaders && this.dbService.leaders()){
      console.log(this.dbService.leaders());
      console.log(this.resultsVecSig()) 
      const res = getMinDistLeader(this.dbService.leaders(), this.resultsVecSig())
      if(!res){
        console.log("error occured in finding closest leader");
        return
      }
      this.closestLeader = res.leader
      this.dist = res.dist
      console.log(this.closestLeader);
      console.log(this.dist);
    }
  }


}
