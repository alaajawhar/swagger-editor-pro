import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseDisplayApisComponent } from './browse-display-apis/browse-display-apis.component';
import { swaggerReducer } from './store/swagger.reducer';
import { FilterApisIfSelectedPipe } from './browse-display-apis/filter-apis-if-selected.pipe';
import { FilterApisIfNotSelectedPipe } from './browse-display-apis/filter-apis-if-not-selected.pipe';
import { FilterByNamePipe } from './browse-display-apis/filter-by-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BrowseDisplayApisComponent,
    FilterApisIfSelectedPipe,
    FilterApisIfNotSelectedPipe,
    FilterByNamePipe,
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
