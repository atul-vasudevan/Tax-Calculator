// src/calculator/calculator.service.ts
import { Injectable } from '@nestjs/common';
import { CalculateDto } from './dto/create-calculator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CalculationHistory } from './entities/calculator.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectRepository(CalculationHistory) private readonly calculateHistory: Repository<CalculationHistory>,
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly userService: UserService)
  {}

  async calculateTax(calculateDto: CalculateDto, user_id: number): Promise<CalculationHistory> {
    const calculationHistory: CalculationHistory = new CalculationHistory();

    const user = await this.user.findOne({where: {id: user_id}});
    if (!user) {
      throw new Error('User not found');
    }
    let gross = 0;
    let superannuation = 0;
    const income = calculateDto.income;
    if (calculateDto.super_included) {
        superannuation = (income * calculateDto.superannuation)/100;
        gross = income - superannuation;
    } else {
      gross = income;
      superannuation = (gross * calculateDto.superannuation)/100;
    }

    const taxableIncome = gross;
    let taxAmount = 0;

    if (taxableIncome <= 18200) {
      taxAmount = 0;
    } else if (taxableIncome <= 45000) {
      taxAmount = (taxableIncome - 18200) * 0.19;
    } else if (taxableIncome <= 120000) {
      taxAmount = 5092 + (taxableIncome - 45000) * 0.325;
    } else if (taxableIncome <= 180000) {
      taxAmount = 29467 + (taxableIncome - 120000) * 0.37;
    } else {
      taxAmount = 54232 + (taxableIncome - 180000) * 0.45;
    }

    const netIncome = gross - taxAmount;

    calculationHistory.super = calculateDto.superannuation;
    calculationHistory.income = calculateDto.income;
    calculationHistory.super_included = calculateDto.super_included;
    calculationHistory.user = user;
    calculationHistory.created = new Date();
    calculationHistory.calculated_value = {
      "gross": gross,
      "superannuation": superannuation,
      "tax_amount": taxAmount.toFixed(2),
      "income_after_tax": netIncome,
      "income_after_tax_super": netIncome + superannuation,
    }

    return this.calculateHistory.save(calculationHistory);
  }

  async fetchAll(id: number): Promise<CalculationHistory[]> {
    const user = await this.userService.findById(id);
    return await this.calculateHistory.find({ where: { user: user } });
  }

  async deleteCalcEntry(id: number): Promise<DeleteResult> {
    return await this.calculateHistory.delete(id);
  }
}