// BrowserModule exports required infrastructure for all Angular apps
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
// FormsModule exports the required providers and directives for template-driven forms
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ActorComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  // providers application-wide
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
