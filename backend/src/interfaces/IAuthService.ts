export interface IAuthService {
  signup(email: string, password: string, role: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
}
