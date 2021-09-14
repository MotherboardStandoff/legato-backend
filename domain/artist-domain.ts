import { isUUID, length } from "class-validator";
import { DeleteResult, getCustomRepository } from "typeorm";
import { Artist } from "../data/entity/artist";
import { ArtistRepository } from "../data/repository/artist-repository";
import { ErrorCodes } from "../enum/error-codes";

export class ArtistDomain {

    private readonly MIN_NAME_LENGTH: number = 1;
    private readonly MAX_NAME_LENGTH: number = 255;

    constructor() {
    }

    public saveArtist(artistName: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                let nameLengthOk: boolean = length(artistName.trim(), this.MIN_NAME_LENGTH, this.MAX_NAME_LENGTH);

                if (!nameLengthOk) throw (ErrorCodes.INVALID);

                let repo = getCustomRepository(ArtistRepository);

                let artist = new Artist(artistName);

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

    public updateArtist(artistID: string, artistName: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(artistID)) throw (ErrorCodes.INVALID); //verify artist ID

                if (!length(artistName.trim(), this.MIN_NAME_LENGTH, this.MAX_NAME_LENGTH)) throw (ErrorCodes.INVALID); //verify artist name length

                let repo = getCustomRepository(ArtistRepository);

                let artist = await repo.findOne(artistID);

                if (!artist) throw (ErrorCodes.NOT_FOUND);

                artist.name = artistName;

                artist = await repo.save(artist);

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

                if (!isUUID(artistID)) throw (ErrorCodes.INVALID);

                let repo = getCustomRepository(ArtistRepository);

                let artist = await repo.findOne(artistID);

                if (!artist) throw (ErrorCodes.NOT_FOUND);

                let result = await repo.delete({ id: artist.id });

                resolve(result);
            }
            catch (err) {

                reject(err);
            }
        });
    }
}