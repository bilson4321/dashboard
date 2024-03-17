import { useQuery } from "@tanstack/react-query";
import { graphql } from "../gql";
import request from "graphql-request";

const allRocketsDocument = graphql(/* GraphQL */ `
  query allRockets {
    rockets {
      active
      name
      cost_per_launch
      first_flight
    }
  }
`);

export default function useRocketData() {
  return useQuery({
    queryKey: ["rockets"],
    queryFn: async () =>
      request(import.meta.env.VITE_GRAPHQL_API_ENDPOINT!, allRocketsDocument),
  });
}

export type AllRocketsQuery = ReturnType<typeof useRocketData>["data"];
