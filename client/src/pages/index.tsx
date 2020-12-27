import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Test from "../components/test"

const IndexPage: React.FC = () => {
    return (
        <Layout>
            <SEO title="Home" />
            <Test />
        </Layout>
    )
}

export default IndexPage
