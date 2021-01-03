const { ApolloServer } = require("apollo-server");
const DataLoader = require("dataloader");

import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./types/types";

import db from "./config/db";
import * as util from "util";

const query = util.promisify(db.query).bind(db);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {
            authorLoader: new DataLoader(async (keys: any) => {
                let arr = [keys];
                let sql = "SELECT * FROM author WHERE author.id IN ?";
                const authors = await query(sql, [arr]);
                const authorMap: any = {};
                authors.forEach((author: any) => {
                    authorMap[author.id] = author;
                });
                const res = keys.map((key: any) => authorMap[key]);
                console.log(res);
                return res;
            }),
            commentLoader: new DataLoader(async (keys: any) => {
                let arr = [keys];
                let sql = "SELECT * FROM comments WHERE comments.post IN ?";
                const comments = await query(sql, [arr]);

                const res = keys.map((key: any) => {
                    return comments.filter(
                        (comment: any) => comment.post === key
                    );
                });
                console.log(res);
                return res;
            }),
        };
    },
});

server.listen().then(({ url }: any) => console.log(`server started at ${url}`));
