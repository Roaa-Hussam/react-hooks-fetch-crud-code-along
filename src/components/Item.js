import React from "react";

const deleteItem = async (item) => {
  const response = await fetch(`http://localhost:4000/items/${item.id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

function Item({ item, onItemDelete, onItemChange }) {

  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    }).then((r) => {
      if (r.ok) {
        onItemChange(item.id);
      }
    });
  }

  function handleDeleteClick() {
    console.log("delete clicked", item);
    deleteItem(item).then((data) => onItemDelete(item));
  }


  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;