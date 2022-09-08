import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    publicKey: string;

    @Column()
    privateKey: string;

    @Column()
    mnemonic: string;

}