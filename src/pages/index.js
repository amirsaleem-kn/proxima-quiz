import React from "react"
import SEO from "../components/seo"
import Home from "../components/Home/Home"
import Layout from "../components/Layout/Layout";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Home/>
  </Layout>
)

export default IndexPage
