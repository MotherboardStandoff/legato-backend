import { isUUID, length } from "class-validator";
import { Album } from "../data/entity/album";
import { HttpErrorCodes } from "../enum/error-codes";
import { getCustomRepository } from 'typeorm';
import { ArtistRepository } from "../data/repository/artist-repository";
import { ArtistDomain } from "./artist-domain";
import { GenreDomain } from "./genre-domain";
import { AlbumRepository } from "../data/repository/album-repository";

export class AlbumDomain {

    private readonly _MIN_NAME_LENGTH: number = 1;
    private readonly _MAX_NAME_LENGTH: number = 255;

    constructor() { }

    public saveAlbum(albumName: string, artistID: string, genreID: string): Promise<Album> {

        return new Promise(async (resolve, reject) => {
            try {

                // verify variables passed into the function
                if (!length(albumName, this._MIN_NAME_LENGTH, this._MAX_NAME_LENGTH)) throw (HttpErrorCodes.BAD_REQUEST);
                if (!isUUID(artistID)) throw (HttpErrorCodes.BAD_REQUEST);
                if (!isUUID(genreID)) throw (HttpErrorCodes.BAD_REQUEST);

                // verify artist exists
                let artistDomain = new ArtistDomain();
                let artistExists = await artistDomain.exists(artistID);
                if (!artistExists) throw (HttpErrorCodes.NOT_FOUND);

                //verify genre exists
                let genreDomain = new GenreDomain();
                let genreExists = await genreDomain.exists(genreID);
                if (!genreExists) throw (HttpErrorCodes.NOT_FOUND);

                let album = new Album(albumName, artistID, genreID);
                let albumRepo = getCustomRepository(AlbumRepository);

                let savedAlbum = await albumRepo.save(album);

                resolve(savedAlbum);
            }
            catch (err) {

                reject(err);
            }
        });
    }
}