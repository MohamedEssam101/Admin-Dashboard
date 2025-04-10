export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  role: 'admin' | 'moderator' | 'user';
  //
}
