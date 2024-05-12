import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculateDto } from './dto/create-calculator.dto';

@Controller('v1/calculate/user')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post(':id')
  async calculate(@Param('id') id: number ,@Body() calculateDto: CalculateDto) {
    return this.calculatorService.calculateTax(calculateDto, id);
  }

  @Get(':id')
  async fetchAllCalculations(@Param('id') id: number) {
    return this.calculatorService.fetchAll(id);
  }
}
