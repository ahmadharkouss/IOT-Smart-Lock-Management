import { Component, Input, OnInit, Output, EventEmitter, Inject} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { DatePipe, UpperCasePipe } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from "@angular/material/dialog";

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserGroup } from '../../../../interfaces/responses/userGroup.response.interface';
import { GroupTransactionService } from '../../../../services/transaction/group.transaction.service';
import { CustomDeleteBtnComponent } from "./ag-grid-custom-components/custom-delete-btn/custom-delete-btn.component";

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
  selector: 'app-user-group-listof-door-group',
  standalone: true,
  imports: [ AgGridAngular ,MatCardModule, MatIconModule , DatePipe, UpperCasePipe,MatTooltipModule, MatButtonModule,
    MatMenuModule, MatDialogModule, MatListModule
  ],
  templateUrl: './user-group-listof-door-group.component.html',
  styleUrl: './user-group-listof-door-group.component.less'
})
export class UserGroupListofDoorGroupComponent {

  UserGroups: UserGroup[] = [];


  constructor( public dialog: MatDialog, public  dialogRef : MatDialogRef<UserGroupListofDoorGroupComponent>, private groupTransactionService: GroupTransactionService,
    @Inject(MAT_DIALOG_DATA) public data: { doorGroupId: number, doorGroupName: string} )
   {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDoorGroupUserList();
  }

  getDoorGroupUserList() {
    this.groupTransactionService.getUserGroupsofDoorGroup(this.data.doorGroupId).subscribe({
      next: (data: UserGroup[]) => {
        this.UserGroups = data;
      },
      error: (error) => {
        console.error("Error while fetching UserGroup list:", error);
      },
    });
  }



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
      width: 200,
    },
    {
      headerName: 'Created At',
      field: 'CreatedAt',
      sortable: true,
      filter: true,
      width: 280, 
    },
    {
      headerName: 'Actions',
      cellRenderer: CustomDeleteBtnComponent, 
      cellRendererParams: { doorGroupId: this.data.doorGroupId},
      //passing doorGroupId to the custom delete button component
      valueFormatter: (params) => {
        return this.data.doorGroupId.toString();
      }

    }
  ];

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;



}
