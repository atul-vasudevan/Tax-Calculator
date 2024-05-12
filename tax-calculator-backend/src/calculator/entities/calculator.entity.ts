import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class CalculationHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.calculation_history)
    user: User;

    @Column()
    super: number;

    @Column()
    income: number;

    @Column()
    super_included: boolean;

    @Column({type: 'json'})
    calculated_value: any;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;
}