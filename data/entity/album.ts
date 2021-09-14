import { ILibraryObject } from '../interface/iLibrary-object';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Length, IsUUID } from 'class-validator';

@Entity({ name: 'album' })
export class Album implements ILibraryObject {

    @PrimaryGeneratedColumn('uuid', { name: 'ID' })
    @IsUUID()
    public id: string | undefined;

    @Column('uuid', { name: 'ArtistID', nullable: false })
    @IsUUID()
    public artistID: string;

    @Column('uuid', { name: 'GenreID', nullable: false })
    @IsUUID()
    public genreID: string;

    @Column('varchar', { name: 'Name' })
    @Length(1, 255)
    public name: string;

    @CreateDateColumn({ name: 'CreatedAt' })
    public createdAt: string | undefined;

    @UpdateDateColumn({ name: 'UpdatedAt' })
    public updatedAt: string | undefined;

    constructor(albumName: string, artistID: string, genreID: string) {

        this.name = albumName;
        this.artistID = artistID;
        this.genreID = genreID;
    }
}