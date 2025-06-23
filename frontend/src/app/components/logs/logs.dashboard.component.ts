import { Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";

import { LogsService } from "../../services/logs.service";
import { Log } from "../../interfaces/responses/logs.response.interface";
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
  selector: 'app-logs.dashboard',
  standalone: true,
  imports: [ AgGridAngular, MatCardModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './logs.dashboard.component.html',
  styleUrl: './logs.dashboard.component.less'
})
export class LogsDashboardComponent {
  //add delete logs + refesh logs 



  Logs : Log[] = [];

  constructor(  private logsService: LogsService) {
  
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getLogs();
    
  }

  getLogs(): void {
    this.logsService.getLogs().subscribe({

      next: logs => {
        this.Logs = logs;
        console.log('Fetched logs:', logs);
      },
      error: error => {
        console.error('There was an error!', error);
    }}


    );
  }

  colDefs: ColDef[] = [
    { field: 'id', sortable: true, filter: true, resizable: true},
    { field: 'timestamp', sortable: true, filter: true, resizable: true, width: 250},
    { field: 'type', sortable: true, filter: true, resizable: true },
    { field: 'user', sortable: true, filter: true, resizable: true },
    { field: 'usergroup', sortable: true, filter: true, resizable: true },
    { field: 'door', sortable: true, filter: true, resizable: true },
    { field: 'doorgroup', sortable: true, filter: true, resizable: true },
  ];

  public autoSizeStrategy:
  | SizeColumnsToFitGridStrategy
  | SizeColumnsToFitProvidedWidthStrategy
  | SizeColumnsToContentStrategy = {
  type: "fitCellContents",
};

public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;

refreshLogs(): void {
  this.getLogs();
};

deleteAllLogs(): void {
  this.logsService.deletAllLogs().subscribe({
    next: success => {
      console.log('Deleted all logs:', success);
      this.Logs = [];
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });
}

}
