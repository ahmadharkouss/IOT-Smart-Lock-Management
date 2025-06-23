import { Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { User } from "../../../../../interfaces/responses/user.response.interface";
import { MatListModule } from "@angular/material/list";
import { DatePipe, UpperCasePipe } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { UserService } from "../../../../../services/user/user.service";
import { MatDialogModule } from "@angular/material/dialog";


import { UserPatchRequest } from "../../../../../interfaces/requests/user.request.interface";
import { CustomDeleteBtnComponent } from "./ag-grid-custom-components/custom-delete-btn/custom-delete-btn.component";

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { DeleteUserPopupComponent } from '../delete-user.popup/delete-user.popup.component';



/* ag grid imports */
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColGroupDef,
  GridApi,
  GetContextMenuItemsParams,
  Grid,
  GridOptions,
  MenuItemDef,
  RowNodeTransaction,
  RowClassParams,
  ProcessDataFromClipboardParams,
  PasteEndEvent,
  PasteStartEvent,
  ColumnApi,
  ColumnResizedEvent,
  CellClickedEvent,
  ColDef,
  GridReadyEvent,
  FirstDataRenderedEvent,
  ExcelStyle,
  GetRowIdFunc,
  GetRowIdParams,
  IRichCellEditorParams,
  ICellEditorParams,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from 'ag-grid-community';

@Component({
  selector: 'app-list-users.popup',
  standalone: true,
  imports: [ MatCardModule, MatIconModule, MatButtonModule, MatListModule, DatePipe, UpperCasePipe, MatTooltipModule, MatMenuModule, MatDialogModule,
  AgGridAngular],
  templateUrl: './list-users.popup.component.html',
  styleUrl: './list-users.popup.component.less'
})
export class ListUsersPopupComponent implements OnInit {

  //fetch user data , so if created a user it updates 

  @Output() usersUpdated: EventEmitter<void> = new EventEmitter<void>();

  public autoSizeStrategy:
  | SizeColumnsToFitGridStrategy
  | SizeColumnsToFitProvidedWidthStrategy
  | SizeColumnsToContentStrategy = {
  type: "fitCellContents",
};  
  Users: User[] = [];
  public noRowsTemplate;
  public loadingTemplate;
  constructor( public dialog: MatDialog, public  dialogRef : MatDialogRef<ListUsersPopupComponent> , private userService: UserService) {
    this.loadingTemplate =
      `<span class="ag-overlay-loading-center">data is loading...</span>`;
    this.noRowsTemplate =
      `"<span">no rows to show</span>"`;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers();
  }


  //Column definitions
  colDefs: ColDef[] = [
    {
      headerName: 'UserId',
      hide: true,
      field: 'id',
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: 'Is Admin',
      field: 'is_admin',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      headerName: 'Created At',
      field: 'CreatedAt',
      sortable: true,
      filter: true,
      editable: false,
      cellClass: 'date-class',
    },
    {
      headerName: 'Actions',
      cellRenderer: CustomDeleteBtnComponent, 
    }

  ];



  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.Users = data;
        console.log("Users:", data);
      },
      error: (error) => {
        console.error("Error fetching users:", error);
      }
    });
  }



  closeDialog(): void {
    //check if there any changes before : todo after for opti , no need to reload data everytime 
    this.usersUpdated.emit();
    this.dialogRef.close();
  }
  onCellValueChanged(event: any)
  {
    console.log("Cell value changed:", event);
    
    const user: UserPatchRequest = {
      id : event.data.id,
      name: event.data.name,
      isadmin: event.data.is_admin,
      email: event.data.email,
    };
    this.userService.updateUser(user).subscribe({
      next: () => {
        console.log("User updated successfully");
      },
      error: (error) => {
        console.error("Error updating user:", error);
      }
    });
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;

}
