import { Component, Input, Output, SimpleChanges , EventEmitter} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { User } from "../../../interfaces/responses/user.response.interface";
import { MatListModule } from "@angular/material/list";
import { DatePipe, UpperCasePipe } from '@angular/common';
import { UserService } from "../../../services/user/user.service";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { UpdateUserDialogComponent } from "../dialogs/user/update-user.dialog/update-user.dialog.component";
import { DeleteUserPopupComponent } from "../popups/user/delete-user.popup/delete-user.popup.component";
import { Subscription, Observable } from "rxjs";
import {UserGroupUserRequest} from '../../../interfaces/requests/transactions/userGroupUser.request.interface';
import {GroupTransactionService} from '../../../services/transaction/group.transaction.service';
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
  selector: "app-user",
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatListModule, DatePipe, UpperCasePipe, MatTooltipModule, MatMenuModule],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.less",
})
export class UserComponent {
  @Input() UserId!: number;
  @Input () userGroupID!: number;
  @Output() userRemovedFromGroup: EventEmitter<void> = new EventEmitter<void>();
  //@Input() reloadTrigger!: boolean;

 
  /*
  ngOnChanges(changes: SimpleChanges) {
    if (changes['reloadTrigger']) {
      console.log("UserComponent: Reload trigger changed");
      this.getUserData(this.UserId);
    }
  }
*/
eventsSubscription!: Subscription;
@Input() events!: Observable<number[]>;

    user: User = {
      id: 0,
      name: "",
      email: "",
      is_admin: false,
      user_groups: [],
      CreatedAt: new Date(),
    };

  constructor(private userService: UserService, public dialog: MatDialog, private transactionService :  GroupTransactionService) {}
  errorMessage!: string;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("User ID:", this.UserId);
    this.getUserData(this.UserId);
    //useful only when the user update a user info  in the grid , must opti by adding a specific a case
    this.eventsSubscription = this.events.subscribe((data) => {
      //update only the users that are not deleted , angular is not optimized for this case
      if (data.includes(this.UserId)){ this.getUserData(this.UserId)}; 
      console.log("UserComponent: Reload trigger changed")
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  getUserData(id: number): void {
    this.userService.getUserByID(id).subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (error) => {
        this.errorMessage = "Failed to load user data";
        console.error("Error fetching user data:", error);
      },
      complete: () => {
        console.log("User data fetched successfully");
        console.log("User data:", this.user);
      },
    });
  }

  removeFromUserGroup(): void {
    this.transactionService.deleteUserToGroup
    ({id_user: this.UserId, id_usergroup: this.userGroupID, validity: new Date()}
  
  ).subscribe({
      next: () => {
        this.userRemovedFromGroup.emit();
      },
      error: (error) => {
        console.error("Error removing user from group:", error);
      }
    });

  
    
  }


}
