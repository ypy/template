import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: any) {

  }
  public isScroll = false;
  title = 'demo';

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (scrollTop > 50) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }
}
