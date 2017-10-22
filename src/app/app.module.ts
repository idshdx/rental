// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

// components
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { PanelComponent } from './panel/panel.component';

// services
import { JsonService } from './json-service.service';
import { GridComponent } from './grid/grid.component';

import { FinalPricePipe } from './final-price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    PanelComponent,
    GridComponent,
    FinalPricePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [JsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
