import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ItemComponent } from './item/item.component';
import {HttpClientModule} from '@angular/common/http';
// import { HttpClientJsonpModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
