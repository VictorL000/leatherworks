import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Header, Footer, Cart } from "./App";
import reactLogo from "./assets/react.svg";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
};

const ItemPage = () => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]");
  console.log("itempage loaded");

  const { id } = useParams<{ id?: string }>();
  const [properties, setProperties] = useState<Product>();
  const [cartItems, setCartItems] = useState<Product[]>(cartFromLocalStorage);

  console.log("cartFromLocalStorage is " + cartItems);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Wrote " + JSON.stringify(cartItems) + " to localStorage");
  }, [cartItems]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProperties(json));
  }, [id]);

  return (
    <>
      <Header></Header>
      <div className="breadcrumb">
        <Link to={"/"}>
          <h4 className="text-lg underline inline-block mr-1.5">Home</h4>
        </Link>
        <h4 className="text-lg italic inline-block"> &gt; Bifold Wallet</h4>
      </div>
      <div className="item-page-container">
        <div className="img-container">
          <img src={properties?.image} alt={properties?.title} />
          <div className="carousel flex gap-4 mt-8">
            <button>
              <img src={reactLogo} alt={properties?.title} />
            </button>
            <img src={reactLogo} alt={properties?.title} />
            <img src={reactLogo} alt={properties?.title} />
            <img src={reactLogo} alt={properties?.title} />
            <img src={reactLogo} alt={properties?.title} />
          </div>
        </div>
        <div className="item-info">
          <h1>{properties?.title}</h1>
          <div className="price flex items-start my-1">
            <span>${properties?.price}</span>
            <span className="text-sm ml-1 pt-0.5">CAD</span>
          </div>
          <div className="separate"></div>
          <h5 className=" my-4">{properties?.description}</h5>
          <h3 className="font-bold tracking-tight inline">Select Colour:</h3>
          <h4 className=" inline"> Hazelnut</h4>
          <div className="mt-4">
            <button>
              <img src={reactLogo} alt="" />
            </button>
          </div>
          <button
            className="bg-slate-500 z-10 add-to-cart"
            onClick={(e) => {
              e.preventDefault();
              // addCartItems({ id, title, price, description, category, image } as Product);
              // addCartItems={(it: Product) => {
              if (cartItems.find((item) => item.id === properties?.id)) {
                console.log("found duplicate");
                const dupIdx = cartItems.findIndex((item) => item.id === properties?.id);
                const updatedCart = [...cartItems];
                updatedCart[dupIdx].quantity++;
                setCartItems(updatedCart);
              } else {
                setCartItems(cartItems.concat({...properties!, quantity: 1}));
              }
              // console.log(cartItems);
            }}
          >
            <h4>Add to Cart</h4>
          </button>

          <div className="insights mb-4">
            <h4 className=" font-bold">Design Insights:</h4>
            <ul>
              <li>IInsight 1Insight 1Insight 1Insight 1nsight 1</li>
              <li>Insight 2</li>
              <li>Insight 3</li>
              <li>Insight 4</li>
              <li>Insight 5</li>
            </ul>
          </div>

          <div className="feature-container flex  justify-between">
            <div className="feature">
              <img src={reactLogo} alt="" />
              <h5>Fits 10-11 cards</h5>
            </div>
            <div className="feature">
              <img src={reactLogo} alt="" />
            </div>
            <div className="feature">
              <img src={reactLogo} alt="" />
            </div>
          </div>

          {/* <div className="specifications mt-5">
            <h4>Specifications</h4>
          </div> */}
        </div>
      </div>
      <Footer></Footer>
      <Cart items={cartItems}></Cart>
    </>
  );
};

export default ItemPage;
