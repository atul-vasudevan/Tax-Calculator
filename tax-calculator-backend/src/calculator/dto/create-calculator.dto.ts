import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsBoolean
  } from 'class-validator';
  
  export class CalculateDto {
    
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    superannuation: number;
  
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    income: number;
  
    @IsBoolean()
    super_included: boolean;

    user: number;
  }