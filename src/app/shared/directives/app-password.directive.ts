import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class AppPasswordDirective {
  private _passwordShown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

   public toggle(span: HTMLElement): void {
    this._passwordShown = !this._passwordShown;
    if (this._passwordShown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.classList.add('fa', 'fa-eye');
      span.classList.remove('fa-eye-slash');
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.classList.add('fa', 'fa-eye-slash');
      span.classList.remove('fa-eye');
    }
  }

  public setup(): void {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.setAttribute(
      'style', 'width: 5%; margin-left: -36px; cursor: pointer;');
    span.classList.add('fa', 'fa-eye-slash');
    span.addEventListener('click', () => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}
