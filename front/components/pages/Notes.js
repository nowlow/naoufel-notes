import React from 'react'
import styled from 'styled-components'
import Article from '../../components/pages/Article'
import { ApolloClient, gql } from 'apollo-boost'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
    cache,
    link
});

const Page_ = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    box-sizing: border-box;

    > * {
        margin-bottom: 10px;
    }
`

class Notes extends React.Component {
    constructor() {
        super()
        this.state = { data: [], isMounted: false }
    }

    async componentDidMount() {
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
            `
        })
        this.setState({ data: articles.data.getNotes, isMounted: true })
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo)
    }

    render() {
        if (this.state.isMounted) {
            return(
                <Page_>
                    {
                        (this.state.data.length) ?
                        this.state.data.map((article) => {
                            return <Article key={article.title} title={article.title} description={article.content} date={article.date}></Article>
                        }) :
                        <div>No note for now, come back later or write one down!</div>
                    }
                </Page_>
            )
        } else {
            return (<div>Error</div>)
        }
    }
}

export default Notes