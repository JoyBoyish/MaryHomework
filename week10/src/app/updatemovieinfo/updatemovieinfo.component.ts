import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatemovieinfo',
  templateUrl: './updatemovieinfo.component.html',
  styleUrls: ['./updatemovieinfo.component.css'],
})
export class UpdatemovieinfoComponent implements OnInit {
  title: string = '';
  pYear: number = 0;
  movieId: string = '';

  moviesDB: any[] = [];
  error = undefined;

  constructor(private dbService: DatabaseService, private router: Router) {}

  //Get all Movies
  onGetMovies() {
    console.log('From on GetMovies');

    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  // Update an Actor
  onSelectUpdate(item) {
    this.title = item.title;
    this.pYear = item.year;
    this.movieId = item._id;
  }
  onUpdateMovie() {
    let obj = { name: this.title, year: this.pYear };
    this.dbService.updateMovie(this.movieId, obj).subscribe(
      (result) => {
        // this.onGetActors();
        this.error = undefined;
        this.router.navigate(['/listmovies']);
      },
      (error) => {
        this.error = error;
      }
    );
  }

  ngOnInit() {
    this.onGetMovies();
  }

  onCancel() {
    this.router.navigate(['/listmovies']);
  }
}
