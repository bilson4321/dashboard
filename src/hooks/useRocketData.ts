import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";

import { graphql } from "../gql";

const allRocketsDocument = graphql(/* GraphQL */ `
  query allRockets {
    rockets {
      name
      cost_per_launch
      payload_weights {
        kg
      }
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
