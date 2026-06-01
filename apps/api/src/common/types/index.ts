export type Role = 'admin' | 'brokerageManager' | 'agent';

export type GetUserType = {
  uid: string;
  roles: Role[];
};
