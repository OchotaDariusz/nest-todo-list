import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  JWT_SECRET: string;
}

export class JwtConfig {
  static _secret: string;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    JwtConfig._secret = configService.get('JWT_SECRET');
  }
}
