import { HttpErrorCodes } from "../enum/error-codes";

export function getHttpErrorCode(error: any): number {

    if(error in HttpErrorCodes) return error;

    return 500;
}