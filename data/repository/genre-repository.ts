import { EntityRepository, Repository } from "typeorm";
import { Genre } from "../entity/genre";

@EntityRepository(Genre)
export class GenreRepository extends Repository<Genre>{

}