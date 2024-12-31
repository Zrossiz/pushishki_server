import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers['api-key'];

    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
