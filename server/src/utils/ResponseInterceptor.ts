import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((response: any) => {
        const successMessage = response.message || 'Request successful';

        return {
          status: 'success',
          message: successMessage,
          data: response.data !== undefined ? response.data : response,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
