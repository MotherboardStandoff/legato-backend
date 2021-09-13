import { isUUID, validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { Artist } from "../data/entity/artist";
import { ArtistRepository } from "../data/repository/artist.repository";
import { ErrorCodes } from "../enum/error-codes";

export class ArtistDomain {

    constructor() {
    }

    public createNewArtist(artistName: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                let repo = getCustomRepository(ArtistRepository);

                let artist = repo.create();

                artist.name = artistName;

                let createdArtist = await repo.save(artist);

                resolve(createdArtist);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public getArtists(): Promise<Artist[]> {

        return new Promise(async (resolve, reject) => {

            try {

                let repo = getCustomRepository(ArtistRepository);

                let artists = await repo.find({ order: { name: 'ASC' } });

                resolve(artists);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public getArtistByID(artistID: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(artistID)) throw ('INVALID');

                let repo = getCustomRepository(ArtistRepository);

                let artist = await repo.findOne(artistID);

                if (!artist) throw (ErrorCodes.NOT_FOUND);

                resolve(artist);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public updateArtist(updatedArtist: Artist): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                let validationErr = await validate(updatedArtist);

                if (validationErr.length > 0) throw (ErrorCodes.INVALID);

                let repo = getCustomRepository(ArtistRepository);

                let artist = await repo.findOne(updatedArtist.id);

                if (!artist) {

                    throw (ErrorCodes.NOT_FOUND);
                }
                else {

                    artist.name = updatedArtist.name;

                    artist = await repo.save(artist);

                    resolve(artist);
                }
            }
            catch (err) {

                reject(err);
            }
        });
    }
}