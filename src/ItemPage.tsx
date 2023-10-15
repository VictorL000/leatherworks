import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header, Footer, Cart } from "./App";
import { colorLookup, imgLookupFn } from "./colors.ts";
import cards from "./assets/cards.svg";
import coins from "./assets/coins.svg";
import pulltab from "./assets/pull-tab.svg";

import {Context} from "./App";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  features: string[];
  colors: string[];
  insights: string[];
  quantity: number;
};

const ItemPage = () => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]");
  console.log("itempage loaded");

  const { id } = useParams<{ id?: string }>();
  const [properties, setProperties] = useState<Product>();
  const [cartItems, setCartItems] = useState<Product[]>(cartFromLocalStorage);
  const [currentImg, setCurrentImg] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>("");
  const [fullscreenImg, setFullscreenImg] = useState<boolean>(false);

  console.log("cartFromLocalStorage is " + cartItems);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Wrote " + JSON.stringify(cartItems) + " to localStorage");
  }, [cartItems]);

  useEffect(() => {
    fetch(`http://143.110.158.216:5000/products/${id}`, {"mode": "cors"})
      .then((res) => res.json())
      .then((json) => { setProperties(json); setCurrentImg(json.images[0]); setCurrentColor(json.colors[0])});
  }, [id]);

  type ImageFullscreenProps = {
    image: string;
  }

  const ImageFullscreen = ({image}: ImageFullscreenProps) => {
    return (
      <button type="button" className="fullscreen-container" onClick={() => setFullscreenImg(false)}>
        <img src={image} alt="Image fullscreen" srcSet="" className="cursor-default" onClick={(e) => e.stopPropagation()}/>
      </button>
    );
  }

  return (
    <>
      <Header></Header>
      <div className="item-page-container-container">
        <div className="breadcrumb">
          <Link to={"/"}>
            <h4 className="text-lg underline inline-block mr-1.5">Home</h4>
          </Link>
          <h4 className="text-lg italic inline-block"> &gt; Bifold Wallet</h4>
        </div>
        <div className="item-page-container">
          <div className="img-container">
            <button type="button" onClick={() => setFullscreenImg(true)}>
              <img src={currentImg} alt={properties?.title} />
            </button>
            <div className="carousel flex gap-4 mt-7">
              {properties?.images.map((image) => (
                <button type="button" onClick={() => setCurrentImg(image)}>
                  <img src={image} alt={properties?.title} />
                </button>
              ))}
            </div>
          </div>
          <div className="item-info">
            <h1 className="font-semibold">{properties?.title}</h1>
            <div className="price flex items-start my-1">
              <span>${properties?.price}</span>
              <span className="text-sm ml-1 pt-0.5">CAD</span>
            </div>
            <div className="separate"></div>
            <h5 className=" my-4">{properties?.description}</h5>
            <h3 className="font-semibold tracking-tight inline">Select Colour: </h3>
            <h4 className="inline">{currentColor}</h4>
            <div className="mt-4 flex gap-3">
              {properties?.colors.map((color: string) => (
                <button type="button" onClick={() => setCurrentColor(color)}>
                  <div className="color-dot shadow" style={{ "backgroundColor": colorLookup[color] }}></div>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="z-10 add-to-cart shadow"
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

            <div className="feature-container flex  justify-between">
              <div className="feature">
                <img src={cards} alt="" />
                <h5>{properties?.features[0]}</h5>
              </div>
              <div className="feature">
                <img src={pulltab} alt="" />
                <h5>{properties?.features[1]}</h5>
              </div>
              <div className="feature">
                <img src={coins} alt="" />
                <h5>{properties?.features[2]}</h5>
              </div>
            </div>

            <div className="insights my-4">
              <h4 className="font-semibold">Design Insights:</h4>
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit consequat neque, sodales accumsan risus faucibus id. Suspendisse ut felis pharetra, mollis lorem vel, volutpat ex.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit consequat neque, sodales accumsan risus faucibus id. Suspendisse ut felis pharetra, mollis lorem vel, volutpat ex.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit consequat neque, sodales accumsan risus faucibus id. Suspendisse ut felis pharetra, mollis lorem vel, volutpat ex.</li>
              </ul>
            </div>
            <div className="insights my-4">
              <h4 className="font-semibold">Materials and Construction</h4>
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit consequat neque, sodales accumsan risus faucibus id. Suspendisse ut felis pharetra, mollis lorem vel, volutpat ex.</li>
              </ul>
            </div>


            {/* <div className="specifications mt-5">
              <h4>Specifications</h4>
            </div> */}
          </div>
        </div>
      </div>
      <Footer></Footer>
      <Context.Provider value={{ cartItems, setCartItems }}>
        <Cart items={cartItems}></Cart>
      </Context.Provider>
      {fullscreenImg ? <ImageFullscreen image={currentImg}></ImageFullscreen> : null}
    </>
  );
};


export default ItemPage;
