import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';

type AuthSignUpResponse = {
  success: Boolean;
  message: String;
};
type AuthSignInResponse = {
  token?: String;
  success: Boolean;
  message: String;
};
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async createUser(
    name: string,
    password: string,
  ): Promise<AuthSignUpResponse> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });
    if (createdUser) {
      return {
        success: true,
        message: 'Successfully created a user',
      };
    }
    return {
      success: false,
      message: 'Error when trying to created a user',
    };
  }
  async login(name: string, password: string): Promise<AuthSignInResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
    });
    if (!user) {
      return {
        token: null,
        success: false,
        message: 'You have entered a wrong name',
      };
    }
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      return {
        token: null,
        success: false,
        message: 'You have entered a wrong password',
      };
    }
    const payload = {
      name,
      id: user.id,
    };
    const token = this.jwtService.sign(payload);
    return {
      token,
      success: true,
      message: 'You have successfully logged in',
    };
  }
}
