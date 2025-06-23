import { Component, Output, EventEmitter, Inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms';


import {User} from '../../../../interfaces/responses/user.response.interface';
import {UserService} from '../../../../services/user/user.service';
import {UserGroupUserRequest} from '../../../../interfaces/requests/transactions/userGroupUser.request.interface';
import {GroupTransactionService} from '../../../../services/transaction/group.transaction.service';
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
  selector: 'app-add-userto-group.dialog',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule, ReactiveFormsModule,
    MatDatepickerModule, CommonModule, MatSelectModule
  ],
  templateUrl: './add-userto-group.dialog.component.html',
  styleUrl: './add-userto-group.dialog.component.less'
})
export class AddUsertoGroupDialogComponent implements OnInit{


  @Output() userGroupUpdated: EventEmitter<void> = new EventEmitter<void>();

  users: User[] = [];
  MoveUsertoUserGroupForm: FormGroup = new FormGroup({});
  constructor(private userService: UserService, private groupTransactionService: GroupTransactionService,
    public  dialogRef : MatDialogRef<AddUsertoGroupDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: { userGroupId: number, userGroupName: string}
  ) {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error("Error fetching users:", error);
      }
    });
  }

  ngOnInit() {
    this.MoveUsertoUserGroupForm = new FormGroup({
      id_user : new FormControl('', [Validators.required]),
      validity: new FormControl('', [Validators.required]) 
    });
  }


onSubmit() : void {
  if (this.MoveUsertoUserGroupForm.valid) {
    var userGroupUserRequest: UserGroupUserRequest  = { 
      id_user : this.MoveUsertoUserGroupForm.value.id_user,
      id_usergroup: this.data.userGroupId,
      validity: this.MoveUsertoUserGroupForm.value.validity
    };
    this.groupTransactionService.addUserToGroup(userGroupUserRequest).subscribe({
      next: () => {
        this.userGroupUpdated.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        console.error("Error adding user to group:", error);
      }
    });
  }
}

  OnCancel() : void {
    this.dialogRef.close();
  }

}
