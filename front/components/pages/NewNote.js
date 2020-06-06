import React from "react"
import styled from "styled-components"
import { ApolloClient, gql } from "apollo-boost"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import config from "../../config"
import { Redirect } from 'react-router-dom'

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: config.apollo_uri
});

const client = new ApolloClient({
    cache,
    link,
});

const Page_ = styled.section`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        width: 40%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form > * {
        box-sizing: border-box;
    }

    form > *:not(:last-child) {
        margin-bottom: 20px;
    }

    form input {
        width: 100%;
        border: 1px solid rgba(200, 200, 200, 1);;
        padding: 10px;
    }

    form textarea {
        width: 100%;
        height: 250px;
        border: 1px solid rgba(200, 200, 200, 1);
        padding: 10px;
        resize: none;
    }

    .submit {
        width: 100%;
        padding: 10px;
        background-color: black;
        color: white;
        text-align: center;
        font-weight: bold;
    }

    ${config.responsive.query} {
        form {
            width: 100%;
            align-items: baseline;
        }

        form > *:not(:last-child) {
            margin-bottom: 40px;
        }

        form h3 {
            font-size: 4em;
        }

        form input, form textarea {
            border: 2px solid rgb(200, 200, 200);
            font-size: 2em;
        }

        form textarea {
            height: 50vh;
        }

        .submit {
            padding: 40px;
            font-size: 2em;
        }
    }

    @media screen and (max-width: ${config.responsive.width}px) {
        form {
            width: 100%;
        }
    }
`;

class NewNote extends React.Component {
    constructor() {
        super()
        this.state = { title: '', content: '' }
    }

    handleTypingTitle(event) {
        this.setState({ title: event.target.value })
    }

    handleTypingContent(event) {
        this.setState({ content: event.target.value })
    }

    async submit() {
        if (!this.state.title.length && !this.state.content.length)
            return;
        let mutation = await client.mutate({
            mutation: gql`
                mutation {
                    addNote(title: "${this.state.title}", content: "${this.state.content}") {id}
                }
            `,
        })
	this.setState({ title: '', content: '' })
	return <Redirect to="/" />
    }

    render() {
        return (
            <Page_>
                <form>
                    <h3>New note</h3>
                <input type="text" placeholder="Title" value={this.state.title} onChange={(e) => {this.handleTypingTitle(e) }} />
                <textarea type="text" placeholder="Content" value={this.state.content} onChange={(e) => { this.handleTypingContent(e) }} />
                    <div className="submit" onClick={() => { this.submit() }}>Submit</div>
                </form>
            </Page_>
        );
    }
}

export default NewNote;
