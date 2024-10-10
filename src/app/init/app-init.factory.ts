import { KeycloakEventType, KeycloakService } from 'keycloak-angular';

import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';

export function initApp(
  configService: ConfigService,
  userService: UserService,
  keycloak: KeycloakService
) {
  return () =>
    new Promise((resolve, reject) => {
      configService.load().then(() => {
        keycloak
          .init({
            config: {
              url: configService.sso?.url,
              realm: configService.sso!!.realm,
              clientId: configService.sso!!.clientId,
            },
            initOptions: {
              onLoad: 'login-required',
              enableLogging: true,
            },
          })
          .then(() => resolve(true));
      });
      keycloak.keycloakEvents$.subscribe({
        next: (event) => {
          if (KeycloakEventType.OnAuthSuccess == event.type) {
            userService.getCurrentUser(true).subscribe();
          }
        },
      });
    });
}
