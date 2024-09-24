// import { useState } from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import xsvg from "./assets/x.svg";
// import viteLogo from '/vite.svg'
import "./output.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = createContext({} as any);

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
          {/* <img src={reactLogo} alt="" srcSet="" /> */}
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
          <svg viewBox="0 0 31 28">
                    <circle cx="13" cy="24" r="2"></circle><circle cx="24" cy="24" r="2"></circle>
                    <path d="M1.5 2h3s1.5 0 2 2l4 13s.4 1 1 1h13s3.6-.3 4-4l1-5s0-1-2-1h-19"></path>
          </svg>
          {/* <img src={reactLogo} alt="" srcSet="" /> */}
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="insta">
      </div>
      <h2>
        <a href="">Contact</a>
      </h2>
      <h6 className="copyright">2024</h6>
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
  images: string[];
  quantity: number;
  addCartItems?: (item: Product) => void;
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
    fetch("http://69.55.55.63:5000/products", {"mode": "cors"})
      .then((res) => { console.log(res) ;return res.json();  })
      .then((json) => setItems(json));
    // console.log(response);
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
                images={item.images}
                image={item.images[0]}
                quantity={1}
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
      <Context.Provider value={{ cartItems, setCartItems }}>
        <Cart items={cartItems}></Cart>
      </Context.Provider>
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
const Item = ({title, price, images}: Product) => {
  return (
    <>
      <div className="item">
        <div className="img-container">
          <img src={images[0]} alt="" srcSet="" />
        </div>
        <h3 className="text-med">{title}</h3>
        <h4 className="text-sm font-medium">${price}</h4>
        <div className="item-colors">
          <div className="color-dot shadow" style={{ "backgroundColor": "#BFA67A" }}></div>
          <div className="color-dot shadow" style={{ "backgroundColor": "#4d2c2d" }}></div>
          <div className="color-dot shadow" style={{ "backgroundColor": "#3f2913" }}></div>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CartItem = ({ id, title, price, images, quantity}: Product) => {
  const { cartItems, setCartItems } = useContext(Context);
  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img src={images[0]} alt="" />
      </div>
      <div className="cart-item-text">
        <div className="flex justify-between ">
          <h3 className="text-lg font-medium">{title}</h3>
          <button type="button" onClick={(e) => {
            e.preventDefault();
            const dupIdx = cartItems.findIndex((item: Product) => item.id === id);
            const updatedCart = [...cartItems];
            updatedCart[dupIdx].quantity--;
            if (updatedCart[dupIdx].quantity === 0) {
              updatedCart.splice(dupIdx, 1);
            }
            setCartItems(updatedCart);
          }}>
            <img src={xsvg} alt=""/>
          </button>
        </div>
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
        <div className="cart-button">
          <a
            role="button"
            onClick={() => document.getElementsByClassName("cart")[0].classList.add("disabled")}
          >
            {/* <img src={reactLogo} alt="" /> */}
            <svg viewBox="0 0 31 31">
              <circle cx="13" cy="24" r="2"></circle><circle cx="24" cy="24" r="2"></circle>
              <path d="M1.5 2h3s1.5 0 2 2l4 13s.4 1 1 1h13s3.6-.3 4-4l1-5s0-1-2-1h-19"></path>
            </svg>
          </a>
        </div>
      </div>
      {items.map((item: Product) => (
        <CartItem
          key={item.id}
          id={item.id}
          price={item.price}
          title={item.title}
          images={item.images}
          image={item.images[0]}
          quantity={item.quantity}
        ></CartItem>
      ))}
    </div>
  );
};

export default App;

export { Header, Footer, Cart, Context };
