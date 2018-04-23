import { Directive, HostListener, Output, EventEmitter, Input, ElementRef} from '@angular/core';

@Directive({
  selector: '[appTouchLoading]'
})
export class TouchLoadingDirective {
  @Output() canLoad = new EventEmitter();
  @Input('appTouchLoading') scrollListening: boolean;
  nativeElem: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.nativeElem = this.elementRef.nativeElement
  }

  @HostListener('scroll') onScroll() {
    if (!this.scrollListening) return;
    if (this.nativeElem.offsetHeight + this.nativeElem.scrollTop >= this.nativeElem.scrollHeight) {
      this.canLoad.emit();
    }
  }
}
