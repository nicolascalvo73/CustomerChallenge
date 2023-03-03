import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CostumerServ } from 'src/app/services/costumer.service';
import { Costumer } from '../../models/costumer.model';
import { Costumers } from '../../data/customers.data';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-costumer-form',
  standalone:true,
  imports: [ 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule,  
    MatButtonModule, 
    MatSelectModule, 
    MatSnackBarModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './costumer-form.component.html',
  styleUrls: ['./costumer-form.component.scss']
})
export class CostumerFormComponent {

  constructor( private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<CostumerFormComponent>) {}

  sendForm: boolean = false;

  id: string = '';
  name: string = '';
  lastName: string = '';
  status: string = '';
  phone: string = '';
  email: string = '';

  costumer : Costumer = new CostumerServ();
  costumers : any = Costumers;

  activateSendBtn(){
    const forms = this.costumer
    if( forms.name && forms.lastName && forms.email && forms.status ){
      this.sendForm = true;
    }
  }

  validateTypeNumber(){
    const n = this.costumer.phone;
    if ( !n  || n.toString().includes(".") ){
      this.openSnackBar('Verify your phone', '', {duration: 1500});
    }
  }

  validateEmail(){
    const regex = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;
    const e = this.costumer.email.toString();
    if( !e || e.length <= 3 || !e.includes(".") || !e.includes("@") || !regex.test(e)){
      this.openSnackBar(`Please check your email ${e}.`, '', {duration: 2000});
      this.sendForm = false;
    }else{
      this.activateSendBtn();
    }
  }

  validateName(){
    const regex = /(\d+)/g;
    const e = this.capitalize(this.costumer.name.toString());
    if( !e || e.length <= 3 || e.includes(".") || e.match(regex) ){
      this.openSnackBar(`Please check your name, ${e}.`, '', {duration: 2000});
      this.sendForm = false;
    }else{
      this.costumer.name = e;
      this.activateSendBtn();
    }
  }

  validateLastName(){
    const regex = /(\d+)/g;
    const e = this.capitalize(this.costumer.lastName.toString());
    this.capitalize(e);
    if( !e || e.length <= 3 || e.includes(".") || e.match(regex)){
      this.openSnackBar(`Please check your last name, ${e}.`, '', {duration: 2000});
      this.sendForm = false;
    }else{
      this.costumer.lastName = e;
      this.activateSendBtn();
    }
  }


  openSnackBar(message: string, action: string, duration: {}) {
    this._snackBar.open(message, action, duration);
  }

  capitalize(str: string){
    const capital = str.substring(0, 1).toUpperCase();
    const rest = str.substring(1, str.length).toLowerCase();
    return capital.concat(rest.toString()).toString();
  }

  sendCostumerForm(){
    this.costumer.id = crypto.randomUUID();
    this.costumers.push(this.costumer);
    console.log(this.costumer)
    this.dialogRef.close();
  }

  closeForm(): void {
    this.dialogRef.close();
  }

}
