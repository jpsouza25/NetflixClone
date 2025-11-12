import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeart]',
  standalone: true,
})
export class HeartDirective {
  private isActive = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  toggleHeart(event: Event) {
    event.stopPropagation();
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }
}
