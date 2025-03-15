import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUser: CreateUserDto) {
    const user = await this.userService.findOne(createUser.email);
    if (user) throw new ConflictException('User Exist');
    return this.userService.create(createUser);
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.userService.findOneAuth(loginDto.email);
    if (!user) throw new NotFoundException('User not found');

    const comparePass = await bcrypt.compare(loginDto.password, user.password);
    if (!comparePass) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
