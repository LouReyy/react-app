import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isHeadingClicked, setIsHeadingClicked] = useState(false);
  const listGroupRef = useRef(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listGroupRef.current &&
        !(listGroupRef.current as any).contains(event.target)
      ) {
        setIsHeadingClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [listGroupRef]);

  const handleItemClick = (item: string, index: number) => {
    setSelectedIndex(index);
    onSelectItem(item);
    navigate(`/products/${encodeURIComponent(item)}`);
    console.log(`/products/${encodeURIComponent(item)}`);
  };

  return (
    <div className="heading-container" ref={listGroupRef}>
      <div ref={listGroupRef}>
        <h1 onClick={() => setIsHeadingClicked(!isHeadingClicked)}>
          {heading}
        </h1>
        {isHeadingClicked && (
          <>
            {items.length === 0 && <p>No item Found</p>}
            <ul className="list-group">
              {items.map((item, index) => (
                <li
                  className={
                    selectedIndex === index
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  key={item}
                  onClick={() => handleItemClick(item, index)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default ListGroup;
