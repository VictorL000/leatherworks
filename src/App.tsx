// import { useState } from 'react'
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from '/vite.svg'
import "./output.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </>
  );
}

function Header() {
  return (
    <div className="header">
        <div className="hamburger">
          <img src={reactLogo} alt="" srcSet="" />
        </div>
      <Link to={"/"}>
        <div className="logo">
          <h1 className="text-4xl w-40 text-center">•✕•</h1>
        </div>
      </Link>
      <div className="cart-button">
        <a
          role="button"
          onClick={() => document.getElementsByClassName("cart")[0].classList.remove("disabled")}
        >
          <img src={reactLogo} alt="" srcSet="" />
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="insta">
        <img src={reactLogo} alt="" srcSet="" />
      </div>
      <h2>
        <a href="">Contact</a>
      </h2>
      <h6 className="copyright">2023</h6>
    </div>
  );
}

type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
  quantity: number;
  addCartItems: (item: Product) => void;
};

function Content() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]");

  const [items, setItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Wrote " + JSON.stringify(cartItems) + " to localStorage");
  }, [cartItems]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, []);

  return (
    <>
      <div className="content">
        <div className="item-container">
          {items.map((item) => (
            // <a role='button' tabIndex={0} onClick={() => setCartItems(cartItems.concat(item))}>
            <Link state={cartItems} key={item.id} to={"/products/" + item.id.toString()}>
              <Item
                id={item.id}
                price={item.price}
                title={item.title}
                image={item.image}
                addCartItems={(it: Product) => {
                  setCartItems(cartItems.concat(it));
                  console.log({ cartItems });
                }}
              ></Item>
            </Link>
            // </a>
          ))}
          <div className="item phantom"></div>
          <div className="item phantom"></div>
          <div className="item phantom"></div>
          <div className="item phantom"></div>
          <div className="item phantom"></div>
        </div>
      </div>
      <Cart items={cartItems}></Cart>
    </>
  );
}

// interface ItemOverviewProps {
//   itemTitle: string;
//   itemPrice: number;
//   itemId: number;
//   itemImg: string;
// }
// addCartItems: (item: Product) => void,
const Item = ({ id, title, price, description, category, image, addCartItems }: Product) => {
  return (
    <>
      <div className="item">
        <div className="img-container">
          <img src={image} alt="" srcSet="" />
        </div>
        <h3 className="text-med">{title.substring(0, 15)}</h3>
        <h4 className="text-sm font-medium">${price}</h4>
        <div className="item-colors">
          <img src={reactLogo} alt="" srcSet="" />
          <img src={reactLogo} alt="" srcSet="" />
        </div>
        <h4 className="text-sm">Bifold wallet</h4>
        {/* <button
          className="w-24 h-24 bg-slate-500 z-10"
          onClick={(e) => {
            e.preventDefault();
            addCartItems({ id, title, price, description, category, image } as Product);
          }}
        ></button> */}
      </div>
    </>
  );
};

const CartItem = ({ id, title, price, image, quantity }: Product) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img src={image} alt="" />
      </div>
      <div className="cart-item-text">
        <h3 className="text-lg">{title.substring(0, 15)}</h3>
        <div className="flex justify-between">
          <h4 className="text-sm">${price}</h4>
          <h4 className="text-sm font-medium">x {quantity}</h4>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Cart = ({ items }: any) => {
  return (
    <div className="cart disabled ">
      <div className="cart-header">
        <h2 className="text-2xl">Cart</h2>
        <a
          role="button"
          onClick={() => document.getElementsByClassName("cart")[0].classList.add("disabled")}
        >
          <img src={reactLogo} alt="" />
        </a>
      </div>
      {items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          price={item.price}
          title={item.title}
          image={item.image}
          quantity={item.quantity}
        ></CartItem>
      ))}
    </div>
  );
};

export default App;

export { Header, Footer, Cart };
