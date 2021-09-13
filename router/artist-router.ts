import express, { Router, Request, Response } from 'express';
import { validate } from 'class-validator';
import { ArtistDomain } from '../domain/artist.domain';
import { CreateArtist } from '../class/create-artist';

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

        (!artist ? res.sendStatus(404) : res.json(artist));
    }
    catch (err) {

        (err == 'INVALID' ? res.sendStatus(400) : res.sendStatus(500));
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