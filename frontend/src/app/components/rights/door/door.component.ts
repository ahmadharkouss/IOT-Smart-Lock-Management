import { Component, Input, Output, SimpleChanges , EventEmitter} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";


import { MatListModule } from "@angular/material/list";
import { DatePipe, UpperCasePipe } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';


import { Subscription, Observable } from "rxjs";

import { Door } from "../../../interfaces/responses/door.response.interface";
import { DoorService } from "../../../services/door/door.service";
import { GroupTransactionService } from "../../../services/transaction/group.transaction.service";
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
  selector: 'app-door',
  standalone: true,
  imports: [ MatCardModule, MatIconModule, MatButtonModule, MatListModule, DatePipe, UpperCasePipe, MatTooltipModule, MatMenuModule

  ],
  templateUrl: './door.component.html',
  styleUrl: './door.component.less'
})
export class DoorComponent {
  @Input() DoorId!: number;
  @Input () DoorGroupID!: number;

  eventsSubscription!: Subscription;
  @Input() events!: Observable<number[]>;

  @Output() doorRemovedFromGroup: EventEmitter<void> = new EventEmitter<void>();

  door : Door = {
    id: 0,
    name: "",
    door_groups: [],
    created_at: new Date()
  };

  constructor(private doorService: DoorService, public dialog: MatDialog,
    private transactionService :  GroupTransactionService
  ) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDoorData(this.DoorId);
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data.includes(this.DoorId)) {
        this.getDoorData(this.DoorId);
        console.log('DoorComponent: reload Trigger changed');
      }
    }
    );
    
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  getDoorData(id: number) {
    this.doorService.getDoorByID(id).subscribe({
      next: (data: Door) => {
        this.door = data;
        console.log('Door data:', data);
      },
      error: (error) => {
        console.error('Error fetching Door data:', error);
      }
    }
    );
  }

  removeFromDoorGroup() : void {

    this.transactionService.deleteDoorToGroup({
      id_door : this.DoorId,
      id_doorgroup : this.DoorGroupID,
      validity : new Date()
    }).subscribe({

      next: (data) => {
        console.log("Door removed from group:", data);
        this.doorRemovedFromGroup.emit();
      },
      error: (error) => {
        console.error("Error removing door from group:", error);
      }
    });

  };

}
