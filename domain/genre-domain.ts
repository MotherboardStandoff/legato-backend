import { isUUID, length } from "class-validator";
import { DeleteResult, getCustomRepository } from "typeorm";
import { Album } from "../data/entity/album";
import { Genre } from "../data/entity/genre";
import { GenreRepository } from "../data/repository/genre-repository";
import { HttpErrorCodes } from "../enum/error-codes";

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

    public getSingleGenre(genreID: string): Promise<Genre> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID(genreID)) throw (HttpErrorCodes.BAD_REQUEST);

                let repo = getCustomRepository(GenreRepository);

                let genre = await repo.findOne(genreID);

                if (!genre) throw (HttpErrorCodes.NOT_FOUND);

                resolve(genre);
            }
            catch (err) {

                reject(err);
            }
        });
    }

    public getSingleGenreAndAlbums(genreID: string): Promise<Genre> {

        return new Promise(async (resolve, reject) => {

            try {

                if (!isUUID) throw HttpErrorCodes.BAD_REQUEST;

                let genre = await getCustomRepository(GenreRepository).findOne({ where: { id: genreID }, relations: ['albums', 'albums.artist'] });

                if (!genre) throw HttpErrorCodes.NOT_FOUND;

                if (genre.albums && genre.albums.length > 1) {

                    // Sort albums by artist and album name
                    genre.albums = genre.albums.sort((a, b) => {

                        if(a.artist.name > b.artist.name) return 1;
                        if(a.artist.name < b.artist.name) return -1;                        
                        if(a.name > b.name) return 1;
                        return -1;
                    });
                }

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

                if (!length(genreName.trim(), this._MIN_NAME_LENGTH, this._MAX_NAME_LENGTH)) throw (HttpErrorCodes.BAD_REQUEST);

                let repo = getCustomRepository(GenreRepository);
                let genre = new Genre(genreName.trim());

                genre = await repo.save(genre)

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

                if (!length(genreName.trim(), this._MIN_NAME_LENGTH, this._MAX_NAME_LENGTH)) throw (HttpErrorCodes.BAD_REQUEST);
                if (!isUUID(genreID)) throw (HttpErrorCodes.BAD_REQUEST);

                let repo = getCustomRepository(GenreRepository);

                let genre = await repo.findOne(genreID);

                if (!genre) throw (HttpErrorCodes.NOT_FOUND);

                genre.name = genreName.trim();

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

                if (!isUUID(genreID)) throw (HttpErrorCodes.BAD_REQUEST);

                let repo = getCustomRepository(GenreRepository);

                let genre = repo.findOne(genreID);

                if (!genre) throw (HttpErrorCodes.NOT_FOUND);

                let result = await repo.delete({ id: genreID });

                if (result.affected && result.affected == 0) throw (HttpErrorCodes.UNSUCCESSFUL);

                resolve(result);
            }
            catch (err) {

                reject(err);
            }
        });
    }
}