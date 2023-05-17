import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: 'https://sso.synercom.pe/auth',
          realm: 'demo',
          clientId: 'localhost-test',
        },
        initOptions: {
            onLoad: 'login-required',
            enableLogging: true
        }
      });
}
