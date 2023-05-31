import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtGuard extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    return {
      userFullName: payload.username,
      userPhoneNumber: payload.phone,
      userEmail: payload.email,
      userType: payload.type,
      userCompanyName: payload.company,
      userMembers: payload.member,
      userRoles: payload.roles,
      Roles: payload.role,
      userBonusPoints: payload.points,
      userProfiles: payload.profile,
    };
  }
}
