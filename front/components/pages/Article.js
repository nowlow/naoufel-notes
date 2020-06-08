import React from 'react'
import styled from 'styled-components'
import config from '../../config'
import { Link, useParams } from 'react-router-dom'
import NotesApollo from '../../NotesApollo'
import { gql } from "apollo-boost"

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
    box-sizing: border-box;

    .leave {
        color: rgba(200, 200, 200, 1);
        font-weight: bold;
        font-size: 30px;
        text-decoration: none;
        width: 20px;
        line-height: 20px;
        display: block;
    }

    ${config.responsive.query} {
        width: 95vw;
        height: 95vh;
        padding: 40px;
        border-radius: 10px;

        .leave {
            font-size: 60px;
            width: 40px;
            line-height: 40px;
        }
    }
`

class Article extends React.Component {
    constructor() {
        super()
        this.state = { id: -1, data: {}, isMounted: false }
    }

    async componentDidMount() {
        let params = new URLSearchParams(window.location.search)
        let id = params.get('id')

        this.setState({
            isMounted: true,
            id: id,
            data: (await NotesApollo().getInstance().client.query({
                query: gql`
                    {
                        getNote(id: ${id}) {
                            id
                            title
                            content
                            date
                        }

                        getComments(note_id: ${id}) {
                            id
                            content
                            date
                        }
                    }
                `
            })).data
        })
        console.log(this.state.data)
    }

    componentDidCatch(e) {
	    console.error(e)
    }

    getFormatedDate(date) {
        return (date.getUTCDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() )
    }

    render() {
        if (this.state.isMounted) {
            return (
                <Cover_>
                    <Link to="/" className="cover"></Link>
                    <Article_>
                        <Link to="/" className="leave">×</Link>
                        <h3 className="title">{this.state.data.getNote.title}</h3>
                        <p>{this.state.data.getNote.content}</p>
                        <div className="date">{this.getFormatedDate(new Date(this.state.data.getNote.date))}</div>
                    </Article_>
                </Cover_>
            )
        } else {
            return (<span></span>)
        }
    }
}

export default Article
