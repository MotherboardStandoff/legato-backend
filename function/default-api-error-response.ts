import { Response } from 'express';
import { getHttpErrorCode } from './http-error-code';

export function defaultApiErrorResponse(error: any, res: Response): void {

    console.error(error);

    res.sendStatus(getHttpErrorCode(error));
}