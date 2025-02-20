/**
 * GraphQL query to fetch metaobjects by type from the Shopify API.
 *
 * @param {Int} first - The number of metaobjects to fetch.
 * @param {String} type - The type of metaobjects to fetch.
 * @returns {String} - The GraphQL query string.
 */

export const getMetaobjectsQuery = `
    query FetchMetaobjectByType($type: String!, $after: String) {
    metaobjects(type: $type, after: $after) {
      edges {
        node {
          id
          displayName
          fields {
            key
            value
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
