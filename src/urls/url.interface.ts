import { ObjectId } from "mongoose";

export default interface Url {
    id: any;
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    visits: number,
    date: String,
    _id?: ObjectId
}