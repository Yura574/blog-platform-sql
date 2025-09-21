import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    login: string

    @Column()
    password: string

    @Column({unique:true})
    email: string
}