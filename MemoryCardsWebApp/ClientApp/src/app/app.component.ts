import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    localStorage.removeItem('access_token');
   console.log('window:unload');
  }

  /*@HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event) {
    localStorage.removeItem('access_token');
    console.log('window:beforeunload');
  }*/
}
