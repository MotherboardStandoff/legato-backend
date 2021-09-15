import { ILibraryObject } from '../interface/iLibrary-object';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm';
import { Length, IsUUID, Min } from 'class-validator';
import { Artist } from './artist';
import { Genre } from './genre';

@Entity({ name: 'album' })
export class Album implements ILibraryObject {

    @PrimaryGeneratedColumn('uuid', { name: 'ID' })
    @IsUUID()
    public id: string | undefined;

    @Column('varchar', { name: 'Name' })
    @Length(1, 255)
    public name: string;

    @Column('integer', { name: 'Year', nullable: false })
    @Min(1900)
    public year: number;

    @CreateDateColumn({ name: 'CreatedAt' })
    public createdAt: string | undefined;

    @UpdateDateColumn({ name: 'UpdatedAt' })
    public updatedAt: string | undefined;

    @ManyToOne(() => Artist, artist => artist.albums)
    public artist: Artist;

    @ManyToOne(() => Genre, genre => genre.albums)
    public genre: Genre;

    constructor(albumName: string, year:number, artist: Artist, genre: Genre) {

        this.name = albumName;
        this.artist = artist;
        this.genre = genre;
        this.year = year;
    }
}