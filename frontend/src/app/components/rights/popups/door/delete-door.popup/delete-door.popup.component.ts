import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
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
  selector: 'app-delete-door.popup',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule],
  templateUrl: './delete-door.popup.component.html',
  styleUrl: './delete-door.popup.component.less'
})
export class DeleteDoorPopupComponent {

  @Output() doorDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor( public  dialogRef : MatDialogRef<DeleteDoorPopupComponent> , 
    @Inject(MAT_DIALOG_DATA) public data: { doorId: number, doorName: string} ) {};


    onSubmit() {
      this.doorDeleted.emit();
      this.dialogRef.close();
    }


    OnCancel() {
      this.dialogRef.close();
    }


}
