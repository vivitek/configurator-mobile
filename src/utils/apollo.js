import {
    ApolloClient,
    gql,
    HttpLink,
    InMemoryCache,
    split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BASE_URL, BASE_WS } from "./constants";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
    uri: `${BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("vivi-jwt");
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const wsLink = new WebSocketLink({
    uri: `${BASE_WS}/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                authorization: `Bearer ${localStorage.getItem("vivi-jwt")}`,
            },
        },
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    authLink.concat(wsLink),
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
        query: {
            fetchPolicy: "network-only",
            errorPolicy: "all",
        },
    },
});

const GET_ROUTERS = gql`
    query {
        getRouters {
            _id
            name
            url
        }
    }
`;

const GET_ROUTER = gql`
    query($routerId: String!) {
        getRouter(id: $routerId) {
            _id
            url
            name
        }
    }
`;

const CREATE_ROUTER = gql`
    mutation($routerCreateData: RouterCreationInput!) {
        createRouter(createRouterData: $routerCreateData) {
            _id
            url
            name
        }
    }
`;

const GET_BANS_FOR_ROUTER = gql`
    query($routerId: String!) {
        getBans(id: $routerId) {
            address
            banned
            _id
        }
    }
`;

const UPDATE_BAN = gql`
    mutation($banUpdate: BanUpdate!) {
        updateBan(banUpdateData: $banUpdate) {
            _id
            banned
            address
        }
    }
`;

const ON_BAN_CREATED = gql`
    subscription($routerId: String!) {
        banCreated(routerSet: $routerId) {
            address
            _id
        }
    }
`;

const LOGIN = gql`
    mutation($loginData: LoginInput!) {
        login(loginData: $loginData) {
            access_token
            user {
                _id
                email
                username
            }
        }
    }
`;

export {
    client,
    GET_ROUTERS,
    GET_ROUTER,
    CREATE_ROUTER,
    GET_BANS_FOR_ROUTER,
    UPDATE_BAN,
    ON_BAN_CREATED,
    LOGIN,
};
