import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { UserService } from '../../../../../services/user/user.service';
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
  selector: 'app-delete-user.popup',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule],
  templateUrl: './delete-user.popup.component.html',
  styleUrl: './delete-user.popup.component.less'
})
export class DeleteUserPopupComponent {

  @Output() userDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor( private userService: UserService,
    public  dialogRef : MatDialogRef<DeleteUserPopupComponent> , 
    @Inject(MAT_DIALOG_DATA) public data: { userId: number, userName: string} ) {}


    onSubmit() {
      this.userDeleted.emit();
      this.dialogRef.close();
    }
    
  
    OnCancel() {
      this.dialogRef.close();
    }

}
