import express, { Router, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { ArtistDomain } from '../domain/artist.domain';
import { CreateArtist } from '../class/create-artist';
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

        console.log(err);

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

        console.log(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});

ArtistRouter.post(`/`, async (req: Request, res: Response) => {

    try {
        let createArtist: CreateArtist = new CreateArtist(req.body.name);

        let validationErr = await validate(createArtist);

        if (validationErr.length > 0) {

            res.sendStatus(400);

            return;
        }

        let artist = await domain.createNewArtist(req.body.name);

        res.json(artist);
    }
    catch (err) {
        res.sendStatus(500);
    }
});

ArtistRouter.put(`/`, async (req: Request, res: Response) => {

    try {

        let updatedArtist: Artist = new Artist(req.body.name, req.body.id, req.body.createdAt, req.body.updatedAt);

        let artist = await domain.updateArtist(updatedArtist);

        res.json(artist);
    }
    catch (err) {

        console.log(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});