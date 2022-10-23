import { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

const fetchItems = async () => {
  const response = await fetch("http://localhost:4000/items");
  const data = await response.json();
  return data;
};

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems().then((data) => setItems(data));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleItemDelete(itemToDelete) {
    console.log("delete callback clicked", itemToDelete);
    // setItems((items) => items.filter((item) => item.id !== itemToDelete.id));
    const updatedItems = items.filter((item) => item.id !== itemToDelete.id);
    setItems(updatedItems);
  }

  function handleItemChange(id) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, isInCart: !item.isInCart };
      }
      return item;
    });
    setItems(updatedItems);
  }

  function handleItemAdd(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemAdd} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onItemDelete={handleItemDelete}
            onItemChange={handleItemChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;