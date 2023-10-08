import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbDateParserFormatter, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './services/ngbDateCustomFormatter.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbDatepickerModule,
    NgbModule
  ],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
