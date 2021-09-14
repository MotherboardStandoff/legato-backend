import { EntityRepository, Repository } from "typeorm";
import { Album } from "../entity/album";

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album>{

}