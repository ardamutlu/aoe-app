import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import NotFoundCardComponent from '@ui/not-found-card/not-found-card.component';
import { Unit } from '@models/units.model';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
  templateUrl: './units-detail.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, NotFoundCardComponent],
})
export default class UnitsDetailComponent implements OnInit {
  readonly unit = input<Unit | null>();
  readonly id = input<string | null>();
  readonly breadcrumbService = inject(BreadcrumbService);

  ngOnInit(): void {
    if (this.unit()) {
      const breadcrumbs = this.breadcrumbService.breadcrumbs();
      this.breadcrumbService.breadcrumbs.set(
        breadcrumbs.concat([{ title: this.unit()?.name, url: '' }]),
      );
    }
  }
}
