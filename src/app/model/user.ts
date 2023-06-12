export interface User {
  firstName: string;
  lastName: string;
  companies: Company[];
}

export interface Company {
  name: string;
  uuid: string;
  current: boolean;
}
