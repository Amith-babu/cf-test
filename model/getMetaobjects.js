import { getMetaobjectsQuery } from "./query.js";

/**
 * Fetches metaobjects from the Shopify API.
 *
 * @param {Object} env - The environment variables containing SHOP_URL and API_KEY.
 * @returns {Array} - An array of metaobjects with id and name.
 */
export async function getMetaobjects(env) {
  let response = [];
  try {
    let result = null;

    // Fetch metaobjects from Shopify API using GraphQL query
    try {
      result = await fetch(`${env.SHOP_URL}/admin/api/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": env.API_KEY,
        },
        body: JSON.stringify({
          query: getMetaobjectsQuery,
          variables: {
            first: 10,
            type: "sales_persons",
          },
        }),
      }).then((res) => res.json());
    } catch (error) {
      console.error("Error executing GraphQL query:", error);
    }

    // Process the result to extract metaobjects
    if (
      result &&
      result.data &&
      result.data.metaobjects &&
      result.data.metaobjects.edges
    ) {
      response = result.data.metaobjects.edges.map((edge) => {
        const idField = edge.node.fields.find(
          (field) => field.key === "salesperson_id"
        );
        const nameField = edge.node.fields.find(
          (field) => field.key === "salesperson_name"
        );
        return {
          id: idField ? idField.value : null,
          name: nameField ? nameField.value : null,
        };
      });
    }
  } catch (error) {
    console.error("Error fetching metaobjects:", error);
  }

  return response;
}
