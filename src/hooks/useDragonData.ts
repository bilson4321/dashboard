import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";

import { graphql } from "../gql";

const allDragonsDocument = graphql(/* GraphQL */ `
  query allDragons {
    dragons {
      crew_capacity
      dry_mass_kg
      first_flight
      name
      orbit_duration_yr
    }
  }
`);

export default function useDragonData() {
  return useQuery({
    queryKey: ["dragons"],
    queryFn: async () =>
      request(import.meta.env.VITE_GRAPHQL_API_ENDPOINT!, allDragonsDocument),
  });
}

export type AllDragonsQuery = ReturnType<typeof useDragonData>["data"];
