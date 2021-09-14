import express, { Router, Request, Response } from 'express';
import { isUUID, length, validate, ValidationError } from 'class-validator';
import { ArtistDomain } from '../domain/artist-domain';
import { Artist } from '../data/entity/artist';
import { ErrorCodes } from '../enum/error-codes';
import { getHttpErrorCode } from '../class/http-error-code';

export const ArtistRouter: Router = express.Router();

const domain: ArtistDomain = new ArtistDomain();

ArtistRouter.get(`/`, async (req: Request, res: Response) => {

    try {

        let artists = await domain.getArtists();

        res.json(artists);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(500);
    }
});

ArtistRouter.get(`/:id`, async (req: Request, res: Response) => {

    try {

        let artistID: string = req.params['id'];

        let artist = await domain.getArtistByID(artistID);

        res.json(artist);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});

ArtistRouter.post(`/`, async (req: Request, res: Response) => {

    try {

        let artist = await domain.saveArtist(req.body.name);

        res.json(artist);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});

ArtistRouter.put(`/:id`, async (req: Request, res: Response) => {

    try {

        let artist = await domain.updateArtist(req.params['id'], req.body.name);

        res.json(artist);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});

ArtistRouter.delete(`/:id`, async (req: Request, res: Response) => {

    try {

        let deleteRes = await domain.deleteArtist(req.params['id']);

        res.json(deleteRes);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});