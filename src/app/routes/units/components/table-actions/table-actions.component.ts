import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Unit } from '@models/units.model';

@Component({
  templateUrl: './table-actions.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatIconButton],
})
export default class TableActionsComponent {
  readonly value = input<Unit>();
  readonly #router: Router = inject(Router);

  onDetailClick(): void {
    const { url } = this.#router;
    this.#router.navigate([`${url}/detail/${this.value()?.id}`]);
  }
}
