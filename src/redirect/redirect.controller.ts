import express from 'express';
import Url from '../urls/url.interface';

import UrlModel from '../models/Url.model';

export default class RedirectController {
    public path = '/:urlCode';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.path, this.redirect.bind(this));
    }

    public async redirect(request: express.Request, response: express.Response): Promise<void> {
        const { urlCode } = request.params;

        try {
            // find and increment visists counter
            const url: Url = await UrlModel.findOneAndUpdate({
                urlCode
            }, {
                $inc: {
                    visits: 1
                }
            });

            if (!url) {
                // if url is not found redirect user to 404 page
                response.status(404).redirect("/404");
                return;
            }

            response.status(301).redirect(String(url.longUrl));
        } catch (err) {
            response.status(500).send({
                message: "Server Error"
            });
        }
    }

}
