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
import {DoorGroupRequest} from '../../../../../interfaces/requests/doorGroup.request.interface';
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
  selector: 'app-create-door-group.dialog',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './create-door-group.dialog.component.html',
  styleUrl: './create-door-group.dialog.component.less'
})
export class CreateDoorGroupDialogComponent {

  constructor( @Inject(DoorGroupService) private doorGroupService: DoorGroupService,
  public  dialogRef : MatDialogRef<CreateDoorGroupDialogComponent> ) {};

  CreateDoorGroupForm: FormGroup = new FormGroup({});
  @Output() doorCreated: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.CreateDoorGroupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.CreateDoorGroupForm.valid) {
      //maybe useless test 
      var doorGroupRequest: DoorGroupRequest = { 
        name: this.CreateDoorGroupForm.value.name
      };
      this.doorGroupService.createDoorGroup(doorGroupRequest).subscribe({
        next: (data: DoorGroup) => {
          console.log("Door group created successfully:", data);
          this.doorCreated.emit(); // Emit event to parent component
          this.dialogRef.close();
          
        },
        error: (error) => {
          console.error("Error creating door group:", error);
        }
      });
    }
  }


  OnCancel() {
    this.dialogRef.close();
  }

}
