export interface User {
  firstName: string;
  lastName: string;
  companies: Company[];
}

export interface Company {
  oid: string;
  name: string;
  uuid: string;
  current: boolean;
}
