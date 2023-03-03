import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';



@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ MatInputModule, MatFormFieldModule, MatIconModule,  MatButtonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent {

  sendBtn : boolean = true;

  subject : string = '';
  message : string = '';
  url : string = '';

  constructor( public dialogRef: MatDialogRef<ContactComponent>) {}

  closeContact(): void {
    console.log(this.url);
    this.dialogRef.close();
  }

  urlChange(){
    this.url = `mailto:nicolascalvo73@gmail.com?subject=${this.subject}&body=${this.message}`
    if(this.subject && this.message){ this.sendBtn = false}
  }


}
