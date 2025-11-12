import { Component, inject } from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonButton,
    IonIcon,
    IonTitle
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from 'src/app/services/movie-service';
import { Movie } from 'src/app/models/movie.model';
import { addIcons } from 'ionicons';
import { heart, heartOutline, play } from 'ionicons/icons'

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.page.html',
    styleUrls: ['./movie-details.page.scss'],
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonContent,
        IonButton,
        IonIcon,
        IonTitle,
        CommonModule
    ]
})
export class MovieDetailsPage {
    private route = inject(ActivatedRoute);
    private movieService = inject(MovieService);

    movie?: Movie;
    isFavorite = false;


    constructor() {
        addIcons({
            play,
            heart,
            heartOutline
        })
        const movieId = this.route.snapshot.paramMap.get('id');
        if (movieId) {
            this.loadMovieDetails(Number(movieId));
        }
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }


    loadMovieDetails(id: number) {
        this.movieService.getMovieDetails(id).subscribe((data) => {
            this.movie = data;
        });
    }
}
