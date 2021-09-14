import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';
import { Length, IsUUID, IsDateString } from 'class-validator';
import { ILibraryObject } from '../interface/iLibrary-object';

@Entity({ name: 'genre' })
export class Genre implements ILibraryObject {

    @PrimaryGeneratedColumn('uuid', { name: 'ID' })
    @IsUUID()
    public id: string | undefined;

    @Column('varchar', { name: 'Name', nullable: false, length: 255 })
    @Length(1, 255)
    public name: string;

    @CreateDateColumn({ name: 'CreatedAt' })
    @IsDateString()
    public createdAt: string | undefined;

    @UpdateDateColumn({ name: 'UpdatedAt' })
    @IsDateString()
    public updatedAt: string | undefined;

    constructor(genreName: string) {
        this.name = genreName;
    }
}