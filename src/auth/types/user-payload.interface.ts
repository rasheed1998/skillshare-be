export interface JwtUserPayload {
  id: number;
  email: string;
  role: 'user' | 'provider';
}
