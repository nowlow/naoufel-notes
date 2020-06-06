import React from "react";
import styled from "styled-components";
import Article from "../../components/pages/Article";
import { ApolloClient, gql } from "apollo-boost";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import config from "../../config";

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
	console.log('COMPONENT DID MOUNT')
        let articles = await client.query({
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

    componentWillUnmount() {
	console.log('COMPONENT DID UNMOUNT')
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
                        title={article.title}
                        description={article.content}
                        date={article.date}
                        ></Article>
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
