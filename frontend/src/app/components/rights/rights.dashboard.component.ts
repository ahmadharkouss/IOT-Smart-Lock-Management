import { Component, viewChild , OnInit} from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { DoorGroup } from "../../interfaces/responses/doorGroup.response.interface";
import { DoorGroupComponent } from "./door-group/door-group.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import {MatMenuModule} from '@angular/material/menu';
import { DoorGroupService } from "../../services/door/door-group.service";

import { CreateDoorGroupDialogComponent  } from "../../../app/components/rights/dialogs/doorGroup/create-door-group.dialog/create-door-group.dialog.component";
import { CreateDoorDialogComponent } from "./dialogs/door/create-door.dialog/create-door.dialog.component";
import { ListDoorsPopupComponent } from "./popups/door/list-doors.popup/list-doors.popup.component";
@Component({
  selector: 'app-rights.dashboard',
  standalone: true,
  imports: [ MatAccordion, MatIconModule, DoorGroupComponent, MatButtonModule, MatCardModule, MatMenuModule],
  templateUrl: './rights.dashboard.component.html',
  styleUrl: './rights.dashboard.component.less'
})
export class RightsDashboardComponent implements OnInit {

  reloadTrigger : boolean = false;
  accordion = viewChild.required(MatAccordion);
  doorGroupsIds: number[] = [];

  constructor(private doorGroupService: DoorGroupService, public dialog: MatDialog) {}



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDoorGroupsIds();
    
  }


  getDoorGroupsIds(): void {
    this.doorGroupService.getDoorGroupIds().subscribe({
      next: (data: number[]) => {
        this.doorGroupsIds = data;
        console.log("Door group ids:", data);
      },
      error: (error) => {
        console.log("Error:", error);
      },
    });
  }

  createDoorGroup(): void {
    const dialogRef = this.dialog.open(CreateDoorGroupDialogComponent, {
      width: 'auto',
    });

    dialogRef.componentInstance.doorCreated.subscribe(() => {
      this.getDoorGroupsIds();
    }
    );
  }


  createDorDIalog(): void {
     this.dialog.open(CreateDoorDialogComponent, {
      width: 'auto',
    });


  }


  openListDoorsPopup(): void {
    const dialogRef = this.dialog.open(ListDoorsPopupComponent, {
      maxWidth: '800px',
      maxHeight: '800px',
      height: '700px',
      width: '100%',
    });

    dialogRef.componentInstance.doorUpdated.subscribe(() => {
      console.log('Door Manag Closed');
      this.reloadTrigger = !this.reloadTrigger;
    }
    );
  }


}
