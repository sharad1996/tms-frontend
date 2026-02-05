const GRAPHQL_ENDPOINT =
  import.meta.env.VITE_GRAPHQL_URL ||
  (import.meta.env && import.meta.env.DEV
    ? 'http://localhost:4000/graphql'
    : 'https://tms-bakend.onrender.com/graphql');

export async function gqlRequest(query, variables = {}, token) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

