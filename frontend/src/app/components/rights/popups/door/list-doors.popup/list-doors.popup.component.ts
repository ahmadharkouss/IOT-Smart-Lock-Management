import { Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { DatePipe, UpperCasePipe } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from "@angular/material/dialog";
import { DoorService } from '../../../../../services/door/door.service';
import { DoorPatchRequest } from '../../../../../interfaces/requests/door.request.interface';
import { CustomDeleteBtnComponent } from './ag-grid-custom-components/custom-delete-btn/custom-delete-btn.component';
import { DeleteDoorPopupComponent } from '../delete-door.popup/delete-door.popup.component';
import { Door } from '../../../../../interfaces/responses/door.response.interface';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';


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
  selector: 'app-list-doors.popup',
  standalone: true,
  imports: [ MatCardModule, MatIconModule, MatButtonModule, MatListModule, MatTooltipModule, MatMenuModule, MatDialogModule,
    AgGridAngular
   ],

  templateUrl: './list-doors.popup.component.html',
  styleUrl: './list-doors.popup.component.less'
})
export class ListDoorsPopupComponent {

  @Output() doorUpdated: EventEmitter<void> = new EventEmitter<void>();

  Doors :  Door[] = [];

  public noRowsTemplate;
  public loadingTemplate;
  constructor( public dialog: MatDialog, public  dialogRef : MatDialogRef<ListDoorsPopupComponent>, private doorService: DoorService) {
    this.loadingTemplate =
      `<span class="ag-overlay-loading-center">data is loading...</span>`;
    this.noRowsTemplate =
      `"<span">no rows to show</span>"`;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDoors();
  }

  public autoSizeStrategy:
  | SizeColumnsToFitGridStrategy
  | SizeColumnsToFitProvidedWidthStrategy
  | SizeColumnsToContentStrategy = {
  type: "fitCellContents",
};
  //Column definitions
  colDefs: ColDef[] = [
    {
      headerName: 'DoorId',
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
      headerName: 'Created At',
      field: 'created_at',
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



  getDoors(): void {
    this.doorService.getDoors().subscribe({
      next: (data : Door[]) => {
        this.Doors = data;
        console.log("Doors:", this.Doors);
      },
      error: (error) => {
        console.error("Error fetching doors:", error);
      }
    });
  }






  closeDialog(): void {
    //check if there any changes before : todo after for opti , no need to reload data everytime 
    this.doorUpdated.emit();
    this.dialogRef.close();
  }
  onCellValueChanged(event: any)
  {
    console.log("Cell value changed:", event);
    
    const  doorPatchRequest : DoorPatchRequest = {
      id: event.data.id,
      name: event.data.name,
      isadmin: true,
      email: "",
    };
    this.doorService.updateDoor(doorPatchRequest).subscribe({
      next: () => {
        console.log("Door updated successfully");
      },
      error: (error) => {
        console.error("Error updating door:", error);
      }
    });
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;

}
