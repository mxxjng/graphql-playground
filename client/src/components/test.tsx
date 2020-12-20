import { string } from "prop-types"
import React from "react"

import { useQuery } from "@apollo/client"
import gql from "graphql-tag"

interface TestProps {
  text: string
}

const APOLLO_QUERY = gql`
  {
    hello(name: "Moritz")
  }
`

const Test: React.FC<TestProps> = ({ text }: TestProps) => {
  const { loading, error, data } = useQuery(APOLLO_QUERY)
  console.log(data)
  return <div>{data && data.hello}</div>
}

export default Test
