import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { CalculatorController } from './calculator/calculator.controller';
import { CalculatorService } from './calculator/calculator.service';
import { CalculationHistory } from './calculator/entities/calculator.entity';
import { User } from './user/entities/user.entity';


// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       password: '1234',
//       username: 'atul',
//       entities: [User, CalculationHistory],
//       database: 'develop',
//       synchronize: true,
//       logging: true,
//     }),
//     CalculatorModule,
//     UserModule
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([CalculationHistory, User]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'atul',
        password: '1234',
        database: 'develop',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
        factories: [__dirname + '/factories/**/*{.ts,.js}'],
        cli: {
          migrationsDir: __dirname + '/migrations/',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, UserController, CalculatorController],
  providers: [AppService, UserService, CalculatorService],
})
export class AppModule {}


