import { isUUID, length } from "class-validator";
import { DeleteResult, getCustomRepository } from "typeorm";
import { Genre } from "../data/entity/genre";
import { GenreRepository } from "../data/repository/genre-repository";
import { ErrorCodes } from "../enum/error-codes";

export class GenreDomain {

    private readonly _MIN_NAME_LENGTH: number = 1;
    private readonly _MAX_NAME_LENGTH: number = 255;

    constructor() { }

    public getGenres(): Promise<Genre[]> {

        return new Promise(async (resolve, reject) => {

            try {

                let repo = getCustomRepository(GenreRepository);

                let genres = await repo.find({ order: { name: 'ASC' } });

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

        return new Promise(async (resolve, reject) => {

            try {

                if (!length(genreName.trim(), this._MIN_NAME_LENGTH, this._MAX_NAME_LENGTH)) throw (ErrorCodes.INVALID);

                let repo = getCustomRepository(GenreRepository);
                let genre = new Genre(genreName);

                genre = await repo.save(genre);

                resolve(genre);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public updateGenre(genreName: string, genreID: string): Promise<Genre> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!length(genreName.trim(), this._MIN_NAME_LENGTH, this._MAX_NAME_LENGTH)) throw (ErrorCodes.INVALID);
                if (!isUUID(genreID)) throw (ErrorCodes.INVALID);

                let repo = getCustomRepository(GenreRepository);

                let genre = await repo.findOne(genreID);

                if (!genre) throw (ErrorCodes.NOT_FOUND);

                genre.name = genreName;

                let updatedGenre = await repo.save(genre);

                resolve(updatedGenre);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public deleteGenre(genreID: string): Promise<DeleteResult> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(genreID)) throw (ErrorCodes.INVALID);

                let repo = getCustomRepository(GenreRepository);

                let genre = repo.findOne(genreID);

                if (!genre) throw (ErrorCodes.NOT_FOUND);

                let result = await repo.delete({ id: genreID });

                if (result.affected && result.affected == 0) throw (ErrorCodes.UNSUCCESSFUL);

                resolve(result);
            }
            catch (err) {

                reject(err);
            }
        });
    }
}