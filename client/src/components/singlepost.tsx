import React, { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"

interface Props {
    postId: number
}

const GET_SINGLE_POST = gql`
    query SinglePost($postId: ID!) {
        getSinglePost(id: $postId) {
            id
            body
            createdAt
            author {
                id
                name
                age
            }
        }
    }
`

const SinglePost: React.FC<Props> = ({ postId }) => {
    const { loading, error, data } = useQuery(GET_SINGLE_POST, {
        variables: { postId },
    })
    console.log(data)
    if (error) return <div>error...</div>
    if (loading) return <div>loading...</div>

    return <div>{data.getSinglePost.body}</div>
}
export default SinglePost
