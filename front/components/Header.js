import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import config from '../config'

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

    .title {
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.7em;
    }

    .title::before {
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

    ${config.responsive.query} {
        height: 150px;
        font-size: 3em;

        .title::before {
            content: 'NN';
        }

        .new-note {
	    font-size: 0.6em;
            padding: 20px;
            border: 3px solid white;
            border-radius: 10px;
        }
    }

    @media screen and (max-width: ${config.responsive.width}px) {
        .title::before {
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
                <Link to="/article?id=10" className="title"></Link>
                <Link to="/new-note" className="new-note">New Note</Link>
            </Header_>
        )
    }
}

export default Header
