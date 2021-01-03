import db from "../config/db";
import * as util from "util";

const query = util.promisify(db.query).bind(db);

export const resolvers = {
    Post: {
        author: async (parent: any, _: any, ctx: any) => {
            return ctx.authorLoader.load(parent.author);
        },
        comments: async (parent: any, _: any, ctx: any) => {
            return ctx.commentLoader.load(parent.postId);
        },
    },
    Comment: {
        commentAuthor: async (parent: any, _: any, ctx: any) => {
            return ctx.authorLoader.load(parent.commentAuthor);
        },
    },
    Mutation: {
        addPost: async (parent: any, args: any, { pubsub }: any) => {
            console.log({ parent, args });
            try {
                let sql = "INSERT INTO post VALUES (Null, ?, ?, ?)";
                const sqlQuery = await query(sql, [
                    args.body,
                    args.createdAt,
                    args.authorId,
                ]);
                console.log(sqlQuery);
                let post = {
                    id: 111,
                    body: args.body,
                    createdAt: args.createdAt,
                };
                let sql1 = "SELECT * FROM post";
                const sqlQuery1 = await query(sql1);
                pubsub.publish("POST_CREATED", { postCreated: sqlQuery1 });
                return post;
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
    Subscription: {
        postCreated: {
            subscribe: (_: any, __: any, { pubsub }: any) =>
                pubsub.asyncIterator("POST_CREATED"),
        },
    },
};
