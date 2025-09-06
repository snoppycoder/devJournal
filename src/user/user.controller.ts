import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt.authguard';
@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/write')
  @UseGuards(JwtAuthGuard)
  async writeJournal(@Body() body: { content: string }, @Request() req) {
    console.log(req.user);
    const response = await this.userService.writeJournal(
      body.content,
      req.user['id'],
    );
    return response;
  }
  @Get('/entries')
  @UseGuards(JwtAuthGuard)
  async getMyJournals(@Request() req) {
    const response = await this.userService.getMyJournals(req.user['id']);
    return response;
  }
  @Post('/like')
  @UseGuards(JwtAuthGuard)
  async likeAJournal(@Body() body: { journalId: number }, @Request() req) {
    const response = await this.userService.likeAJournal(
      req.user['id'],
      body.journalId,
    );
    return response;
  }
  @Post('/dislike')
  @UseGuards(JwtAuthGuard)
  async DisLikeAJournal(@Body() body: { journalId: number }, @Request() req) {
    const response = await this.userService.DisLikeAJournal(
      req.user['id'],
      body.journalId,
    );
    return response;
  }
}
