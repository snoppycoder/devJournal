import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'Cjwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'RANDOMSECRETFORNOW',
    });
  }

  async validate(payload: any) {
    // whatever you return here will be attached to req.user

    return { id: payload.id, name: payload.name };
  }
}
