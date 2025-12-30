"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ReactNode } from "react";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // đổi theo backend của bạn
  }),
  cache: new InMemoryCache(),
});

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
