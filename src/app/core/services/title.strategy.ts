import {
  EnvironmentProviders,
  inject,
  Injectable,
  makeEnvironmentProviders,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
class PageTitleStrategy extends TitleStrategy {
  readonly #title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.#title.setTitle(`Age of Empires | ${title}`);
    }
  }
}

export function provideTitleStrategy(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: TitleStrategy, useClass: PageTitleStrategy },
  ]);
}
