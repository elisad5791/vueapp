import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default apolloClient