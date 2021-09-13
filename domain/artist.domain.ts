import { getCustomRepository } from "typeorm";
import { ArtistEntity } from "../data/entity/artist.entity";
import { ArtistRepository } from "../data/repository/artist.repository";

export class ArtistDomain {

    constructor() { }

    public createNewArtist(artistName: string): Promise<ArtistEntity> {

        return new Promise(async (resolve, reject) => {

            try {

                let artistRepo = getCustomRepository(ArtistRepository);
                let artist = artistRepo.create()

                artist.name = artistName;

                let createdArtist = await artistRepo.save(artist);

                resolve(createdArtist);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}