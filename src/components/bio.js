/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
// import * as bioStyles from "./bio.module.css"
import styled from "styled-components"
import { render } from "react-dom"

export function StatImage() {
  return(
    <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={150}
        height={150}
        quality={95}
        alt="Profile picture"
      />
    )
}

const BioDiv = styled.div`
  padding-top: 4.2rem;
  margin-bottom: 6.2rem;
  @media (max-width: 768px) {
    display: block;
  }
`

const BioText = styled.p`
  font-family: FuturaNowHeadline, Helvetica Neue, Open Sans;
  font-weight: 700;
  font-size: 28px;
  word-spacing: 0.03em;
  line-height: 2.7rem;
  margin-left: 2.2rem;
  @media (max-width: 768px) {
    margin-left: 0.8rem;
  }
  a {
    color: #000;
    text-decoration: none;
  }
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <BioDiv className="bio">
      <div className = "bio-avatar"><StatImage /></div>
      {author?.name && (
        <BioText>
          <a href="https://twitter.com/haroonchoudery">
            Hey, I'm Haroon.
          </a> 
          <font color="#718096"> I want to help you become futureproof.</font>
        </BioText>
      )}
    </BioDiv>
  )
}

export default Bio
