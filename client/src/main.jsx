import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const link = createHttpLink({
    uri: import.meta.env.VITE_SERVER_URL,
    credentials: "include",
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <ChakraProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ChakraProvider>
        </ApolloProvider>
    </StrictMode>
);
