import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import { CartItem } from "../types/types";

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const cartItems = [
    {
      productId: "sdf",
      name: "MacBook Pro",
      price: 1299,
      quantity: 1,
      stock: 4,
      photo: "https://m.media-amazon.com/images/I/71gn83R0DPL._SX522_.jpg",
    },
  ]; // This would normally come from state or props
  const subtotal = 4000; // Example subtotal
  const tax = Math.round(subtotal * 0.18);
  const shippingCharges = 200;
  const discount = isValidCouponCode ? 40 : 0;
  const total = subtotal + tax + shippingCharges - discount;
    useEffect(() => {
    // Validate coupon code logic can go here
    console.log("Validating coupon code:", couponCode,isValidCouponCode);
    const timeoutId = setTimeout(() => {
      if (Math.random() > 0.5) {
        // Simulate valid coupon
        setIsValidCouponCode(true);
      } else {
        // Simulate invalid coupon
        setIsValidCouponCode(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
  };
  const removeHandler = (productId: string) => {
    console.log("Remove Item", productId);
  };


  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {<Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
