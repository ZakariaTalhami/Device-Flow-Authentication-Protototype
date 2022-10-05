export interface IDeviceTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires: number;
  scope?: string;
}
