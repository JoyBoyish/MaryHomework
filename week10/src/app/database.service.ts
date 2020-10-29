import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// marks a class as available for injection
@Injectable({
  // available to the whole application
  providedIn: 'root',
})
// Service that is responsible for the communication with the RESTFul server
export class DatabaseService {
  // inject the httpClient to database service
  // http is the class member now
  // we can make http requests by calling this.http
  constructor(private http: HttpClient) {}
  // result: any;

  // fetch all actors
  getActors() {
    return this.http.get('/actors');
    // localhost:8080/actors
  }
  // retrive actor by its ID
  getActor(id: string) {
    let url = '/actors/' + id;
    return this.http.get(url);
  }

  // create new Actor in the database
  createActor(data) {
    return this.http.post('/actors', data, httpOptions);
  }

  // update Actor which exists in the database
  updateActor(id, data) {
    /* path parameter */
    let url = '/actors/' + id;
    return this.http.put(url, data, httpOptions);
  }

  // delete actor by its ID
  deleteActor(id) {
    /* path parameter */
    let url = '/actors/' + id;
    return this.http.delete(url, httpOptions);
  }

  // fetch all movies
  getMovies() {
    return this.http.get('/movies');
  }
  // create new Movie in the database
  createMovie(data) {
    return this.http.post('/movies', data, httpOptions);
  }
  // delete Movie by its ID
  deleteMovie(id) {
    /* path parameter */
    let url = '/movies/' + id;
    return this.http.delete(url, httpOptions);
  }

  // update Movie which exists in the database
  updateMovie(id, data) {
    /* path parameter */
    let url = '/movies/' + id;
    return this.http.put(url, data, httpOptions);
  }

  // delete all movies before year
  deleteMoviesBefore(year) {
    /* query string */
    let url = '/movies?year=' + year;
    return this.http.delete(url, httpOptions);
  }

  // add actor by actorID to movie by movieID
  addActorToMovie(movieId, actorId) {
    /* path parameter */
    let url = '/movies/' + movieId + '/' + actorId;
    return this.http.put(url, httpOptions);
  }
}
