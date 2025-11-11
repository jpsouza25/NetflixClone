import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import ColorThief from 'colorthief';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit {

  @ViewChild('posterImage') posterImage!: ElementRef<HTMLImageElement>;

  backgroundColor: String = 'rgb(0, 0, 0)';

  private startScrollPoint = 0;
  private initialColor = [0, 0, 0];


  constructor() { }

  ngAfterViewInit(): void {
    this.initializeImage();
  }

  onScroll(event:any): void {
    this.updateBackgroundColor(event.detail.scrollTop);
  }

  private initializeImage(): void {
    const img = this.posterImage.nativeElement;
    img.onload = () => {
    this.startScrollPoint = img.offsetHeight / 2;
    this.extractColors(img);
    }
  }

  private extractColors(img: HTMLImageElement) {
    const colorThief = new ColorThief();
    const rgbColors = colorThief.getColor(img);
    this.initialColor = rgbColors;
    this.backgroundColor = `rgb(${rgbColors.join(',')})`;
  }

  private updateBackgroundColor(scrollTop: number): void {
    if (scrollTop < this.startScrollPoint) {
      this.backgroundColor = `rgb(${this.initialColor.join(', ')})`;
      return;
    }

    const maxTransitionScroll = 300;
    const distanceScrolled = scrollTop - this.startScrollPoint;
    const percentage = Math.min(distanceScrolled / maxTransitionScroll, 1);

    const finalColor = [0, 0, 0];
    const r = Math.round(this.initialColor[0] + (finalColor[0] - this.initialColor[0] * percentage));
    const g = Math.round(this.initialColor[1] + (finalColor[1] - this.initialColor[1] * percentage));;
    const b = Math.round(this.initialColor[2] + (finalColor[2] - this.initialColor[2] * percentage));;

    this.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
}
