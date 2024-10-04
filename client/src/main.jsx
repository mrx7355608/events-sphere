import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: import.meta.env.VITE_SERVER_URL,
    cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </ApolloProvider>
    </StrictMode>
);
