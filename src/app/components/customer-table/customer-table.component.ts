import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Costumers } from 'src/app/data/customers.data';
import { Costumer } from 'src/app/models/costumer.model';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSortModule} from '@angular/material/sort';



@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent { 

  displayedColumns: string[] = ['id', 'name', 'lastName', 'status', 'email', 'phone'];
  dataSource: MatTableDataSource<Costumer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private _liveAnnouncer: LiveAnnouncer ) {
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
  ngOnInit() {}
}


