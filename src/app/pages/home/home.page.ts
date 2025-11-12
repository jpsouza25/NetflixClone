import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonImg,
  LoadingController,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { NgStyle, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import ColorThief from 'colorthief';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie-service';
import { UtilsHelper } from 'src/app/utils/utils.helper';
import { Router } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonCard,
    IonImg,
    IonButtons,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    NgStyle,
    NgIf,
    NgForOf,
    FormsModule,
  ],
})
export class HomePage implements AfterViewInit {
  @ViewChild('posterImage') posterImage!: ElementRef<HTMLImageElement>;

  movies: Movie[] = [];
  topRated: Movie[] = [];
  highlightMovie?: Movie;

  searchActive = false;
  searchTerm = '';
  searchResults: Movie[] = [];

  backgroundColor = 'rgb(0, 0, 0)';
  headerBackgroundColor = 'rgba(0, 0, 0, 0)';

  private startScrollPoint = 0;
  private initialColor = [0, 0, 0];

  private movieService = inject(MovieService);
  private loadingController = inject(LoadingController);
  private router = inject(Router);

  constructor() {
    addIcons({
      searchOutline,
      closeOutline,
    });
  }

  ngAfterViewInit(): void {
    this.getMovies();
  }

  async getMovies(refresher?: RefresherCustomEvent) {
    const loading = await this.loadingController.create();
    if (!refresher) await loading.present();

    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
      const randomIndex = Math.floor(Math.random() * this.movies.length);
      this.highlightMovie = this.movies[randomIndex];
      this.initializeImage();
      this.topRated = [...this.movies].sort((a, b) => b.vote_average - a.vote_average);

      refresher?.target.complete();
      loading.dismiss();
    });
  }

  private initializeImage(): void {
    const img = this.posterImage.nativeElement;
    img.onload = () => {
      this.startScrollPoint = img.offsetHeight / 2;
      this.extractColors(img);
    };
    img.src = `https://image.tmdb.org/t/p/w500${this.highlightMovie?.poster_path}?netflix`;
  }

  private extractColors(img: HTMLImageElement) {
    const colorThief = new ColorThief();
    const rgbColors = colorThief.getColor(img);
    this.initialColor = rgbColors;
    this.backgroundColor = `rgb(${rgbColors.join(',')})`;
  }

  private updateNavbarColor(scrollTop: number): void {
    const startPoint = 150;
    const opacity = Math.min(scrollTop / startPoint, 0.7);
    this.headerBackgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }

  private updateBackgroundColor(scrollTop: number): void {
    if (scrollTop < this.startScrollPoint) {
      this.backgroundColor = `rgb(${this.initialColor.join(', ')})`;
      return;
    }

    const maxTransitionScroll = 300;
    const distanceScrolled = scrollTop - this.startScrollPoint;
    const progress = Math.min(distanceScrolled / maxTransitionScroll, 1);

    const finalColor = [0, 0, 0];
    const interpolatedColor = UtilsHelper.interpolateColor(
      this.initialColor,
      finalColor,
      progress
    );
    this.backgroundColor = `rgb(${interpolatedColor.join(',')})`;
  }

  onScroll(event: any): void {
    this.updateBackgroundColor(event.detail.scrollTop);
    this.updateNavbarColor(event.detail.scrollTop);
  }

  openDetails(movie: Movie) {
    this.router.navigate(['tabs/movie-details', movie.id]);
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
    this.searchTerm = '';
    this.searchResults = [];
  }

  filterMovies() {
    const term = this.searchTerm.toLowerCase();
    if (term.trim().length === 0) {
      this.searchResults = [];
      return;
    }
    this.searchResults = this.movies.filter((m) =>
      m.title.toLowerCase().includes(term)
    );
  }
}
