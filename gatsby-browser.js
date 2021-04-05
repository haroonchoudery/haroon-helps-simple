// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"
// haroon's custom CSS styles
import "./src/custom.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

export const onServiceWorkerUpdateReady = () => window.location.reload();