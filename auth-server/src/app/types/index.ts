export type DeviceCodeBody = {
  client_id: string;
};

export type DeviceTokenRequestBody = DeviceCodeBody & {
  device_code: string;
};
