import React, { useState } from "react"

import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import styled from "styled-components"
import SinglePost from "./singlepost"
import AddPost from "./addpost"

const APOLLO_QUERY = gql`
    {
        getPosts {
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

const StyledHeadline = styled.h1`
    color: red;
`

const Post = styled.div`
    border: 1px solid red;
    margin-bottom: 10px;
    padding: 10px;
    cursor: pointer;
`

const Test: React.FC = () => {
    const { loading, error, data } = useQuery(APOLLO_QUERY)
    const [selectedPost, setSelectedPost] = useState<number | null>(0)

    if (loading) {
        return <p>loading...</p>
    }

    if (error) {
        return <div>error...</div>
    }

    return (
        <div>
            <StyledHeadline>Hello</StyledHeadline>

            {data.getPosts.map(p => {
                return (
                    <Post
                        key={p.id}
                        onClick={() => {
                            setSelectedPost(p.id)
                        }}
                    >
                        <p>{p.body}</p>
                        <span>
                            {p.author.name} | {p.createdAt}{" "}
                        </span>
                    </Post>
                )
            })}
            <p>selected Post: {selectedPost}</p>
            <SinglePost postId={selectedPost} />
            <AddPost />
        </div>
    )
}

export default Test
