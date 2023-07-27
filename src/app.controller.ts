import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers() {
    return this.appService.getAllUsers();
  }


  @Post()
  async createScore(@Body() data: { name: string; pontuation: number }) {
    try {
      const user = await this.appService.createUserPontuation(data.name, data.pontuation);
      return user;
    } catch (error) {
      return { error: 'Erro ao criar usuário com pontuação.' };
    }
  }
}
