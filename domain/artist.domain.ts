import { isUUID } from "class-validator";
import { getCustomRepository } from "typeorm";
import { Artist } from "../data/entity/artist";
import { ArtistRepository } from "../data/repository/artist.repository";

export class ArtistDomain {

    constructor() {
    }

    public createNewArtist(artistName: string): Promise<Artist> {

        return new Promise(async (resolve, reject) => {

            try {

                let repo = getCustomRepository(ArtistRepository);

                let artist = repo.create()

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

    public getArtistByID(artistID: string): Promise<Artist | undefined> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(artistID)) throw ('INVALID');

                let repo = getCustomRepository(ArtistRepository);

                let artist = await repo.findOne(artistID);

                resolve(artist);
            }
            catch (err) {

                reject(err);
            }
        });
    }
}