import { ApolloClient, gql } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import config from '../front/config'

let NotesApollo = (function() {
    let instance = null

    return {
        getInstance: () => {
            if (instance !== null)
                return instance

            const cache = new InMemoryCache()
            const link = new HttpLink({ uri: config.apollo_uri })

            instance = new ApolloClient({ cache, link })
            return instance
        }
    }
})

export default NotesApollo