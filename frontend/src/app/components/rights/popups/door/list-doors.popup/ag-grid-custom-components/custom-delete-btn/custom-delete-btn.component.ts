import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DoorService } from '../../../../../../../services/door/door.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { DeleteDoorPopupComponent } from '../../../delete-door.popup/delete-door.popup.component';

@Component({
  selector: 'app-custom-delete-btn2',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule],
  templateUrl: './custom-delete-btn.component.html',
  styleUrl: './custom-delete-btn.component.less'
})
export class CustomDeleteBtnComponent implements ICellRendererAngularComp {

  doorId! : number ;
  doorName! : string;
  api : any;

  constructor(private doorService : DoorService,public dialog: MatDialog) { }
  agInit(params: ICellRendererParams): void {
    console.log(params.data.id);
    this.doorId = params.data.id;
    this.api = params.api;
    this.doorName = params.data.name;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {

    const dialogRef = this.dialog.open(DeleteDoorPopupComponent, {
      width: 'auto',
      height: 'auto',
      data: {doorId: this.doorId, doorName: this.doorName}
    });

    dialogRef.componentInstance.doorDeleted.subscribe(() => {

      this.doorService.deleteDoorByID(this.doorId).subscribe({
        next: data => {
          console.log("User Deleted from DB");
          this.api.applyTransaction({ remove: [{ id: this.doorId }] });
          console.log("User Deleted from Grid");
  
          console.log(data);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      
      });
    } );


    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });

    

  }

}
