import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { secretKey } from "./constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: any) {
    try {
      if (!payload || !payload.sub || !payload.email) {
        throw new UnauthorizedException("Invalid token payload");
      }
      return { userId: payload.sub, email: payload.email };
    } catch (error) {
      throw new UnauthorizedException("Token validation failed");
    }
  }
}
