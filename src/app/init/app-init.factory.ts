import { KeycloakService } from 'keycloak-angular';

import { ConfigService } from '../services/config.service';

export function initApp(
  configService: ConfigService,
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
    });
}
