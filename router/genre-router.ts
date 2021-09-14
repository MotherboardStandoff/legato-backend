import express, { Router, Request, Response } from 'express';
import { getHttpErrorCode } from '../function/http-error-code';
import { GenreDomain } from '../domain/genre-domain';

export const GenreRouter: Router = express.Router();

const domain: GenreDomain = new GenreDomain();

GenreRouter.get(`/`, async (req: Request, res: Response) => {

    try {

        let genres = await domain.getGenres();

        res.json(genres);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});

GenreRouter.get(`/:id`, async (req: Request, res: Response) => {

    try {

        let genre = await domain.getGenreByID(req.params['id']);

        res.json(genre);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});

GenreRouter.post(`/`, async (req: Request, res: Response) => {

    try {

        let genre = await domain.saveGenre(req.body.name);

        res.json(genre);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});

GenreRouter.put(`/:id`, async (req: Request, res: Response) => {

    try {

        let updatedGenre = await domain.updateGenre(req.body.name, req.params['id']);

        res.json(updatedGenre);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});

GenreRouter.delete(`/:id`, async (req: Request, res: Response) => {

    try {

        await domain.deleteGenre(req.params['id']);

        res.sendStatus(200);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});