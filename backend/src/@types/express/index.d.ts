interface User {
  id: number;
  nome: string;
  usuario: string;
  admin: boolean;
}
declare namespace Express {
  export interface Request {
    user: User;
    files: any;
    file: any;
  }
}
