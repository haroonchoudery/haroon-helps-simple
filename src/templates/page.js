import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SubstackForm from "../components/substack"

const PageTemplate = ({ data, location }) => {
  const page = data.ghostPage
  const siteTitle = data.site.siteMetadata?.title || `Title`
//   const { previous, next } = data
  const title = page.title || page.node.slug
//   const publish_date = post.published_at || "Undated"
//   const reading_time = post.reading_time + 1 || "1"
//   const category = page.tags[0]?.name || "Uncategorized"

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={title}
        description={page.og_description || page.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{page.title}</h1>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: page.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <SubstackForm />
        </footer>
      </article>
      {/* <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.ghostPage.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.ghostPage.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav> */}
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      title
      og_description
      excerpt
      html
      slug
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
