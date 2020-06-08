import React from 'react'
import styled from 'styled-components'
import config from '../../config'
import { Link, useParams } from 'react-router-dom'

const Cover_ = styled.section`
position: absolute;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0, 0, 0, 0.5);

.cover {
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: block;
}
`

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
    border-radius: 5px;

    .leave {
        color: rgba(200, 200, 200, 1);
        font-weight: bold;
        font-size: 30px;
        text-decoration: none;
        width: 20px;
        line-height: 20px;
        display: block;
    }
`

class Article extends React.Component {
    constructor() {
	super()
	this.state = { id: -1 }
    }

    componentDidMount() {
	let params = new URLSearchParams(window.location.search)
	let id = params.get('id')

	this.setState({ id: id })
    }

    componentDidCatch(e) {
	console.error(e)
    }

    render() {
        return (
	<Cover_>
	    <Link to="/" className="cover"></Link>
	    <Article_>
		<Link to="/" className="leave">×</Link>
		<h3>{this.state.id}</h3>
            </Article_>
	</Cover_>
	)
    }
}

export default Article
