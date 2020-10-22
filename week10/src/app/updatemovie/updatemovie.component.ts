import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatemovie',
  templateUrl: './updatemovie.component.html',
  styleUrls: ['./updatemovie.component.css'],
})
export class UpdatemovieComponent implements OnInit {
  actorId: string = '';
  movieId: string = '';

  actorsDB: any[] = [];
  moviesDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  //Get all Actors
  onGetActors() {
    console.log('From on GetActors');

    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  // Get all Movies
  onGetMovies() {
    console.log('From on GetMovies');

    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  // select this actor
  onSelectActor(item) {
    this.actorId = item._id;
  }
  // select this movie
  onSelectMovie(item) {
    this.movieId = item._id;
  }

  onAddActorToMovie() {
    this.dbService
      .addActorToMovie(this.movieId, this.actorId)
      .subscribe((result) => {
        // this.onGetMovies();
        this.router.navigate(['/listmovies']);
      });
  }

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }
}
