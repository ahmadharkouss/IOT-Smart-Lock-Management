import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserGroup } from '../../../../../interfaces/responses/userGroup.response.interface';
import { UserGroupPatchRequest } from '../../../../../interfaces/requests/userGroup.request.interface';
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
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-update-user-group.dialog',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule, ReactiveFormsModule],
  templateUrl: './update-user-group.dialog.component.html',
  styleUrl: './update-user-group.dialog.component.less'
})
export class UpdateUserGroupDialogComponent implements OnInit {

  UpdateGroupForm: FormGroup = new FormGroup({});
  @Output() userGroupUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor( private userGroupService: UserGroupService,
  public  dialogRef : MatDialogRef<UpdateUserGroupDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { userGroupId: number, userGroupName: string},
  private cdr: ChangeDetectorRef
) {}

ngOnInit()
{
  this.UpdateGroupForm = new FormGroup({
    name: new FormControl(this.data.userGroupName, [Validators.required])
  });
  this.cdr.detectChanges();

}

onSubmit() : void {
  if (this.UpdateGroupForm.valid) {
    //maybe useless test 
    var userGroupPatchRequest: UserGroupPatchRequest  = { 
      id : this.data.userGroupId,
      name: this.UpdateGroupForm.value.name ,
      isadmin: true,
      email: ""
    };
    this.userGroupService.updateUserGroup(userGroupPatchRequest).subscribe({
      next: (data: UserGroup) => {
        console.log("Group created successfully:", data);
        this.userGroupUpdated.emit(); // Emit event to parent component
        this.dialogRef.close();
        
      },
      error: (error) => {
        console.error("Error creating group:", error);
      }
    });
  }
}


OnCancel() : void {
  this.dialogRef.close();
}

}
