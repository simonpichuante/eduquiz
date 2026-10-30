import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AnswerGameDto, StartGameDto } from './dto/game.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('start')
  @UseGuards(JwtAuthGuard)
  start(@Body() dto: StartGameDto) {
    return this.gamesService.startGame(dto);
  }

  @Post(':id/answer')
  @UseGuards(JwtAuthGuard)
  answer(@Param('id') id: string, @Body() dto: AnswerGameDto) {
    return this.gamesService.submitAnswer(id, dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }
}
