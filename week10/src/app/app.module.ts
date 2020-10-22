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
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { UpdatemovieComponent } from './updatemovie/updatemovie.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const appRoutes: Routes = [
  { path: 'listactors', component: ListactorsComponent },
  { path: 'addactor', component: AddactorComponent },
  { path: 'updateactor', component: UpdateactorComponent },
  { path: 'deleteactor', component: DeleteactorComponent },

  { path: 'listmovies', component: ListmoviesComponent },
  { path: 'addmovie', component: AddmovieComponent },
  { path: 'updatemovie', component: UpdatemovieComponent },
  { path: 'deletemovie', component: DeletemovieComponent },
  { path: '', redirectTo: '/listactors', pathMatch: 'full' },

  { path: 'pagenotfound', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/pagenotfound', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    AddmovieComponent,
    DeletemovieComponent,
    ListmoviesComponent,
    UpdatemovieComponent,
    NotFoundPageComponent,
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
