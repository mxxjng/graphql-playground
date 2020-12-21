import db from "../config/db";
import * as util from "util";

const query = util.promisify(db.query).bind(db);

export const resolvers = {
    Post: {
        author: async ({ author }: any) => {
            try {
                let sql = "SELECT * FROM author WHERE author.id = ?";
                const sqlQuery = await query(sql, [author]);
                console.log(sqlQuery);
                return sqlQuery[0];
            } catch (error) {
                console.log(error);
            }
        },
    },
    Mutation: {
        addPost: async (parent: any, args: any, ctx: any, info: any) => {
            console.log({ parent, args, ctx, info });
            try {
                let sql = "INSERT INTO post VALUES (Null, ?, ?, ?)";
                const sqlQuery = await query(sql, [
                    args.body,
                    args.createdAt,
                    args.authorId,
                ]);
                console.log(sqlQuery);
                return {
                    id: 111,
                    body: args.body,
                    createdAt: args.createdAt,
                };
            } catch (error) {
                console.log(error);
            }
        },
    },
    Query: {
        getPosts: async () => {
            try {
                let sql = "SELECT * FROM post";
                const sqlQuery = await query(sql);
                return sqlQuery;
            } catch (error) {
                console.log(error);
            }
        },
        getSinglePost: async (_: any, { id }: any) => {
            try {
                let sql = "SELECT * FROM post WHERE post.id = ?";
                const sqlQuery = await query(sql, [id]);
                return sqlQuery[0];
            } catch (error) {
                console.log(error);
            }
        },
    },
};
