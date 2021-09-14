import { isUUID } from "class-validator";
import { getCustomRepository } from "typeorm";
import { Genre } from "../data/entity/genre";
import { GenreRepository } from "../data/repository/genre-repository";
import { ErrorCodes } from "../enum/error-codes";

export class GenreDomain {

    constructor() { }

    public getGenres(): Promise<Genre[]> {

        return new Promise(async (resolve, reject) => {

            try {

                let repo = getCustomRepository(GenreRepository);

                let genres = await repo.find();

                resolve(genres);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public getGenreByID(genreID: string): Promise<Genre> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(genreID)) throw (ErrorCodes.INVALID);

                let repo = getCustomRepository(GenreRepository);

                let genre = await repo.findOne(genreID);

                if (!genre) throw (ErrorCodes.NOT_FOUND);

                resolve(genre);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public saveGenre(genreName: string): Promise<Genre> {

        return new Promise(async (resolve, reject) => { });
    }
}