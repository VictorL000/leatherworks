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
      <div className="leftNav">
        <div className="hamburger">
          <img src={reactLogo} alt="" srcSet="" />
        </div>
        <div className="search">
          <img src={reactLogo} alt="" srcSet="" />
        </div>
      </div>
      <div className="logo">
        <h1 className="text-4xl">•✕•</h1>
      </div>
        <div className="cart">
          <a role="button" onClick={() => document.getElementsByClassName("cartBar")[0].classList.remove("disabled")}>
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
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]")

  const [items, setItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log('Wrote ' + JSON.stringify(cartItems) + ' to localStorage');
  }, [cartItems]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, []);

  return (
    <>
      <div className="content">
        <div className="itemContainer">
          {items.map((item) => (
            // <a role='button' tabIndex={0} onClick={() => setCartItems(cartItems.concat(item))}>
            <Link
              state={cartItems}
              key={item.id}
              to={"/products/" + item.id.toString()}>
              
              <Item
                id={item.id}
                price={item.price}
                title={item.title}
                image={item.image}
                addCartItems={(it: Product) => {
                  setCartItems(cartItems.concat(it));
                  console.log({cartItems});
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
const Item = ({id, title, price, description, category, image, addCartItems} : Product) => {
  return (
    <>
      <div className="item">
        <div className="imgContainer">
          <img src={image} alt="" srcSet="" />
        </div>
        <h3 className="text-sm">{title}</h3>
        <h4 className="text-sm">${price}</h4>
        <div className="itemColors">
          <img src={reactLogo} alt="" srcSet="" />
          <img src={reactLogo} alt="" srcSet="" />
        </div>
        <button
          className="w-24 h-24 bg-slate-500 z-10"
          onClick={(e) => {
            e.preventDefault();
            addCartItems({ id, title, price, description, category, image } as Product);
          }}
        ></button>
      </div>
    </>
  );
};

const CartItem = ({ id, title, price, image, quantity }: Product) => {
  return (
    <div className="flex">
      <div className="cartItemImgContainer">
        <img src="itemImg" alt="" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm">{title}</h3>
        <div className="flex justify-between">
          <h4 className="text-sm">${price}</h4>
          <h4 className="text-sm">x {quantity}</h4>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Cart = ({items} : any) => {
  return (
    <div className = "cartBar disabled ">
      <div className="cartSticky">
          <a role="button" onClick={() => document.getElementsByClassName("cartBar")[0].classList.add("disabled")}>
          <img src={reactLogo} alt="" />
        </a>
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
    </div>
  );
};

export default App;

export { Header, Footer, Cart };
