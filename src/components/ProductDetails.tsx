import React, { useEffect, useState } from "react";

// Define an interface for the SPARQL query results
interface SparqlResult {
  product: { value: string };
  productName: { value: string };
  productURL: { value: string }; // Corrected property name
}

const YourComponent = () => {
  const [data, setData] = useState<SparqlResult[]>([]);

  useEffect(() => {
    const sparqlQuery = `
      PREFIX ex: <http://example.org/>
      SELECT ?product ?productName ?productURL
      WHERE {
        ?product ex:productBrand "Nike" .
        ?product ex:productName ?productName .
        ?product ex:image ?productURL
      }
    `;

    // Fuseki SPARQL endpoint URL
    const endpointUrl = "http://localhost:3030/ds/sparql";

    // Encode the SPARQL query
    const encodedQuery = encodeURIComponent(sparqlQuery);

    // Construct the complete query URL
    const queryUrl = `${endpointUrl}?query=${encodedQuery}&format=json`;

    // Make an AJAX request using fetch
    fetch(queryUrl)
      .then((response) => response.json())
      .then((result: { results: { bindings: SparqlResult[] } }) => {
        setData(result.results.bindings);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>SPARQL Query Results:</h2>
      <ul>
        {data.map((result, index) => (
          <li key={index}>
            Product: {result.product.value}, Name: {result.productName.value},
            URL: {result.productURL.value} {/* Corrected property name */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
