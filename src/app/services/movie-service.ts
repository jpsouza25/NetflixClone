import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Movie, MovieResponse } from "../models/movie.model";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MovieService{

    private httpClient: HttpClient = inject(HttpClient);

    private httpOption = {
        headers:{
            'Authorization': `Bearer ${environment.token}`
        }
    }


    getMovies(): Observable<Movie[]> {
        const url: string = `${environment.api}/3/movie/now_playing?language=pt-BR`;
        return this.httpClient.get<MovieResponse>(url, this.httpOption).pipe(
            map(response => response.results)
        );
    }

}