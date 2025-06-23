import { Component, Output, EventEmitter, Inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms';




import { Door } from '../../../../interfaces/responses/door.response.interface';
import { DoorService } from '../../../../services/door/door.service';
import { GroupTransactionService } from '../../../../services/transaction/group.transaction.service';
import { DoorGroupDoorRequest } from '../../../../interfaces/requests/transactions/doorGroupDoor.request.interface';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-add-door-to-group',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ,  MatFormFieldModule, MatInputModule , MatDialogModule, ReactiveFormsModule,
    MatDatepickerModule, CommonModule, MatSelectModule
  ],
  templateUrl: './add-door-to-group.component.html',
  styleUrl: './add-door-to-group.component.less'
})
export class AddDoorToGroupComponent {

  @Output() doorGroupUpdated: EventEmitter<void> = new EventEmitter<void>();

  doors: Door[] = [];
  MoveDoortoDoorGroupForm: FormGroup = new FormGroup({});
  constructor(private doorService: DoorService, private groupTransactionService: GroupTransactionService,
    public  dialogRef : MatDialogRef<AddDoorToGroupComponent>,@Inject(MAT_DIALOG_DATA) public data: { doorGroupId: number, doorGroupName: string}
  ) {
    this.doorService.getDoors().subscribe({
      next: (data: Door[]) => {
        this.doors = data;
      },
      error: (error) => {
        console.error("Error fetching doors:", error);
      }
    });
  }

  ngOnInit() {
    this.MoveDoortoDoorGroupForm = new FormGroup({
      id_door : new FormControl('', [Validators.required]),
      validity : new FormControl('', [Validators.required])
    });
  }

  onSubmit() : void {
    let doorGroupDoorRequest : DoorGroupDoorRequest = {
      id_door: this.MoveDoortoDoorGroupForm.value.id_door,
      id_doorgroup: this.data.doorGroupId,
      validity: this.MoveDoortoDoorGroupForm.value.validity
    };
    this.groupTransactionService.addDoorToGroup(doorGroupDoorRequest).subscribe({
      next: (data) => {
        this.doorGroupUpdated.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        console.error("Error adding door to door group:", error);
      }
    });
  }



  OnCancel() : void {
    this.dialogRef.close();
  }


}
