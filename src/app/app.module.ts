import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseDisplayApisComponent } from './browse-display-apis/browse-display-apis.component';
import { swaggerReducer } from './store/swagger.reducer'

@NgModule({
  declarations: [
    AppComponent,
    BrowseDisplayApisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // @ts-ignore
    StoreModule.forRoot({ swaggerApis: swaggerReducer }),
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
