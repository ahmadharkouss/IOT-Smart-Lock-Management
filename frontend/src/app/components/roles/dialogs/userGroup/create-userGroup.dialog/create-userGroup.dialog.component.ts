import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserGroup } from '../../../../../interfaces/responses/userGroup.response.interface';
import { UserGroupRequest } from '../../../../../interfaces/requests/userGroup.request.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserGroupService } from '../../../../../services/user/user-group.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-group.dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , ReactiveFormsModule],
  templateUrl: './create-userGroup.dialog.component.html',
  styleUrl: './create-userGroup.dialog.component.less'
})
export class CreateUserGroupDialogComponent implements OnInit {
  constructor( @Inject(UserGroupService) private userGroupService: UserGroupService,
  public  dialogRef : MatDialogRef<CreateUserGroupDialogComponent> 
) {}

  CreateGroupForm: FormGroup = new FormGroup({});
  @Output() userGroupCreated: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.CreateGroupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.CreateGroupForm.valid) {
      //maybe useless test 
      var userGroupRequest: UserGroupRequest = { 
        name: this.CreateGroupForm.value.name
      };
      this.userGroupService.createUserGroup(userGroupRequest).subscribe({
        next: (data: UserGroup) => {
          console.log("Group created successfully:", data);
          this.userGroupCreated.emit(); // Emit event to parent component
          this.dialogRef.close();
          
        },
        error: (error) => {
          console.error("Error creating group:", error);
        }
      });
    }
  }
  OnCancel() {
    this.dialogRef.close();
  }

}
