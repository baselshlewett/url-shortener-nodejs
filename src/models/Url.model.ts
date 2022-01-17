import { Schema, model, Model } from 'mongoose';
import Url from '../urls/url.interface';

const URLSchema = new Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    visits: Number,
    date: {
        type: String,
        default: Date.now
    }
});

const UrlModel: Model<Url> = model('Url', URLSchema);

export default UrlModel;