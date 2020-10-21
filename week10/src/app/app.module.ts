// BrowserModule exports required infrastructure for all Angular apps
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { ActorComponent } from './actor/actor.component';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
// FormsModule exports the required providers and directives for template-driven forms
import { FormsModule } from '@angular/forms';
import { ListactorsComponent } from './listactors/listactors.component';
import { AddactorComponent } from './addactor/addactor.component';
import { UpdateactorComponent } from './udpateactor/updateactor.component';
import { DeleteactorComponent } from './deleteactor/deleteactor.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'listactors', component: ListactorsComponent },
  { path: 'addactor', component: AddactorComponent },
  { path: 'updateactor', component: UpdateactorComponent },
  { path: 'deleteactor', component: DeleteactorComponent },
  { path: '', redirectTo: '/listactors', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  // providers application-wide
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
