import { isUUID, length, Min } from "class-validator";
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

                // verify variables passed into the function
                if (!length(albumName, this._MIN_NAME_LENGTH, this._MAX_NAME_LENGTH)) throw (HttpErrorCodes.BAD_REQUEST);
                if (!isUUID(artistID)) throw (HttpErrorCodes.BAD_REQUEST);
                if (!isUUID(genreID)) throw (HttpErrorCodes.BAD_REQUEST);
                if (year <= this._MIN_YEAR) throw (HttpErrorCodes.BAD_REQUEST);

                // verify artist exists
                let artistDomain = new ArtistDomain();
                let artist = await artistDomain.getSingleArtist(artistID);
                if (!artist) throw (HttpErrorCodes.NOT_FOUND);

                //verify genre exists
                let genreDomain = new GenreDomain();
                let genre = await genreDomain.getSingleGenre(genreID);
                if (!genre) throw (HttpErrorCodes.NOT_FOUND);

                let album = new Album(albumName, year, artist, genre);
                let albumRepo = getCustomRepository(AlbumRepository);

                let savedAlbum = await albumRepo.save(album);

                resolve(savedAlbum);
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