import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, RouterOutlet],
  templateUrl: './root.component.html',
  styleUrl: './root.component.less'
})
export class RootComponent {
  

}
