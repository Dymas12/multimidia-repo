import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllProducts() {
    return this.appService.getAllProducts();
  }

@Post()
  async createProducts(@Body() data: any) {
    try {
      const user = await this.appService.createProduct(data.name, data.description , data.image ,data.price );
      return user;
    } catch (error) {
      return { error: 'Erro ao criar usuário com pontuação.' };
    }
  }
}
