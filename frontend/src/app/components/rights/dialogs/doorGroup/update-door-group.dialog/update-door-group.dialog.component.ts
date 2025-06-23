import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoorGroupService } from '../../../../../services/door/door-group.service';
import { DoorGroupPatchRequest } from '../../../../../interfaces/requests/doorGroup.request.interface';
import { DoorGroup } from '../../../../../interfaces/responses/doorGroup.response.interface';

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
  selector: 'app-update-door-group.dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , ReactiveFormsModule],
  templateUrl: './update-door-group.dialog.component.html',
  styleUrl: './update-door-group.dialog.component.less'
})
export class UpdateDoorGroupDialogComponent {


  constructor( @Inject(DoorGroupService) private  doorGroupService: DoorGroupService,
  public  dialogRef : MatDialogRef<UpdateDoorGroupDialogComponent>,private cdr: ChangeDetectorRef,
  @Inject(MAT_DIALOG_DATA) public data: { doorGroupId: number, doorGroupName: string}
 ) {}


  CreateGroupForm: FormGroup = new FormGroup({});
  @Output() doorGroupUpdated: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.CreateGroupForm = new FormGroup({
      name: new FormControl(this.data.doorGroupName, [Validators.required]),
    });
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.CreateGroupForm.valid) {
      //maybe useless test 
      var doorGroupPatchRequest: DoorGroupPatchRequest = { 
        id: this.data.doorGroupId,
        name: this.CreateGroupForm.value.name,
        isadmin: true,
         email: ""
      };
      this.doorGroupService.updateDoorGroup(doorGroupPatchRequest).subscribe({
        next: (data: DoorGroup) => {
          console.log("Group created successfully:", data);
          this.doorGroupUpdated.emit(); // Emit event to parent component
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
