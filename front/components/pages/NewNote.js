import React from "react";
import styled from "styled-components";
import Article from "../../components/pages/Article";
import { ApolloClient, gql } from "apollo-boost";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import config from "../../config";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: config.apollo_uri
});

const client = new ApolloClient({
    cache,
    link,
});

const Page_ = styled.section`

`;

class NewNote extends React.Component {
    render() {
        return (
            <Page_>
                <div>write a new note</div>
            </Page_>
        );
    }
}

export default NewNote;