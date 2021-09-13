import { EntityRepository, Repository } from "typeorm";
import { ArtistEntity } from "../entity/artist.entity";

@EntityRepository(ArtistEntity)
export class ArtistRepository extends Repository<ArtistEntity> {

}