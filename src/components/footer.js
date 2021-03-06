import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import styled from "styled-components"
import Twitter from "../images/twitter.svg"
import Instagram from "../images/instagram.svg"

const SocialIcons = styled.nav`
display: flex;
max-width: 36rem;
font-size: 18px;
// -webkit-box-orient: horizontal;
// -webkit-box-direction: normal;
// flex-direction: row;
// flex: 1 1 0%;
// -webkit-box-align: center;
// align-items: center;
// -webkit-box-pack: end;
// justify-content: flex-end;
a {
    box-shadow: none; 
    margin-left: 1.1rem;
}
`
const FooterWrapper = styled.div`
color: #718096;
display: flex;
margin-top: 2rem;
// margin-bottom: -1rem;
// // -webkit-box-orient: horizontal;
// // -webkit-box-direction: normal;
flex-direction: row;
// -webkit-box-pack: center;
// justify-content: center;
justify-content: space-between;
// -webkit-box-align: center;
// align-items: center;
`

const Footer = () => { 
    const data = useStaticQuery(graphql`
    query FooterQuery {
        site {
        siteMetadata {
            socials {
            twitter
            instagram
            }
        }
        }
    }
    `)

return (
    <FooterWrapper>
        <div>Haroon Choudery © {new Date().getFullYear()}</div>
        <SocialIcons>
        <a href={data.site.siteMetadata.socials.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram fill="#718096" size="26" height="26" width="26" />
        </a>    
        <a href={data.site.siteMetadata.socials.twitter} target="_blank" rel="noopener noreferrer">
            <Twitter fill="#718096" size="26" height="26" width="26" />
        </a>
        </SocialIcons>
    </FooterWrapper>
)}

export default Footer