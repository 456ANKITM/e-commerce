import React from 'react'
import {Container} from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
      <Container>
        <p className="text-center">
          Broadway &copy; {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  )
}

export default Footer
