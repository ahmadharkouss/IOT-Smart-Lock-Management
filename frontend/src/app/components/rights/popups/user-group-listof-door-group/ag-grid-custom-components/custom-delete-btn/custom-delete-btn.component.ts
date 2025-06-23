import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { UserGroupDoorGroupRequest } from '../../../../../../interfaces/requests/transactions/userGroup-doorGroup.request.interface';
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
import { GroupTransactionService } from '../../../../../../services/transaction/group.transaction.service';

@Component({
  selector: 'app-custom-delete-btn3',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule],
  templateUrl: './custom-delete-btn.component.html',
  styleUrl: './custom-delete-btn.component.less'
})
export class CustomDeleteBtnComponent implements ICellRendererAngularComp {

  userGroupId! : number ;
  doorGroupId! : number;
  api : any;

  constructor(private groupTransactionService: GroupTransactionService,) { }
  agInit(params: ICellRendererParams): void {
    console.log(params);
    this.userGroupId= params.data.id;
    this.api = params.api;
    this.doorGroupId =Number(params.valueFormatted);

  
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {

    var request: UserGroupDoorGroupRequest = {
      id_usergroup: this.userGroupId,
      id_doorgroup: this.doorGroupId,
      validity: new Date()
    };
    console.log(request);

    this.groupTransactionService.deleteUserGroupToDoorGroup(request).subscribe({

      next: data => {
        console.log("UserGroup-DoorGroup Deleted from DB");
        this.api.applyTransaction({ remove: [{ id: this.userGroupId }] });
        console.log("UserGroup-DoorGroup Deleted from Grid");
        console.log(data);
      },
      error: error => {
        console.log("Error in UserGroup-DoorGroup Deletion");
        console.log(error);
      }
    });
    

    

  }

}
