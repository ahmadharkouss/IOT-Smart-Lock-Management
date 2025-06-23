import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {User} from '../../../../../interfaces/responses/user.response.interface';
import { UserRequest } from '../../../../../interfaces/requests/user.request.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../services/user/user.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
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
  selector: 'app-create-user.dialog',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule, ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './create-user.dialog.component.html',
  styleUrl: './create-user.dialog.component.less'
})
export class CreateUserDialogComponent implements OnInit{
  constructor( @Inject(UserService) private userGroupService: UserService,
  public  dialogRef : MatDialogRef<CreateUserDialogComponent> 
) {}
  CreateUserForm: FormGroup = new FormGroup({});

  
  ngOnInit() {
    this.CreateUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]), 
      isadmin: new FormControl(false, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.CreateUserForm.valid) {
      //maybe useless test 
      var userRequest: UserRequest = { 
        name: this.CreateUserForm.value.name,
        isadmin: this.CreateUserForm.value.isadmin,
        email: this.CreateUserForm.value.email
      };
      this.userGroupService.createUser(userRequest).subscribe({
        next: (data: User) => {
          console.log("User created successfully:", data);
          
         
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
