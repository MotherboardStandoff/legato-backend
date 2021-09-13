import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';
import { Length, IsUUID } from 'class-validator';
import { ILibraryObject } from '../interface/iLibrary-object';

@Entity({ name: 'artist' })
export class ArtistEntity implements ILibraryObject {

    @PrimaryGeneratedColumn('uuid', { name: 'ID' })
    @IsUUID()
    public id: string = '';

    @Column('varchar', { name: 'Name', nullable: false, length: 255 })
    @Length(1, 255)
    public name: string;

    @CreateDateColumn({ name: 'CreatedAt' })
    public createdAt: string = '';

    @UpdateDateColumn({ name: 'UpdatedAt' })
    public updatedAt: string = '';

    constructor(artistName: string) {
        this.name = artistName;
    }
}