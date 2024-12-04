import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      let token = req.cookies['access_token'];

      if (!token) {
        throw new UnauthorizedException('Token not found in cookies');
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
