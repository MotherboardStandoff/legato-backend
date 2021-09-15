import express, { Router, Request, Response } from 'express';
import { getHttpErrorCode } from '../function/http-error-code';
import { GenreDomain } from '../domain/genre-domain';
import { defaultApiErrorResponse } from '../function/default-api-error-response';

export const GenreRouter: Router = express.Router();

const domain: GenreDomain = new GenreDomain();

GenreRouter.get(`/`, async (req: Request, res: Response) => {

    try {

        let genres = await domain.getGenres();

        res.json(genres);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

GenreRouter.get(`/:id`, async (req: Request, res: Response) => {

    try {

        let genre = await domain.getSingleGenre(req.params['id']);

        res.json(genre);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

GenreRouter.get(`/:id/albums`, async (req: Request, res: Response) => {

    try {

        let genre = await domain.getSingleGenreAndAlbums(req.params['id']);

        res.json(genre);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

GenreRouter.post(`/`, async (req: Request, res: Response) => {

    try {

        let genre = await domain.saveGenre(req.body.name);

        res.json(genre);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

GenreRouter.put(`/:id`, async (req: Request, res: Response) => {

    try {

        let updatedGenre = await domain.updateGenre(req.body.name, req.params['id']);

        res.json(updatedGenre);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

GenreRouter.delete(`/:id`, async (req: Request, res: Response) => {

    try {

        await domain.deleteGenre(req.params['id']);

        res.sendStatus(200);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});