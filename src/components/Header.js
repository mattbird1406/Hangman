import React from 'react'

const Header = ({question}) => {
    return (
        <>
          <h1>Hangman</h1>  
          <p>{question}</p>
        </>
    )
}

export default Header
