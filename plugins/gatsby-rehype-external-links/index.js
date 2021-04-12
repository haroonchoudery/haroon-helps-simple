const visit = require("unist-util-visit")

module.exports = ({ 
  htmlAst },
  pluginOptions
  ) => {
    const tags = [`a`]
    const links = node => tags.includes(node.tagName)
    
    // Manipulate AST
    visit(htmlAst, links, node => {
        // Do stuff with links nodes
        if (node.properties.href.includes('http')) {
          node.properties.target = "_blank"
          node.properties.rel = "noopener noreferrer"
        }
      })
    return htmlAst
  }