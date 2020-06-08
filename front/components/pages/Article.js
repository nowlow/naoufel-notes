import React from 'react'
import styled from 'styled-components'
import config from '../../config'
import { Link } from 'react-router-dom'

const Article_ = styled.section`
    position: fixed;
    width: 50vw;
    height: 50vh;
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    padding: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .leave {
        color: rgba(200, 200, 200, 1);
        font-weight: bold;
        font-size: 30px;
        text-decoration: none;
        width: 30px;
        height: 30px;
        display: block;
    }
`

class Article extends React.Component {
    render() {
        return <Article_>
            <Link to="/" className="leave">×</Link>
        </Article_>
    }
}

export default Article