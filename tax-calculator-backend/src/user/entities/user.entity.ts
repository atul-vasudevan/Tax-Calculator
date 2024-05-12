import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CalculationHistory } from "src/calculator/entities/calculator.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    user_uuid: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @OneToMany(() => CalculationHistory, calculation_history => calculation_history.user)
    calculation_history: CalculationHistory[];
}