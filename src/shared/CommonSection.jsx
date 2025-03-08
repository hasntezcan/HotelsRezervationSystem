import React from 'react'
import './common-section.css'

const CommonSection = ({ title, backgroundImage }) => {
  return (
    <section
      className="common__section"
      style={{
        background: backgroundImage
          ? `url(${backgroundImage}) center center/cover no-repeat`
          : undefined
      }}
    >
      <h1>{title}</h1>
    </section>
  )
}

export default CommonSection