import { ObjectId } from "mongoose";

export default interface Url {
    id: any;
    urlCode: string,
    longUrl: string,
    shortUrl: string,
    visits: number,
    date: string,
    _id?: ObjectId
}