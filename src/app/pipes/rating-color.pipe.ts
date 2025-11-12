import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingColor',
  standalone: true
})
export class RatingColorPipe implements PipeTransform {
  transform(rating?: number): string {
    if (rating === undefined || rating === null) return 'white';

    if (rating >= 7.5) return '#4CAF50';
    if (rating >= 5) return '#FFC107';   
    return '#F44336';                  
  }
}
