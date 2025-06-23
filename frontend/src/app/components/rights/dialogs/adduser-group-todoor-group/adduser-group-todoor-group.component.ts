import { Component, Output, EventEmitter, Inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms';


import { UserGroup } from '../../../../interfaces/responses/userGroup.response.interface';
import { UserGroupService } from '../../../../services/user/user-group.service';
import { GroupTransactionService } from '../../../../services/transaction/group.transaction.service';
import { UserGroupDoorGroupRequest } from '../../../../interfaces/requests/transactions/userGroup-doorGroup.request.interface';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-adduser-group-todoor-group',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule, ReactiveFormsModule,
    MatDatepickerModule, CommonModule, MatSelectModule
  ],
  templateUrl: './adduser-group-todoor-group.component.html',
  styleUrl: './adduser-group-todoor-group.component.less'
})
export class AdduserGroupTodoorGroupComponent {

  

  userGroups: UserGroup[] = [];
  MoveUserGrouptoDoorGroupForm: FormGroup = new FormGroup({});
  constructor(private userGroupService: UserGroupService, private groupTransactionService: GroupTransactionService,
    public  dialogRef : MatDialogRef<AdduserGroupTodoorGroupComponent>,@Inject(MAT_DIALOG_DATA) public data: { doorGroupId: number, doorGroupName: string}
  ) {
    this.userGroupService.getUserGroups().subscribe({
      next: (data: UserGroup[]) => {
        this.userGroups = data;
      },
      error: (error) => {
        console.error("Error fetching user groups:", error);
      }
    });
  }

  ngOnInit() {
    this.MoveUserGrouptoDoorGroupForm = new FormGroup({
      userGroup: new FormControl('', [Validators.required]),
      validity: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    const userGroupDoorGroupRequest: UserGroupDoorGroupRequest = {
      id_usergroup: this.MoveUserGrouptoDoorGroupForm.value.userGroup,
      id_doorgroup: this.data.doorGroupId,
      validity: this.MoveUserGrouptoDoorGroupForm.value.validity
    };

    this.groupTransactionService.addUserGroupToDoorGroup(userGroupDoorGroupRequest).subscribe({
      next: (data) => {
        console.log("User group added to door group successfully" + data);
        this.dialogRef.close();
      },
      error: (error) => {
        console.error("Error adding user group to door group:", error);
      }
    });
  }

  OnCancel() {
    this.dialogRef.close();
  }

}
