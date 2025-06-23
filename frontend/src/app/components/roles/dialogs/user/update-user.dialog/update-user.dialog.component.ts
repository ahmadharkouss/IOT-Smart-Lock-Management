

//not used replaced by Excel auto editing
import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {User} from '../../../../../interfaces/responses/user.response.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../services/user/user.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserPatchRequest } from '../../../../../interfaces/requests/user.request.interface';
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
  selector: 'app-update-user.dialog',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule, ReactiveFormsModule,MatCheckboxModule],
  templateUrl: './update-user.dialog.component.html',
  styleUrl: './update-user.dialog.component.less'
})
export class UpdateUserDialogComponent {
  constructor( @Inject(UserService) private userGroupService: UserService,
  public  dialogRef : MatDialogRef<UpdateUserDialogComponent> ,@Inject(MAT_DIALOG_DATA) public data: { userId: number, userName: string, userEmail: string, userIsAdmin: boolean},
  private cdr: ChangeDetectorRef
) {}

UpdateUserForm: FormGroup = new FormGroup({});
@Output() userUpdated: EventEmitter<void> = new EventEmitter<void>();

  
  ngOnInit() {
    this.UpdateUserForm = new FormGroup({
      name: new FormControl(this.data.userName,[Validators.required]), 
      isadmin: new FormControl(this.data.userIsAdmin, [Validators.required]),
      email: new FormControl(this.data.userEmail, [Validators.required, Validators.email]),
    });
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.UpdateUserForm.valid) {
      //maybe useless test 
      var userPatchRequest: UserPatchRequest = { 
        id: this.data.userId,
        name: this.UpdateUserForm.value.name,
        isadmin: this.UpdateUserForm.value.isadmin,
        email: this.UpdateUserForm.value.email
      };
      this.userGroupService.updateUser(userPatchRequest).subscribe({
        next: (data: User) => {
          console.log("User created successfully:", data);
          this.userUpdated.emit();
          this.dialogRef.close();
          
        },
        error: (error) => {
          console.error("Error creating user:", error);
        }
      });
    }
  }


  OnCancel() {
    this.dialogRef.close();
  }


}
