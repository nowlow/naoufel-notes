import React from "react"
import styled from "styled-components"
import { gql } from "apollo-boost"
import config from "../../config"
import { Redirect } from 'react-router-dom'
import NotesApollo from '../../NotesApollo'
import NotesSocket from '../../NotesSocket'

const Page_ = styled.section`
    width: 100%;
    height: 100%;

    > *:not(:last-child) {
        margin-bottom: 20px;
    }

    .form-box  {
        width: 40%;
        height: 100%;

        display: flex;
        flex-direction: column;

        transition: width .2s;

        margin: 0 auto;
    }

    .form-box > * {
        box-sizing: border-box;
    }

    input {
        width: 100%;
        padding: 10px;
        border: none;
        font-size: 2em;
        border-bottom: 2px solid rgb(200, 200, 200);
        font-weight: bold;
    }

    textarea {
        width: 100%;
        height: 100%;
        border: none;
        padding: 10px;
        resize: none;
    }

    .submit {
        width: 200px;
        align-self: end;
        padding: 10px;
        background-color: black;
        color: white;
        text-align: center;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
    }

    ${config.responsive.query} {
        > * {
            margin-bottom: 0;
        }

        .form-box {
            width: 100%;
        }

        input {
            font-size: 3em;
            font-weight: bold;
        }

        textarea {
            font-size: 2em;
        }

        .submit {
            padding: 40px;
            font-size: 2em;
            border-radius: 10px;
        }
    }

    @media screen and (max-width: ${config.responsive.width}px) {
        .form-box {
            width: 100%;
        }
    }
`;

class NewNote extends React.Component {
    constructor() {
        super()
        this.state = { title: '', content: '' }
    }

    componentDidMount() {
	    document.title = 'New note - Naoufel\'s notes'
    }

    handleTypingTitle(event) {
        this.setState({ title: event.target.value })
    }

    handleTypingContent(event) {
        this.setState({ content: event.target.value })
    }

    async submit() {
        if (!this.state.title.length || !this.state.content.length)
            return;
        await NotesApollo().getInstance().client.mutate({
            mutation: gql`
                mutation {
                    addNote(title: "${this.state.title.split('"').join('\\"')}", content: "${this.state.content.split('"').join('\\"')}") {id}
                }
            `,
        })
	    this.setState({ title: '', content: '' })
	    return <Redirect to="/" />
    }

    render() {
        return (
            <Page_>
                <div className="form-box">
                    <input type="text" placeholder="Title" value={this.state.title} onChange={(e) => {this.handleTypingTitle(e) }} />
                    <textarea type="text" placeholder="Content" value={this.state.content} onChange={(e) => { this.handleTypingContent(e) }} />
                    <div className="submit" onClick={() => { this.submit() }}>Submit</div>
                </div>
            </Page_>
        );
    }
}

export default NewNote;
