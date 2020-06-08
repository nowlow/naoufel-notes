import React from "react";
import styled from "styled-components";
import Article from "../../components/pages/Article";
import { gql } from "apollo-boost";
import config from "../../config";
import NotesApollo from '../../NotesApollo'
import NotesSocket from '../../NotesSocket'

const Page_ = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    box-sizing: border-box;

    > *:not(:last-child) {
      margin-bottom: 10px;
    }

    ${config.responsive.query} {
      > *:not(:last-child) {
        margin-bottom: 30px;
      }
    }
`;

class Notes extends React.Component {
    constructor() {
        super();
        this.state = { data: [], isMounted: false };
    }

    async componentDidMount() {
	    document.title = 'Naoufel\'s notes'
	
        let articles = await NotesApollo().getInstance().client.query({
        query: gql`
            {
                getNotes {
                    id
                    title
                    content
                    date
                }
            }
        `,
        });
        this.setState({ data: articles.data.getNotes.sort((a, b) => {
            a = new Date(a.date)
            b = new Date(b.date)

            return a > b ? -1 : a < b ? 1 : 0 
        }), isMounted: true });
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.isMounted) {
            return (
                <Page_>
                {this.state.data.length ? (
                    this.state.data.map((article) => {
                    return (
                        <Article
                            key={article.id}
			    id={article.id}
                            title={article.title}
                            description={article.content}
                            date={article.date}
                        />
                    );
                    })
                ) : (
                    <div>No note for now, come back later or write one down!</div>
                )}
                </Page_>
            );
        } else {
            return <Page_></Page_>;
        }
    }
}

export default Notes;
