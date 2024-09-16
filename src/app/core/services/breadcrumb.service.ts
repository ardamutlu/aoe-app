import {
  Injectable,
  signal,
  makeEnvironmentProviders,
  EnvironmentProviders,
} from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from '@models/breadcrumb.model';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs = signal<Breadcrumb[]>([]);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs = this.createBreadcrumbs(root);
        this.breadcrumbs.set(breadcrumbs);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const children: ActivatedRouteSnapshot[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    const child = children[0];
    const routeURL: string = child.url.map((segment) => segment.path).join('/');
    if (routeURL !== '') {
      url += `/${routeURL}`;
    }

    const title = child.routeConfig?.title as string;
    if (title) {
      breadcrumbs.push({ title, url });
    }

    return this.createBreadcrumbs(child, url, breadcrumbs);
  }
}

export function provideBreadcrumb(): EnvironmentProviders {
  return makeEnvironmentProviders([BreadcrumbService]);
}
