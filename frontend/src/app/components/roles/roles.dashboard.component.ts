import { Component, viewChild} from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { UserGroup } from "../../interfaces/responses/userGroup.response.interface";
import { UserGroupComponent } from "./user-group/user-group.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserGroupService } from "../../services/user/user-group.service";
import {MatMenuModule} from '@angular/material/menu';

import { CreateUserGroupDialogComponent } from "./dialogs/userGroup/create-userGroup.dialog/create-userGroup.dialog.component";
import { CreateUserDialogComponent } from "./dialogs/user/create-user.dialog/create-user.dialog.component";
import { ListUsersPopupComponent } from "./popups/user/list-users.popup/list-users.popup.component";


@Component({
  selector: "app-roles.dashboard",
  standalone: true,
  imports: [
    MatAccordion,
    MatIconModule,
    UserGroupComponent,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: "./roles.dashboard.component.html",
  styleUrl: "./roles.dashboard.component.less",
})
export class RolesDashboardComponent {
  
  reloadTrigger : boolean = false;
  
  userGroupsIds: number[] = [];
  accordion = viewChild.required(MatAccordion);

  constructor(private userGroupService: UserGroupService, public dialog: MatDialog) {}

   ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserGroupsIds();
  }


  getUserGroupsIds(): void {
    this.userGroupService.getUserGroupIds().subscribe({
      next: (data: number[]) => {
        this.userGroupsIds = data;
        console.log("User group ids:", data);
      },
      error: (error) => {
        console.error("Error fetching user group ids:", error);
      },
      complete: () => {
        console.log("User group ids fetched successfully");
      },
    });
  }

 
  openCreateUserGroupDialog(): void {
    const dialogRef = this.dialog.open(CreateUserGroupDialogComponent, {
      width: "auto",
    });
    dialogRef.componentInstance.userGroupCreated.subscribe(() => {
      this.getUserGroupsIds();
    }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: "auto",
      height: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
  openListUsersPopup(): void {
    const dialogRef = this.dialog.open(ListUsersPopupComponent, {
      maxWidth: '1200px',
      maxHeight: '800px',
      height: '700px',
      width: '100%',
    });
    
    dialogRef.componentInstance.usersUpdated.subscribe(() => {
      console.log("Users updated: received signal");
      this.reloadTrigger = !this.reloadTrigger;
    } );
     
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }




}
