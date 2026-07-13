import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-codes';

export type ErrorResponse = {
  code: ErrorCode;
  message: string;
};

export const buildErrorResponse = (
  code: ErrorCode,
  message: string,
): ErrorResponse => ({
  code,
  message,
});

export const appException = (
  status: HttpStatus,
  code: ErrorCode,
  message: string,
) => {
  return new HttpException(buildErrorResponse(code, message), status);
};
