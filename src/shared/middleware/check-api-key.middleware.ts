import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckApiKey implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-key'] !== process.env.API_KEY) {
      throw new UnauthorizedException();
    }

    next();
  }
}
