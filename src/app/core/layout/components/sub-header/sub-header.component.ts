import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
})
export class SubHeaderComponent {
  readonly #breadcrumbService = inject(BreadcrumbService);
  breadcrumbs = this.#breadcrumbService.breadcrumbs;
}
