import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const IndexHeader = styled.div`
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: .12em;
  font-family: var(--fontFamily-alt);
  font-weight: 700;
`
const IndexSubtitle = styled.p`
  a {
    text-decoration: none;
  }
`

const ArticleTitle = styled.h2`
  &&&{
  margin-bottom: -.6rem;
  font-size: 1.48rem;
  margin-top: 2.1rem;
  line-height: 2rem;
  // font-weight: 500;
  letter-spacing: .05em;
  font-family: var(--fontFamily-sans);
  color: #000;
}
`
const ArticleDetails = styled.p`
  display: inline-block;
  font-family: var(--fontFamily-alt);
  font-size: .98rem;
  font-weight: 700;
  line-height: 1.8rem;
  color: #4a5568;
`
const BlogPage = ({ data, location }) => {
    const posts = data.allGhostPost.edges
    const siteTitle = data.site.siteMetadata?.title || `Title`
  
    if (posts.length === 0) {
      return (
        <Layout location={location} title={siteTitle}>
          <Seo title="All posts" />
          <Bio />
          <p>
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
          </p>
        </Layout>
      )
    }
  
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <IndexHeader>All Posts</IndexHeader>
        <IndexSubtitle>Pro tip: Subscribe to my <a href={data.site.siteMetadata.socials.substack} target="_blank" rel="noreferrer">newsletter</a> to get future posts straight to your inbox.</IndexSubtitle>
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.node.title || post.node.slug
            const publish_date = post.node.published_at || "Undated"
            const reading_time = post.node.reading_time + 1 || "1"
            const category = post.node.tags[0]?.name || "Uncategorized"
  
            return (
              <li key={post.node.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <ArticleTitle>
                      <Link to={post.node.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </ArticleTitle>
                    <ArticleDetails>{publish_date} • {reading_time} min • {category}</ArticleDetails>
                  </header>
                </article>
              </li>
            )
          })}
        </ol>
      </Layout>
    )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        socials {
          substack
        }
      }
    }
    allGhostPost(sort: {fields: published_at, order: DESC}, limit: 1000) {
      edges {
        node {
          slug
          id
          title
          og_description
          excerpt
          reading_time
          published_at(formatString: "MMMM DD, YYYY")
          tags {
              name
          }
        }
      }
    }
  }
`
