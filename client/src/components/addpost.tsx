import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"

const ADD_POST = gql`
    mutation addP($body: String!, $createdAt: String!, $authorId: Int!) {
        addPost(body: $body, createdAt: $createdAt, authorId: $authorId) {
            id
            body
            createdAt
        }
    }
`

const AddPost: React.FC = () => {
    const [inputData, setInputData] = useState("")
    const [addPost, { data }] = useMutation(ADD_POST)

    const handleChange = (e): any => {
        setInputData(e.target.value)
    }

    const handleSubmit = (): any => {
        //useMutation
        let date = new Date().toLocaleDateString()
        addPost({
            variables: { body: inputData, createdAt: date, authorId: 2 },
        })
        setInputData("")
    }

    console.log(inputData)

    return (
        <div>
            <h2>Add Post</h2>
            <input
                onChange={e => handleChange(e)}
                type="text"
                name=""
                id=""
                value={inputData}
            />
            <button onClick={handleSubmit}>add post</button>
        </div>
    )
}
export default AddPost
