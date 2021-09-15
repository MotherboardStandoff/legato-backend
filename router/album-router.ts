import express, { Router, Request, Response } from "express";
import { resolve } from "path/posix";
import { AlbumDomain } from "../domain/album-domain";
import { getHttpErrorCode } from "../function/http-error-code";

export const AlbumRouter: Router = express.Router();

const domain: AlbumDomain = new AlbumDomain();

AlbumRouter.get(`/`, async (req: Request, res: Response) => {

    try {

        let albums = await domain.getAlbums();

        res.json(albums);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});

AlbumRouter.post('/', async (req: Request, res: Response) => {

    try {

        let album = await domain.saveAlbum(req.body.name, req.body.year, req.body.artistID, req.body.genreID);

        res.json(album);
    }
    catch (err) {

        console.error(err);

        res.sendStatus(getHttpErrorCode(err));
    }
});