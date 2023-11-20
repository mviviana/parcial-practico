import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { BusinessException } from '../exceptions/business.exception';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: BusinessException, host: ArgumentsHost): void;
}
