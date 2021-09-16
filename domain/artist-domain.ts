import { isUUID, length } from "class-validator";
import { DeleteResult, getCustomRepository } from "typeorm";
import { Artist } from "../data/entity/artist";
import { ArtistRepository } from "../data/repository/artist-repository";
import { HttpErrorCodes } from "../enum/error-codes";

export class ArtistDomain {

    private readonly MIN_NAME_LENGTH: number = 1;
    private readonly MAX_NAME_LENGTH: number = 255;

    constructor() {
    }

    public saveArtist(artistName: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                let nameLengthOk: boolean = length(artistName.trim(), this.MIN_NAME_LENGTH, this.MAX_NAME_LENGTH);

                if (!nameLengthOk) throw (HttpErrorCodes.BAD_REQUEST);

                let repo = getCustomRepository(ArtistRepository);

                let artist = new Artist(artistName.trim());

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

    public getSingleArtist(artistID: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(artistID)) throw (HttpErrorCodes.BAD_REQUEST);

                let repo = getCustomRepository(ArtistRepository);

                let artist = await repo.findOne(artistID);

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

                let repo = getCustomRepository(ArtistRepository);

                let artist = await repo.findOne(artistID, { relations: ['albums', 'albums.genre'] });

                if (!artist) throw (HttpErrorCodes.NOT_FOUND);

                if(artist.albums && artist.albums.length > 1) artist.albums = artist.albums.sort((a, b) => a.year > b.year ? 1 : -1);

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

                if (!length(artistName.trim(), this.MIN_NAME_LENGTH, this.MAX_NAME_LENGTH)) throw (HttpErrorCodes.BAD_REQUEST); //verify artist name length

                let repo = getCustomRepository(ArtistRepository);

                let artist = await repo.findOne(artistID);

                if (!artist) throw (HttpErrorCodes.NOT_FOUND);

                artist.name = artistName.trim();

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