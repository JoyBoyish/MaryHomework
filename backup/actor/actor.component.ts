import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
// The component meta data tells Angular that ActorComponent is a component
export class ActorComponent implements OnInit {
  section = 1;

  actorsDB: any[] = [];
  fullName: string = '';
  bYear: number = 0;
  actorId: string = '';

  moviesDB: any[] = [];
  title: string = '';
  year: number = 0;
  movieId: string = '';

  // inject the database service to Actor Component. i.e. provide references to database service
  constructor(private dbService: DatabaseService) {}

  // functions for actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe((result) => {
      // update actorsDB
      this.onGetActors();
    });
  }

  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe((result) => {
      this.onGetActors();
    });
  }

  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe((result) => {
      this.onGetActors();
    });
  }

  // functions for movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    // console.info(obj);
    this.dbService.createMovie(obj).subscribe((result) => {
      this.onGetMovies();
    });
  }

  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe((result) => {
      this.onGetMovies();
    });
  }

  onDeleteMoviesBefore(year) {
    this.dbService.deleteMoviesBefore(year).subscribe((result) => {
      this.onGetMovies();
    });
  }

  // select this movie
  onSelectMovie(item) {
    this.movieId = item._id;
  }
  // select this actor
  onSelectActor(item) {
    this.actorId = item._id;
  }

  onAddActorToMovie() {
    this.dbService
      .addActorToMovie(this.movieId, this.actorId)
      .subscribe((result) => {
        this.onGetMovies();
      });
  }

  // interactions
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = '';
    this.bYear = 0;
    this.actorId = '';

    this.title = '';
    this.year = 0;
    this.movieId = '';
  }

  // This lifecycle callback function will be invoked with
  // the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
}
