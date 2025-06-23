import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DoorGroupService} from '../../../../../services/door/door-group.service';
import {DoorGroup} from '../../../../../interfaces/responses/doorGroup.response.interface';
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
  selector: 'app-delete-door-group.popup',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './delete-door-group.popup.component.html',
  styleUrl: './delete-door-group.popup.component.less'
})
export class DeleteDoorGroupPopupComponent {

  @Output() doorGroupDeleted: EventEmitter<void> = new EventEmitter<void>();
  constructor( @Inject(DoorGroupService) private doorGroupService: DoorGroupService,
  public  dialogRef : MatDialogRef<DeleteDoorGroupPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { doorGroupId: number, doorGroupName: string}) {};


  onSubmit() {
    console.log("Deleting group:", this.data.doorGroupId);
    this.doorGroupService.deleteDoorGroupByID(this.data.doorGroupId).subscribe({
      next: () => {
        console.log("Group deleted successfully");
        this.doorGroupDeleted.emit();
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
