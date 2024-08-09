import React from 'react'

const Header = ({ title }) => {

  return (
    <header>
        <h1> {title}</h1>
    </header>
  )
}

// used if a prop is not passed into the component
Header.defaultProps = {
  title: "Default Title"
}

export default Header