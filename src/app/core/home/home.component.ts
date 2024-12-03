import { AfterViewInit, Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { ResearchProcessComponent } from "../research-process/research-process.component";
import { DbService } from "../../shared/services/db.service";
import { LeaderComponent } from "../../shared/leader/leader.component";
import {ChangeDetectionStrategy, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DisclaimerComponent } from "../disclaimer/disclaimer.component";
@Component({
  selector: "app-home",
  imports: [
    MatButtonModule,
    RouterModule,
    ResearchProcessComponent,
    ResearchProcessComponent,
    LeaderComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  constructor(public dbService: DbService) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.openDialog()
    },2050)
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DisclaimerComponent );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
