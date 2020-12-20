import { string } from "prop-types"
import React from "react"

import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import styled from "styled-components"

interface TestProps {
    text: string
}

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

const Test: React.FC<TestProps> = ({ text }: TestProps) => {
    const { loading, error, data } = useQuery(APOLLO_QUERY)
    console.log(data)
    return (
        <div>
            <StyledHeadline>Hello</StyledHeadline>
            {data && data.hello}
        </div>
    )
}

export default Test
