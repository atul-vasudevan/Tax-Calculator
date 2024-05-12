import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationHistory } from './entities/calculator.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CalculationHistory, User]), UserModule],
    controllers: [CalculatorController],
    providers: [CalculatorService],
})
export class CalculatorModule {}
