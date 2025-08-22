export interface RgpdRequest {
  requestType: 'access' | 'rectification' | 'deletion' | 'portability' | 'opposition';
  email: string;
  reason?: string;
}
