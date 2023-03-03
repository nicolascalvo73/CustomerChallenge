import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Costumers } from 'src/app/data/customers.data';
import { Costumer } from 'src/app/models/costumer.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CostumerFormComponent } from '../costumer-form';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [
    CommonModule, 
    MatPaginatorModule, 
    MatTableModule, 
    MatFormFieldModule, 
    MatDialogModule,
    MatInputModule, 
    MatSortModule, 
    MatButtonModule,
    MatCheckboxModule
  ],

  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent { 

  displayedColumns: string[] = ['select', 'id', 'name', 'lastName', 'status', 'email', 'phone'];
  dataSource: MatTableDataSource<Costumer>;
  selection = new SelectionModel<Costumer>(true, []);
  costumers = Costumers;
  selectedRows = [];
  removeBtn : Boolean = true;
  

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Costumer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer ) {
    this.dataSource = new MatTableDataSource(Costumers);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CostumerFormComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  closeDialog(){
    this.dialog.closeAll();
  }

  selectionToggle( id: String ){
    const checked: String[] = this.selectedRows

    if( checked.find( e => e == id) ){
      checked.splice( checked.indexOf(id) , 1)
      this.removeBtn = !checked ? false : true;
    }else{
      checked.push(id)
      this.removeBtn = false;
    }
  };

  removeCostumer(){
    const selection = this.selectedRows
    const data = this.costumers
      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        selection.forEach( n => n == e.id ? data.splice( i, 1 ) : ''); 
      }
      console.log(data)
  };

  ngOnInit() {
  };

}


