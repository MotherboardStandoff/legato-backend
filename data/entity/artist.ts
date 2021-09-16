import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from 'typeorm';
import { Length, IsUUID, IsDate } from 'class-validator';
import { ILibraryObject } from '../interface/iLibrary-object';
import { Album } from './album';

@Entity({ name: 'artist' })
export class Artist implements ILibraryObject {

    @PrimaryGeneratedColumn('uuid', { name: 'ID' })
    @IsUUID()
    public id: string | undefined;

    @Column('varchar', { name: 'Name', nullable: false, length: 255 })
    @Length(1, 255)
    public name: string;

    @CreateDateColumn({ name: 'CreatedAt' })
    @IsDate()
    public createdAt: string | undefined;

    @UpdateDateColumn({ name: 'UpdatedAt' })
    @IsDate()
    public updatedAt: string | undefined;

    @OneToMany(() => Album, album => album.artist)
    public albums: Album[] | undefined;

    constructor(artistName: string) {
        this.name = artistName;
    }
}