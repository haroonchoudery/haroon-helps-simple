import React, { useState } from "react"
import styled from "styled-components"

const SubstackForm = () => {
    return (
      <div>
        <h1 className="alt-header">Subscribe</h1>
        <p>I send an email newsletter each week with the links I thought were interesting, plus any new posts or projects from me. There are 1,500+ subscribers. You should sign up too.</p>
        <div css={`text-align: center;`}><iframe src="https://haroon.substack.com/embed" width="100%" height="120" frameborder="0" scrolling="no"></iframe></div>
      </div>
    )
  }

export default SubstackForm