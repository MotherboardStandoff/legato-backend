import { ErrorCodes } from "../enum/error-codes";

export function getHttpErrorCode(error: any): number {

    switch (error) {
        case ErrorCodes.INVALID:
            return 400;
        case ErrorCodes.NOT_FOUND:
            return 404;
        default:
            return 500;
    }
}