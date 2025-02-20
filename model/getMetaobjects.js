import { getMetaobjectsQuery } from "./query.js";

/**
 * Fetches metaobjects from the Shopify API.
 *
 * @param {Object} env - The environment variables containing SHOP_URL and API_KEY.
 * @returns {Array} - An array of metaobjects with id and name.
 */
export async function getMetaobjects(env) {
  let response = [];
  let hasNextPage = true;
  let after = null;

  while (hasNextPage) {
    try {
      const result = await fetch("YOUR_GRAPHQL_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getMetaobjectsQuery,
          variables: {
            type: "sales-agents",
            after: after,
          },
        }),
      }).then((res) => res.json());

      if (
        result &&
        result.data &&
        result.data.metaobjects &&
        result.data.metaobjects.edges
      ) {
        response = response.concat(
          result.data.metaobjects.edges.map((edge) => {
            const idField = edge.node.fields.find(
              (field) => field.key === "SalesAgentID"
            );
            const nameField = edge.node.fields.find(
              (field) => field.key === "SalesAgentName"
            );
            return {
              id: idField ? idField.value : null,
              name: nameField ? nameField.value : null,
            };
          })
        );

        hasNextPage = result.data.metaobjects.pageInfo.hasNextPage;
        after = result.data.metaobjects.edges.length
          ? result.data.metaobjects.edges[
              result.data.metaobjects.edges.length - 1
            ].cursor
          : null;
      } else {
        hasNextPage = false;
      }
    } catch (error) {
      console.error("Error executing GraphQL query:", error);
      hasNextPage = false;
    }
  }
  return response;
}
