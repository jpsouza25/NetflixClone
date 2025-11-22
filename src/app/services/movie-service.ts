import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Movie, MovieResponse } from "../models/movie.model";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    private httpClient = inject(HttpClient);

    private httpOption = {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${environment.tmdbToken}`,
            'accept': 'application/json'
        })
    };

    private apiUrl = environment.tmdbApi; // https://api.themoviedb.org

    getMovies(): Observable<Movie[]> {
        const url = `${this.apiUrl}/3/movie/now_playing?language=pt-BR`;
        return this.httpClient.get<MovieResponse>(url, this.httpOption).pipe(
            map(response => response.results)
        );
    }

    getMovieDetails(id: number): Observable<Movie> {
        const url = `${this.apiUrl}/3/movie/${id}?language=pt-BR`;
        return this.httpClient.get<Movie>(url, this.httpOption);
    }
}
