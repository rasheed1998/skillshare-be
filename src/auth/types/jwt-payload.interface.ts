export interface JwtPayload {
  sub: number;
  email: string;
  role: 'user' | 'provider';
}
