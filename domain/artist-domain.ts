import { isUUID, length, validate, ValidationError } from "class-validator";
import { DeleteResult, getCustomRepository } from "typeorm";
import { Artist } from "../data/entity/artist";
import { ArtistRepository } from "../data/repository/artist-repository";
import { HttpErrorCodes } from "../enum/error-codes";

export class ArtistDomain {

    constructor() {}

    public saveArtist(artistName: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                let artist: Artist = new Artist(artistName.trim());

                // verify new artist entity
                let validErrs = await validate(artist, { skipUndefinedProperties: true }); //skip undifined props, we only want to check the passed in values

                if (validErrs.length > 0) throw HttpErrorCodes.BAD_REQUEST; // if passed in values are incorrect, throw bad request

                artist = await getCustomRepository(ArtistRepository).save(artist); // store artist in db, return inserted artist as entity

                resolve(artist);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public getArtists(): Promise<Artist[]> {

        return new Promise(async (resolve, reject) => {

            try {

                let artists = await getCustomRepository(ArtistRepository).find({ order: { name: 'ASC' } });

                resolve(artists);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public getSingleArtist(artistID: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(artistID)) throw (HttpErrorCodes.BAD_REQUEST);

                let artist = await getCustomRepository(ArtistRepository).findOne(artistID);

                if (!artist) throw (HttpErrorCodes.NOT_FOUND);

                resolve(artist);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public getSingleArtistAndAlbums(artistID: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(artistID)) throw (HttpErrorCodes.BAD_REQUEST);

                let artist = await getCustomRepository(ArtistRepository).findOne(artistID, { relations: ['albums', 'albums.genre'] });

                if (!artist) throw (HttpErrorCodes.NOT_FOUND);

                if (artist.albums && artist.albums.length > 1) artist.albums = artist.albums.sort((a, b) => a.year > b.year ? 1 : -1); // sort albums by year

                resolve(artist);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public updateArtist(artistID: string, artistName: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(artistID)) throw (HttpErrorCodes.BAD_REQUEST); //verify artist ID

                let artistRepo = getCustomRepository(ArtistRepository);

                let artist = await artistRepo.findOne(artistID);

                if (!artist) throw (HttpErrorCodes.NOT_FOUND);

                artist.name = artistName.trim();

                let valErr: ValidationError[] = await validate(artist);

                console.log(valErr);

                if (valErr.length > 0) throw HttpErrorCodes.BAD_REQUEST;

                artist = await artistRepo.save(artist);

                resolve(artist);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public deleteArtist(artistID: string): Promise<DeleteResult> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(artistID)) throw (HttpErrorCodes.BAD_REQUEST);

                let repo = getCustomRepository(ArtistRepository);

                let artist = await repo.findOne(artistID);

                if (!artist) throw (HttpErrorCodes.NOT_FOUND);

                let result = await repo.delete({ id: artist.id });

                resolve(result);
            }
            catch (err) {

                reject(err);
            }
        });
    }
}