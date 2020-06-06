import React from 'react'
import styled from 'styled-components'
import responsive from '../responsive'

const Header_ = styled.section`
    width: 100%;
    height: 100px;
    position: fixed;
    background-color: rgba(20, 20, 20, 1);
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 50px;
    box-sizing: border-box;

    h1::before {
        content: 'NaoufelNotes';
    }

    .new-note {
        color: white;
        padding: 10px;
        border: 1px solid white;
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
    }

    @media screen and (max-width: ${responsive.width}px) and (min-height: ${responsive.height}px) {
        height: 150px;
        font-size: 3em;

        h1::before {
            content: 'NN';
        }

        .new-note {
	    font-size: 0.6em;
            padding: 20px;
            border: 3px solid white;
            border-radius: 10px;
        }
    }

    @media screen and (max-width: ${responsive.width}px) {
        h1::before {
            content: 'NN';
        }
    }
`

class Header extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Header_>
                <h1 style={{color: 'white'}}></h1>
                <a href="#" className="new-note">New Note</a>
            </Header_>
        )
    }
}

export default Header
