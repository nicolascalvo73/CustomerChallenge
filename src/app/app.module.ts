import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { CostumerFormComponent } from './components/costumer-form/costumer-form.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ToolbarComponent,
    CostumerFormComponent, 
    ContactComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
