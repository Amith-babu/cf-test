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
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const response = await getMetaobjects(envData);
    if (response && response.length > 0) {
      return new Response(JSON.stringify(response), {
        headers: corsHeaders,
        status: 200,
      });
    } else {
      return new Response("No metaobjects found", {
        headers: corsHeaders,
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error fetching metaobjects:", error);
    return new Response("Error fetching metaobjects", {
      headers: corsHeaders,
      status: 500,
    });
  }
}
