import React, { useEffect, useState, ChangeEvent, isValidElement } from "react";
import "../filter.css";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

interface ColorCheckbox {
  name: string;
  color: string;
}

const colorOptions: ColorCheckbox[] = [
  { name: "Red", color: "red" },
  { name: "Black", color: "black" },
  { name: "White", color: "white" },
  { name: "Grey", color: "grey" },
  { name: "Blue", color: "blue" },
  { name: "Orange", color: "orange" },
  { name: "Pink", color: "pink" },
  { name: "Green", color: "green" },

  // Ajoutez d'autres couleurs selon vos besoins
];

const sizeOptions: string[] = [
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
];

// Define an interface for the SPARQL query results
interface SparqlResult {
  product: { value: string };
  productName: { value: string };
  productURL: { value: string };
  price: { value: number };
  mainColor: { value: string };
  availability: { value: string };
}

interface ProductDetailsProps {
  searchResults: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ searchResults }) => {
  const { item, source } = useParams();

  if (!item) {
    return <div>Item not found</div>;
  }

  const [data, setData] = useState<SparqlResult[]>([]);
  const [value, setValue] = useState<[number, number]>([0, 300]);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");

  console.log("test_recup", searchResults);

  console.log("Item in product detail", item);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      console.log("New Min:", newValue[0]);
      console.log("New Max:", newValue[1]);
      setValue(newValue as [number, number]);
    }
  };

  function valuetext(newValue: Float32Array) {
    return `${newValue} €`;
  }

  const handleColorCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    colorName: string
  ) => {
    if (event.target.checked) {
      setColor(colorName);
    } else {
      setColor("");
    }
  };

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value);
  };

  console.log(value[0]);
  console.log(size);
  console.log(color);

  let brand = "";

  console.log(source);

  if (source == "brand") {
    brand = item;
  } else {
    brand = "";
  }

  let genre = "";

  console.log("brand : ", brand);

  if (source == "homme") {
    genre = "homme";
  } else if (source == "femme") {
    genre = "femme";
  } else if (source == "enfant") {
    genre = "enfant";
  }

  console.log("genre :", genre);

  useEffect(() => {
    let sparqlQuery = `
    PREFIX ex: <http://example.org/>
    SELECT ?product ?productName ?productURL ?price ?mainColor ?availability
    WHERE {
      ?product ex:productBrand ?productBrand .
      ?product ex:productName ?productName .
      ?product ex:available_sizes ?available_sizes .
      ?product ex:image ?productURL .
      ?product ex:price ?price .
      ?product ex:type ?type .
      ?product ex:mainColor ?mainColor .
      ?product ex:secondaryColor ?secondaryColor .
      ?product ex:availability ?availability


      FILTER((?price >= ${value[0]} ) && (?price <= ${value[1]}) 
      && (?type = "${item}") 
      && CONTAINS(LCASE(?available_sizes), LCASE("${size}"))
      && ( CONTAINS(LCASE(?mainColor), LCASE("${color}"))
      || CONTAINS(LCASE(?secondaryColor), LCASE("${color}")))
      
      )
    }
    
    `;

    console.log("brand_length", brand.length);

    if (brand.length > 0) {
      // Si des résultats de recherche existent, ajustez la requête pour inclure la recherche
      sparqlQuery = `
      PREFIX ex: <http://example.org/>
      SELECT ?product ?productName ?productURL ?price ?mainColor ?availability
      WHERE {
        ?brand ex:brandName  "${brand}" .
        ?product ex:isMadeBy ?brand .
        ?product ex:productName ?productName .
        ?product ex:productBrand ?productBrand .
        ?product ex:available_sizes ?available_sizes .
        ?product ex:image ?productURL .
        ?product ex:price ?price .
        ?product ex:type ?type .
        ?product ex:mainColor ?mainColor .
        ?product ex:secondaryColor ?secondaryColor .
        ?product ex:availability ?availability

  
        FILTER((?price >= ${value[0]} ) && (?price <= ${value[1]}) 
        && CONTAINS(LCASE(?available_sizes), LCASE("${size}"))
        && ( CONTAINS(LCASE(?mainColor), LCASE("${color}"))
        || CONTAINS(LCASE(?secondaryColor), LCASE("${color}")))
        )
      }
    `;
    }

    console.log("genre_length", genre.length);

    if (genre) {
      // Si des résultats de recherche existent, ajustez la requête pour inclure la recherche
      sparqlQuery = `
      PREFIX ex: <http://example.org/>
      SELECT ?product ?productName ?productURL ?price ?mainColor ?availability
      WHERE {
        ?brand ex:brandName  ?brandName .
        ?product ex:isMadeBy ?brand .
        ?product ex:productName ?productName .
        ?product ex:productBrand ?productBrand .
        ?product ex:available_sizes ?available_sizes .
        ?product ex:image ?productURL .
        ?product ex:price ?price .
        ?product ex:type ?type .
        ?product ex:mainColor ?mainColor .
        ?product ex:secondaryColor ?secondaryColor .
        ?product ex:sex ?sex .
        ?product ex:availability ?availability


  
        FILTER((?price >= ${value[0]} ) && (?price <= ${value[1]}) 
        && CONTAINS(LCASE(?available_sizes), LCASE("${size}"))
        && CONTAINS(LCASE(?sex), LCASE("${genre}"))
        && ( CONTAINS(LCASE(?mainColor), LCASE("${color}"))
        || CONTAINS(LCASE(?secondaryColor), LCASE("${color}")))
        )
      }
    `;
    }

    console.log(searchResults.length, value[0], value[1]);

    if (searchResults.length > 0) {
      // Si des résultats de recherche existent, ajustez la requête pour inclure la recherche
      sparqlQuery = `
          PREFIX ex: <http://example.org/>
          SELECT ?product ?productName ?productURL ?price ?mainColor ?availability
          WHERE {
            ?product ex:productBrand "Nike" .
            ?product ex:productName ?productName .
            ?product ex:image ?productURL .
            ?product ex:availability ?availability .
            ?product ex:mainColor ?mainColor .
            ?product ex:price ?price .
            FILTER(CONTAINS(LCASE(?productName), LCASE("${searchResults[0]}")))
          }
        `;
    }

    console.log(sparqlQuery);

    // FILTER(STR(?productName) = "${item}")

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
        console.log(result.results.bindings);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchResults, value, size, color, brand, genre]);

  return (
    <div className="main_container">
      <div className="filter_container">
        <div className="filter_price">
          <label htmlFor="priceRange">Plage de prix :</label>
          <Box>
            <Slider
              getAriaLabel={() => "Price range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={0}
              max={300}
            />
          </Box>
        </div>

        <div className="sizeFilter">
          <label htmlFor="sizeFilter">Taille :</label>
          <select id="sizeFilter" value={size} onChange={handleSizeChange}>
            <option value="">Toutes les tailles</option>
            {sizeOptions.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>

        <div className="colorFilter">
          <label htmlFor="colorFilter">Couleurs :</label>
          {colorOptions.map((option) => (
            <div key={option.name} className="colorOption">
              <input
                type="checkbox"
                id={option.name}
                checked={color === option.name}
                onChange={(e) => handleColorCheckboxChange(e, option.name)}
              />
              <label htmlFor={option.name}>{option.name}</label>
              <div
                className="colorBox"
                style={{
                  backgroundColor: option.color,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="products_container">
        {data.map((result, index) => (
          <div className="product">
            <img src={result.productURL.value} alt={result.productName.value} />

            <div className="product_desc">
              <h4>{result.productName.value}</h4>
              <h3>{result.price.value} €</h3>
              <div className="Color_all">
                <h3> {result.mainColor.value}</h3>
                <div
                  className="colorBox_2"
                  style={{ backgroundColor: result.mainColor.value }}
                ></div>
              </div>
              <h3> {result.availability.value}</h3>

              {/* Add other details you want to display */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
