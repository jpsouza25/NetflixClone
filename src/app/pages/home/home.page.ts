import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LoadingController, RefresherCustomEvent } from '@ionic/angular';
import ColorThief from 'colorthief';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie-service';
import { UtilsHelper } from 'src/app/utils/utils.helper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit {

  @ViewChild('posterImage') posterImage!: ElementRef<HTMLImageElement>;

  movies?: Movie[];
  highlightMovie?: Movie;

  backgroundColor: string = 'rgb(0, 0, 0)';
  headerBackgroundColor: string = 'rgba(0, 0, 0, 0)';

  private startScrollPoint = 0;
  private initialColor = [0, 0, 0];

  private movieService: MovieService = inject(MovieService)
  private loadingController = inject(LoadingController)
  constructor() { }


  ngAfterViewInit(): void {
    this.getMovies();
  }

  onScroll(event: any): void {
    this.updateBackgroundColor(event.detail.scrollTop);
    this.updateNavbarColor(event.detail.scrollTop);
  }

  async getMovies(refresher?: RefresherCustomEvent) {
    const loading = await this.loadingController.create();
    if (!refresher) {
      await loading.present();
    }

    this.movieService.getMovies().subscribe((data: any) => {
      console.log(data);
      this.movies = data;

      const randomIndex = Math.floor(Math.random() * this.movies!.length);
      this.highlightMovie = this.movies![randomIndex];
      this.initializeImage();

      refresher?.target.complete();
      loading.dismiss();
    });
  }

  private initializeImage(): void {
    const img = this.posterImage.nativeElement;
    img.onload = () => {
      this.startScrollPoint = img.offsetHeight / 2;
      this.extractColors(img);
    }
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
    this.headerBackgroundColor = `rgba[0, 0, 0, ${opacity}]`;
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
    const inteporlatedColor = UtilsHelper.interpolateColor(this.initialColor, finalColor, progress);
    this.backgroundColor = `rgb(${inteporlatedColor.join(',')})`;
  }
}
