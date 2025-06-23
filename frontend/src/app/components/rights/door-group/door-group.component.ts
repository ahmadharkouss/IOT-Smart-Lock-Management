import { Component , Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { DoorComponent } from '../door/door.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DoorGroup } from '../../../interfaces/responses/doorGroup.response.interface';

import { UpdateDoorGroupDialogComponent } from '../../../components/rights/dialogs/doorGroup/update-door-group.dialog/update-door-group.dialog.component';
import { DeleteDoorGroupPopupComponent } from '../../../components/rights/popups/doorGroups/delete-door-group.popup/delete-door-group.popup.component';

import { AdduserGroupTodoorGroupComponent } from '../dialogs/adduser-group-todoor-group/adduser-group-todoor-group.component';

import { UserGroupListofDoorGroupComponent } from '../popups/user-group-listof-door-group/user-group-listof-door-group.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';


import {AddDoorToGroupComponent} from '../dialogs/add-door-to-group/add-door-to-group.component';
import { DoorGroupService } from '../../../services/door/door-group.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-door-group',
  standalone: true,
  imports: [ MatExpansionModule, MatIconModule , DatePipe, UpperCasePipe,DoorComponent, MatTooltipModule, MatButtonModule,
    MatMenuModule, MatDialogModule,
  ],
  templateUrl: './door-group.component.html',
  styleUrl: './door-group.component.less'
})
export class DoorGroupComponent {
  @Input() doorGroupId !: number;
  @Input() reloadTrigger!: boolean;

  

  @Output() doorGroupDeleted: EventEmitter<void> = new EventEmitter<void>();

  DoorGroup : DoorGroup = {
    id: 0,
    zone_name: "",
    doors: [],
    createdAt: new Date(),
  };
  
  eventsSubject: Subject<any> = new Subject<number[]>();
  constructor(private doorGroupService: DoorGroupService, public dialog: MatDialog) {}


  ngOnChanges(changes: SimpleChanges) 
  {
    if (changes['reloadTrigger']) {
      console.log("DoorGroupComponent: Reload trigger changed");
      this.doorGroupService.getDoorGroupByID(this.doorGroupId).subscribe({
        next: (data: DoorGroup) => {
          this.DoorGroup = data;
          this.eventsSubject.next(this.DoorGroup.doors);
        },
        error: (error) => {
          console.error("Error fetching door group data:", error);
        }
      });
    }
  

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDoorGroupData();
  }

  getDoorGroupData(): void {
    this.doorGroupService.getDoorGroupByID(this.doorGroupId).subscribe({
      next: (data: DoorGroup) => {
        this.DoorGroup = data;
      },
      error: (error) => {
        console.error("Error fetching door group data:", error);
      }
    });
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateDoorGroupDialogComponent, {
      width: 'auto',
      data: {
        doorGroupId: this.DoorGroup.id,
        doorGroupName: this.DoorGroup.zone_name,
      },
    });

    dialogRef.componentInstance.doorGroupUpdated.subscribe(() => {
      this.getDoorGroupData();
    });
  }
  
  openDeleteDialog(): void { 
    const dialogRef = this.dialog.open(DeleteDoorGroupPopupComponent, {
      width: 'auto',
      data: {
        doorGroupId: this.DoorGroup.id,
        doorGroupName: this.DoorGroup.zone_name,
      },
    });

    dialogRef.componentInstance.doorGroupDeleted.subscribe(() => {
      this.doorGroupDeleted.emit();
    });
  }

  openAddDoorToGroupDialog(): void {
    const dialogRef = this.dialog.open(AddDoorToGroupComponent, {
      width: 'auto',
      data: {
        doorGroupId: this.DoorGroup.id,
        doorGroupName: this.DoorGroup.zone_name,
      },
    });

    dialogRef.componentInstance.doorGroupUpdated.subscribe(() => {
      this.getDoorGroupData();
    });
  }
  openAddUserGroupToDoorGroupDialog(): void {
    const dialogRef = this.dialog.open(AdduserGroupTodoorGroupComponent, {
      width: 'auto',
      data: {
        doorGroupId: this.DoorGroup.id,
        doorGroupName: this.DoorGroup.zone_name,
      },
    });
  }

  openUserGroupListOfDoorGroupDialog(): void {
    const dialogRef = this.dialog.open(UserGroupListofDoorGroupComponent, {
      maxWidth: '900px',
      width: '900px',
      data: {
        doorGroupId: this.DoorGroup.id,
        doorGroupName: this.DoorGroup.zone_name,
      },
    });
  }
}
