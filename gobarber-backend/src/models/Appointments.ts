import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Appointments {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => Users)
    @JoinColumn({ name: "provider_id" })
    provider: Users;

    @Column("timestamp with time zone")
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
