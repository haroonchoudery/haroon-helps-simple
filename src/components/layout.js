import * as React from "react"
import Navbar from "./Navbar"
import Footer from "./footer"

const ExternalLink = props => {
	if (props.href.includes('haroonhelps.com') || props.href[0] === '/') {
		return <a href={props.href}>{props.children}</a>
	}
	return (
		<a href={props.href} target="_blank" rel="noopener noreferrer">
			{props.children}
		</a>
	)
}

const components = {
	a: ExternalLink,
}

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  header = (
    <Navbar title={title}/>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main components={components}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
