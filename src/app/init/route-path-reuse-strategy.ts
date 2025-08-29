import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
} from '@angular/router';

export class RoutePathReuseStrategy extends BaseRouteReuseStrategy {
  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ): boolean {
    // reload dashboard case
    if (
      future.routeConfig &&
      curr.routeConfig &&
      future.routeConfig.path == curr.routeConfig.path &&
      future.routeConfig.path == 'dashboard'
    ) {
      return false;
    }

    // table and forms by id
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
