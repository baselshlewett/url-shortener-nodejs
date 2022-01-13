import express from 'express';
import Url from './url.interface';

import { nanoid } from 'nanoid'

import UrlModel from '../models/Url.model';
import dotenv from 'dotenv';
// import confif
dotenv.config();

export default class UrlController {
    // main path to build routes
    public path = '/api/url';
    // init router
    public router = express.Router();

    private urls: Url[] = [];

    private baseUrl = process.env.BASE_URL;

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.path, this.getAllUrls.bind(this));
        this.router.post(this.path, this.createUrl.bind(this));
        this.router.put(this.path  + "/:urlCode", this.updateUrl.bind(this));
        this.router.delete(this.path + "/:urlCode", this.deleteUrl.bind(this));
    }

    public async getAllUrls(request: express.Request, response: express.Response): Promise<void> {
        try {
            this.urls = await UrlModel.find();
            response.json(this.urls);
          } catch (err) {
              // log error to console
            console.error(err.message);
            response.status(500).send("Server Error");
          }
    }

    public async createUrl(request: express.Request, response: express.Response): Promise<void> {
        //destruct url from request body
        const { longUrl } = request.body;

        // generate random chars of length 5
        const urlCode = nanoid(5);

        try {
            const shortUrl = this.baseUrl + '/' + urlCode;

            const url = {
                urlCode,
                shortUrl,
                longUrl,
                visits: 0
            }

            const urlModel = new UrlModel(url);
            urlModel.save();

            response.send(urlModel);
        } catch (err) {
            console.error(err.message);
            response.status(500).send("Server Error");
        }
    }

    public async updateUrl(request: express.Request, response: express.Response): Promise<void> {
        const { urlCode } = request.params;
        const { longUrl } = request.body;

        try {
            const url = await UrlModel.findOneAndUpdate({ urlCode }, { longUrl }, { new: true });

            if (!url) {
                response.status(404).send({
                    message: "Url Not Found!"
                });
                return;
            }

            response.status(200).send(url);
        } catch (err: any) {
            response.status(500).send({
                message: "Server Error"
            });
        }
    }

    public async deleteUrl(request: express.Request, response: express.Response): Promise<void> {
        const { urlCode } = request.params;

        try {
            const url = await UrlModel.findOneAndDelete({urlCode});

            if (!url) {
                response.status(404).send({
                    message: "Url Not Found!"
                });
                return;
            }

            response.status(200).send({
                message: "Deleted"
            });
        } catch (err: any) {
            response.status(500).send({
                message: "Server Error"
            });
        }
    }
}