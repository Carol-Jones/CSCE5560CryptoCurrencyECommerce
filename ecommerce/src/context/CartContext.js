import React, { useContext, useState, useEffect } from "react";
import items from "../items";

export const CartContext = React.createContext("");

export const CartProvider = ({ children }) => {
  //Set shopping cart array
  const [shoppingCart, setShoppingCart] = useState(new Map());
  //If the shopping cart should be shown
  const [showCart, setShowCart] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const addToCart = (item, quantity) => {
    console.log(`Adding ${quantity} ${item.name} to Cart`);
    //Can only add 5 of any item, so check if the quantity will fit
    if (shoppingCart.has(item.id)) {
      const currentQuantity = shoppingCart.get(item.id);
      if (shoppingCart.get(item.id) + Number(quantity) > 5)
        quantity = 5 - currentQuantity;
    }
    setShoppingCart(
      (curCart) =>
        new Map([
          ...curCart,
          [item.id, Number(curCart.get(item.id) || 0) + Number(quantity)],
        ])
    );
  };
  //Update the total whenever the cart is changed
  useEffect(() => {
    updateTotal();
  }, [shoppingCart]);

  //Calculate the new total
  const updateTotal = () => {
    let grandTotal = 0;
    shoppingCart.forEach((quantity, item) => {
      console.log(item);
      grandTotal += items[item - 1].price * quantity;
    });
    setTotalCost(grandTotal);
  };

  const showShoppingCartHandler = () => {
    setShowCart(!showCart);
  };
  //Creates/updates the shopping cart popup
  function ShowShoppingCart() {
    const updateQuantity = (event, name) => {
      addToCart(items[name - 1], event.target.value - shoppingCart.get(name));
    };
    const removeItem = (name) => {
      setShoppingCart((curCart) => {
        const newCart = new Map(curCart);
        newCart.delete(name);
        return newCart;
      });
    };
    return (
      <div className="shoppingCartPopup">
        <h3>My Cart</h3>
        {Array.from(shoppingCart).map(([name, quantity]) => (
          <div key={name} className="shoppingCartPopupItem">
            <div className="shoppingCartPopupImage">
              <p>
                <strong>{items[name - 1].name}</strong>
              </p>
              <img src={items[name - 1].image}></img>
            </div>
            <div className="shoppingCartPopupInfo">
              <p>{items[name - 1].price} ETH</p>
              <label htmlFor="shoppingCartQuantity">Quantity: </label>
              <input
                type="number"
                id="shoppingCartQuantity"
                name="shoppingCartQuantity"
                min="1"
                max="5"
                defaultValue={quantity}
                onChange={(event) => updateQuantity(event, name)}
              ></input>
              <button type="button" onClick={() => removeItem(name)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <h3>Total: {totalCost} ETH</h3>
        <button onClick={checkOutHandler}>Check Out</button>
      </div>
    );
  }

  const checkOutHandler = () => {
    console.log("Checking Out");
  };

  return (
    <CartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        showCart,
        totalCost,
        addToCart,
        updateTotal,
        showShoppingCartHandler,
        ShowShoppingCart,
        checkOutHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
