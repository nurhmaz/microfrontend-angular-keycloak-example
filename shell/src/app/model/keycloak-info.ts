export class KeycloakInfo {
  token: string | undefined;
  idToken: string | undefined;
  refreshToken: string | undefined;

  constructor(token: string, idToken: string | undefined, refreshToken: string | undefined) {
    this.token = token;
    this.idToken = idToken;
    this.refreshToken = refreshToken;
  }
}