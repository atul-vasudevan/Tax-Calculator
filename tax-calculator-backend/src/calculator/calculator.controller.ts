import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculateDto } from './dto/create-calculator.dto';

@Controller('v1/calculate')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  //This endpoint will be used to perform the tax calculations given the user input
  @Post('user/:id')
  async calculate(@Param('id') id: number ,@Body() calculateDto: CalculateDto) {
    return this.calculatorService.calculateTax(calculateDto, id);
  }

  @Get('user/:id')
  async fetchAllCalculations(@Param('id') id: number) {
    return this.calculatorService.fetchAll(id);
  }

  @Delete(':id')
  async deleteCalculation(@Param('id') id: number) {
    // Here I am going with hard delete. Another option is to add a deleted flag in the table and perform a soft delete operation
    return this.calculatorService.deleteCalcEntry(id);
  }
}
