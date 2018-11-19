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

  title = 'demo';
  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log(this.document.body.scrollTop);
  }
}
