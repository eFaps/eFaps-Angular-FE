// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: '1.0.0-dev',
  xapiHostname: 'http://localhost:8080',
  apiHostname: 'https://pu.synercom.pe',
  apiBaseUrl: '/api',
  sso: {
    url: 'https://sso.synercom.pe/auth',
    realm: 'SynerCOM',
    clientId: 'app',
  },
};
