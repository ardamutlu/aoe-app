import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [HeaderComponent, SubHeaderComponent, ContentComponent],
})
export class LayoutComponent {}
