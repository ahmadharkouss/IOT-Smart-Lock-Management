import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserGroup } from '../../../../../interfaces/responses/userGroup.response.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
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
  selector: 'app-delete-user-group.popup',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule],
  templateUrl: './delete-user-group.popup.component.html',
  styleUrl: './delete-user-group.popup.component.less'
})
export class DeleteUserGroupPopupComponent  {

  @Output() userGroupDeleted: EventEmitter<void> = new EventEmitter<void>();
  
  constructor( private userGroupService: UserGroupService,
  public  dialogRef : MatDialogRef<DeleteUserGroupPopupComponent> , 
  @Inject(MAT_DIALOG_DATA) public data: { userGroupId: number, userGroupName: string} ) {}


  onSubmit() {
    console.log("Deleting group:", this.data.userGroupId);
    this.userGroupService.deleteUserGroupByID(this.data.userGroupId).subscribe({
      next: () => {
        console.log("Group deleted successfully");
        this.userGroupDeleted.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        console.error("Error deleting group:", error);
      }
    });
  }
  



  OnCancel() {
    this.dialogRef.close();
  }



  

}
