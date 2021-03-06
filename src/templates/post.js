import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SubstackForm from "../components/substack"

const Subtitle = styled.a`
  display: inline-block;
  font-family: var(--fontFamily-alt);
  font-weight: 700;
  line-height: 1.8rem;
  color: #4a5568;
`

const BlogPostTemplate = ({ data, location }) => {
  const post = data.ghostPost
  const siteTitle = data.site.siteMetadata?.title || `Title`
  // const { previous, next } = data
  const title = post.title || post.node.slug
  const publish_date = post.published_at || "Undated"
  const reading_time = post.reading_time + 1 || "1"
  const category = post.tags[0]?.name || "Uncategorized"

  const GhostHTML = () =>  {
    const post = data.ghostPost
    return(
      <section
      dangerouslySetInnerHTML={{ __html: post.childHtmlRehype.html}}
      itemProp="articleBody">
      </section>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={title}
        description={post.og_description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <Subtitle>{publish_date} • {reading_time} min • {category}</Subtitle>
        </header>
        <GhostHTML />
        <hr className="spacing-top" />
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
              <Link to={previous.ghostPost.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.ghostPost.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav> */}
    </Layout>
  )
}

export default BlogPostTemplate

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      title
      og_description
      excerpt
      published_at(formatString: "MMMM DD, YYYY")
      childHtmlRehype {
        html
      }
      html
      slug
      reading_time
      tags {
          name
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
