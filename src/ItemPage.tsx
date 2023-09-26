import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Header, Footer, Cart} from "./App"


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
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]")
  console.log('itempage loaded');

  const { id } = useParams<{ id?: string }>();
  const [properties, setProperties] = useState<Product>();
  const [cartItems, setCartItems] = useState<Product[]>(cartFromLocalStorage);

  console.log("cartFromLocalStorage is " + cartItems);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log('Wrote ' + JSON.stringify(cartItems) + ' to localStorage');
  }, [cartItems]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => setProperties(json))
  }, [id]);

  return (
    <>
      <Header></Header>
      <div>
        <h1>{id}</h1>
        <h1>{properties?.title}</h1>
        <h1>{properties?.price}</h1>
        <button
          className="w-24 h-24 bg-slate-500 z-10"
          onClick={(e) => {
            e.preventDefault();
            // addCartItems({ id, title, price, description, category, image } as Product);
            // addCartItems={(it: Product) => {
            if(cartItems.find((item) => item.id === properties?.id)) {
              console.log("found duplicate");
              const dupIdx = cartItems.findIndex((item) => item.id === properties?.id);
              const updatedCart = [...cartItems];
              updatedCart[dupIdx].quantity++;
              setCartItems(updatedCart);
            }
            else{
              setCartItems(cartItems.concat(properties!));
            }
              // console.log(cartItems);
            }}
        ></button>
        <Link
          state={cartItems}
          to={"/"}>
            Go back
        </Link>

      </div>
      <Footer></Footer>
      <Cart items={cartItems}></Cart>
    </>
  );
};

export default ItemPage;
