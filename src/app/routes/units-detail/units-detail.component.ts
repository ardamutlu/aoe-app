import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import NotFoundCardComponent from '@ui/not-found-card/not-found-card.component';
import { Unit } from '@models/units.model';

@Component({
  templateUrl: './units-detail.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, NotFoundCardComponent],
})
export default class UnitsDetailComponent {
  readonly unit = input<Unit | null>();
  readonly id = input<string | null>();
}
