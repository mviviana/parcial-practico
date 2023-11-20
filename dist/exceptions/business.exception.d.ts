import { HttpStatus } from '@nestjs/common';
export declare class BusinessException extends Error {
    private readonly status;
    constructor(message: string, status: HttpStatus);
    getStatus(): HttpStatus;
}
