import { messages } from './messages';
import { ErrorCode, ErrorCodes } from './errorCodes';

type ErrorCatalog = Record<ErrorCode, string> & { UNKNOWN: string };

const _ptBrErrorCatalog: ErrorCatalog = messages['pt-BR'].apiErrors;
const _enUsErrorCatalog: ErrorCatalog = messages['en-US'].apiErrors;

const _unknownCode: ErrorCode | 'UNKNOWN' = ErrorCodes.Unknown;

void _ptBrErrorCatalog;
void _enUsErrorCatalog;
void _unknownCode;
