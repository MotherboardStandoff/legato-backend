import { isUUID, length, Min, validate, ValidationError } from "class-validator";
import { Album } from "../data/entity/album";
import { HttpErrorCodes } from "../enum/error-codes";
import { getCustomRepository } from 'typeorm';
import { ArtistDomain } from "./artist-domain";
import { GenreDomain } from "./genre-domain";
import { AlbumRepository } from "../data/repository/album-repository";

export class AlbumDomain {

    private readonly _MIN_NAME_LENGTH: number = 1;
    private readonly _MAX_NAME_LENGTH: number = 255;
    private readonly _MIN_YEAR: number = 1900;

    constructor() { }

    public saveAlbum(albumName: string, year: number, artistID: string, genreID: string): Promise<Album> {

        return new Promise(async (resolve, reject) => {
            try {

                // verify passed in IDs                
                if (!isUUID(artistID)) throw (HttpErrorCodes.BAD_REQUEST);
                if (!isUUID(genreID)) throw (HttpErrorCodes.BAD_REQUEST);

                // get artist and genre entities
                let artist = await new ArtistDomain().getSingleArtist(artistID);
                if (!artist) throw (HttpErrorCodes.NOT_FOUND); // if no artist is found, throw error

                let genre = await new GenreDomain().getSingleGenre(genreID);
                if (!genre) throw (HttpErrorCodes.NOT_FOUND); // if no genre is found, throw error

                // create new album entity
                let album = new Album(albumName, year, artist, genre);

                // validate new album entity
                let valErrs: ValidationError[] = await validate(album);
                if (valErrs.length > 0) throw HttpErrorCodes.BAD_REQUEST; // if there are errors in the entity, send bad request

                album = await getCustomRepository(AlbumRepository).save(album);// store new album entity in the DB, return created DB entry as album entity

                resolve(album);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public getAlbums(): Promise<Album[]> {
        return new Promise(async (resolve, reject) => {

            try {

                let repo = getCustomRepository(AlbumRepository);

                let albums = await repo.find({ relations: ['artist', 'genre'] });

                resolve(albums);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public deleteAlbumsByArtist(artistID: string): Promise<Album[]> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(artistID)) throw HttpErrorCodes.BAD_REQUEST;

                let artist = await new ArtistDomain().getSingleArtistAndAlbums(artistID);

                if (!artist) throw HttpErrorCodes.NOT_FOUND;

                let repo = getCustomRepository(AlbumRepository);

                let deletedAlbums: Album[] = [];

                if (artist.albums) deletedAlbums = await repo.remove(artist.albums);

                resolve(deletedAlbums);

            }
            catch (err) {

                reject(err);
            }
        });
    }
}