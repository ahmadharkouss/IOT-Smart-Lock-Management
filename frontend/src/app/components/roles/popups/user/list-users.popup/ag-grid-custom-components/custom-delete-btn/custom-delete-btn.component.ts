import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import   {UserService} from '../../../../../../../services/user/user.service';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { DeleteUserPopupComponent } from '../../../delete-user.popup/delete-user.popup.component';

@Component({
  selector: 'app-custom-delete-btn',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule],
  templateUrl: './custom-delete-btn.component.html',
  styleUrl: './custom-delete-btn.component.less'
})
export class CustomDeleteBtnComponent implements ICellRendererAngularComp {

  userId! : number ;
  userName! : string;
  api : any;

  constructor(private userService: UserService,public dialog: MatDialog) { }
  agInit(params: ICellRendererParams): void {
    console.log(params.data.id);
    this.userId = params.data.id;
    this.api = params.api;
    this.userName = params.data.name;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {

    const dialogRef = this.dialog.open(DeleteUserPopupComponent, {
      width: 'auto',
      height: 'auto',
      data: {userId: this.userId, userName: this.userName}
    });

    dialogRef.componentInstance.userDeleted.subscribe(() => {

      this.userService.deleteUserByID(this.userId).subscribe({
        next: data => {
          console.log("User Deleted from DB");
          this.api.applyTransaction({ remove: [{ id: this.userId }] });
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
