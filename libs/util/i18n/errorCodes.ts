export const ErrorCodes = {
  AuthNoToken: 'AUTH_NO_TOKEN',
  AuthInvalidToken: 'AUTH_INVALID_TOKEN',
  AuthInvalidCredentials: 'AUTH_INVALID_CREDENTIALS',
  UserEmailAlreadyExists: 'USER_EMAIL_ALREADY_EXISTS',
  AgentCreateFailed: 'AGENT_CREATE_FAILED',
  AgentNotFound: 'AGENT_NOT_FOUND',
  BrokerageNotFoundForManager: 'BROKERAGE_NOT_FOUND_FOR_MANAGER',
  Unknown: 'UNKNOWN',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
