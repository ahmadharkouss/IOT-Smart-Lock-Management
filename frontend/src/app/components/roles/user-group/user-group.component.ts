import { Component , Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { UserGroup } from '../../../interfaces/responses/userGroup.response.interface';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { UserComponent } from '../user/user.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteUserGroupPopupComponent } from '../popups/userGroup/delete-user-group.popup/delete-user-group.popup.component';
import { UpdateUserGroupDialogComponent } from '../dialogs/userGroup/update-user-group.dialog/update-user-group.dialog.component';
import { AddUsertoGroupDialogComponent } from '../dialogs/add-userto-group.dialog/add-userto-group.dialog.component';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';



import { UserGroupService } from '../../../services/user/user-group.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-user-group',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule , DatePipe, UpperCasePipe,UserComponent, MatTooltipModule, MatButtonModule,
    MatMenuModule, MatDialogModule,
  ],
  templateUrl: './user-group.component.html',
  styleUrl: './user-group.component.less'
})
export class UserGroupComponent {

  
  @Input() UserGroupId!: number;
  @Input() reloadTrigger!: boolean;
  

  eventsSubject: Subject<any> = new Subject<number[]>();

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['reloadTrigger']) {
      console.log("UserGroupComponent: Reload trigger changed");
      //useful only when the user delete a user in the grid , must opti by adding a specific a case
      this.userGroupService.getUserGroupByID(this.UserGroupId).subscribe({
        next: (data: UserGroup) => {
          this.UserGroup = data;
          this.eventsSubject.next(this.UserGroup.users);
        },
        error: (error) => {
          console.error("Error fetching user group data:", error);
        }
      });
    }
  }

  @Output() userGroupDeleted: EventEmitter<void> = new EventEmitter<void>();
  UserGroup: UserGroup = {
    id: 0,
    name: "",
    users: [],
    door_groups: [],
    CreatedAt: new Date(),
  };
  constructor(public dialog: MatDialog, private userGroupService : UserGroupService){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("UserGroup Id from child:", this.UserGroupId);
    this.getUserGroupData(this.UserGroupId);
    
  }

  getUserGroupData(id: number): void {
    this.userGroupService.getUserGroupByID(id).subscribe({
      next: (data: UserGroup) => {
        this.UserGroup = data;
      },
      error: (error) => {
        console.error("Error fetching user group data:", error);
      }
    });
  }

  openDeleteUserGroupDialog(): void 
  {
    const dialogRef = this.dialog.open(DeleteUserGroupPopupComponent, {
      data: { userGroupId: this.UserGroup.id , userGroupName: this.UserGroup.name},
      width: "auto",
    });
    dialogRef.componentInstance.userGroupDeleted.subscribe(() => {
      this.userGroupDeleted.emit();
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
  openUpdateUserGroupDialog(): void {
    const dialogRef = this.dialog.open(UpdateUserGroupDialogComponent, {
      data: { userGroupId: this.UserGroup.id , userGroupName: this.UserGroup.name},
      width: "auto",
    });
    dialogRef.componentInstance.userGroupUpdated.subscribe(() => {
      this.getUserGroupData(this.UserGroup.id);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openAddUserToGroupDialog(): void {
    const dialogRef = this.dialog.open(AddUsertoGroupDialogComponent, {
      data: { userGroupId: this.UserGroup.id , userGroupName: this.UserGroup.name},
      width: "auto",
    });
    dialogRef.componentInstance.userGroupUpdated.subscribe(() => {
      this.getUserGroupData(this.UserGroup.id);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

}
