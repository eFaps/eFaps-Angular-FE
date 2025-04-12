import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
} from '@angular/router';

export class RoutePathReuseStrategy extends BaseRouteReuseStrategy {
  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ): boolean {
    if (
      future.params &&
      future.params['id'] &&
      curr.params &&
      curr.params['id']
    ) {
      return future.params['id'] == curr.params['id'];
    }
    return super.shouldReuseRoute(future, curr);
  }
}
