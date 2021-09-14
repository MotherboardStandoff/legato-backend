import { EntityRepository, Repository } from "typeorm";
import { Artist } from "../entity/artist";

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {

    public getArtistByName(artistName: string): Promise<Artist[]> {

        return new Promise(async (resolve, reject) => {

            try {

                let artists = await this.find({ where: { name: artistName } });

                resolve(artists);
            }
            catch (err) {

                reject(err);
            }
        });
    }
}