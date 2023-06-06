import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.ssoUrl,
        realm: environment.ssoRealm,
        clientId: environment.ssoClientId,
      },
      initOptions: {
        onLoad: 'login-required',
        enableLogging: true,
      },
    });
}
