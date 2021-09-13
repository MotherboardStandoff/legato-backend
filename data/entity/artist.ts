import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';
import { Length, IsUUID } from 'class-validator';
import { ILibraryObject } from '../interface/iLibrary-object';

@Entity({ name: 'artist' })
export class Artist implements ILibraryObject {

    @PrimaryGeneratedColumn('uuid', { name: 'ID' })
    @IsUUID()
    public id: string | undefined;

    @Column('varchar', { name: 'Name', nullable: false, length: 255 })
    @Length(1, 255)
    public name: string;

    @CreateDateColumn({ name: 'CreatedAt' })
    public createdAt: string | undefined;

    @UpdateDateColumn({ name: 'UpdatedAt' })
    public updatedAt: string | undefined;

    constructor(artistName: string, id?: string, createdAt?: string, updatedAt?: string) {
        this.name = artistName;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}