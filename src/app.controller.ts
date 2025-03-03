import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //POST /login
  @UseGuards(JwtAuthGuard)
  @Post('login')
  login(@Req() req): any{
    return req.user;
  }
  
@Get('protected')
getHelloProtected(): string{
  return this.appService.getHello();
}

}
