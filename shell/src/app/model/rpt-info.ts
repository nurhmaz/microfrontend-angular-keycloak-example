
interface Permission {
  rsid: string;
  rsname: string;
  scopes: string[];
}

interface Authorization {
  permissions: Permission[];
}

export interface RPTInfo {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  authorization?: Authorization;
}
