import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';

import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import {DoorRequest} from '../../../../../interfaces/requests/door.request.interface';
import {DoorService} from '../../../../../services/door/door.service';
@Component({
  selector: 'app-create-door.dialog',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule, ReactiveFormsModule,
    MatDialogModule 
  ],
  templateUrl: './create-door.dialog.component.html',
  styleUrl: './create-door.dialog.component.less'
})
export class CreateDoorDialogComponent {

  constructor (@Inject(DoorService) private doorService: DoorService,
  public dialogRef : MatDialogRef<CreateDoorDialogComponent>) {};


  CreateDoorForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.CreateDoorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.CreateDoorForm.valid) {
      //maybe useless test 
      var doorRequest: DoorRequest = {
        name: this.CreateDoorForm.value.name,
      };
      this.doorService.createDoor(doorRequest).subscribe({
        next: (data: DoorRequest) => {
          console.log("Door created successfully:", data);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error("Error creating door:", error);
        }
      });
    }
  }


  OnCancel() {
    this.dialogRef.close();
  }

 

}
