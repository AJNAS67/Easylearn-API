export interface userRegister {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
}

export interface userUpdate {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
}
export interface userLogin {
  email: string;
  password: string;
}
export interface payloadInterface {
  email: string;
  _id: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}
