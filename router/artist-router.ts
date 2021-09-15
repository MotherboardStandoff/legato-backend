import express, { Router, Request, Response } from 'express';
import { isUUID, length, validate, ValidationError } from 'class-validator';
import { ArtistDomain } from '../domain/artist-domain';
import { Artist } from '../data/entity/artist';
import { HttpErrorCodes } from '../enum/error-codes';
import { getHttpErrorCode } from '../function/http-error-code';
import { defaultApiErrorResponse } from '../function/default-api-error-response';

export const ArtistRouter: Router = express.Router();

const domain: ArtistDomain = new ArtistDomain();

ArtistRouter.get(`/`, async (req: Request, res: Response) => {

    try {

        let artists = await domain.getArtists();

        res.json(artists);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

ArtistRouter.get(`/:id`, async (req: Request, res: Response) => {

    try {

        let artist = await domain.getSingleArtist(req.params['id']);

        res.json(artist);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

ArtistRouter.get(`/:id/albums`, async (req: Request, res: Response) => {

    try {

        let artist = await domain.getSingleArtistAndAlbums(req.params['id']);

        res.json(artist);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

ArtistRouter.post(`/`, async (req: Request, res: Response) => {

    try {

        let artist = await domain.saveArtist(req.body.name);

        res.json(artist);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

ArtistRouter.put(`/:id`, async (req: Request, res: Response) => {

    try {

        let artist = await domain.updateArtist(req.params['id'], req.body.name);

        res.json(artist);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});

ArtistRouter.delete(`/:id`, async (req: Request, res: Response) => {

    try {

        let deleteRes = await domain.deleteArtist(req.params['id']);

        res.json(deleteRes);
    }
    catch (err) {

        defaultApiErrorResponse(err, res);
    }
});