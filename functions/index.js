import { getMetaobjects } from "../model/getMetaobjects.js";

/**
 * Array of functions to handle the GET request.
 */
export const onRequestGet = [process];

/**
 * Main function to process the shipping request.
 *
 * @param {Object} context - The context object containing the request and other details.
 * @returns {Response} - The response object containing the metaobjects or an error message.
 */
async function process(context) {
  const envData = await context.env;
  try {
    const response = await getMetaobjects(envData);
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching metaobjects:", error);
    return new Response("Error fetching metaobjects", { status: 500 });
  }
}
