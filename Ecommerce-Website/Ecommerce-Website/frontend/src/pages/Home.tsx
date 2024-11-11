import React, { useEffect, useState, useContext } from "react";
import { Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "react-feather";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../utils/AppContext';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const { cartItems, setCartItems } = useContext(AppContext);

    useEffect(() => {
        fetch('src/data/products.json') // Adjust path as necessary
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const addToCart = (product) => {
        const temp = [...cartItems];
        const currentItem = temp.find(item => item.id === product.id);
        if (currentItem) {
          currentItem.quantity += 1;
        } else {
          temp.push({ ...product, quantity: 1 });
        }
        setCartItems(temp);
      
        // Show toast notification with reduced duration
        toast.success(`${product.name} added to cart!`, {
          autoClose: 2000, // Duration in milliseconds (2000ms = 2 seconds)
        });
      };
    
      const removeFromCart = (product) => {
        const temp = [...cartItems];
        const currentItem = temp.find(item => item.id === product.id);
        if (currentItem) {
          if (currentItem.quantity > 1) {
            currentItem.quantity -= 1;
          } else {
            const index = temp.indexOf(currentItem);
            temp.splice(index, 1);
            // Show red toaster notification
            toast.error(`Removed ${product.name} from cart`, {
              autoClose: 1500, // Duration in milliseconds
            });
          }
          setCartItems(temp);
        }
      };

    return (
        <div className="flex flex-col items-center w-full">

            {/* First Div */}
            <div className="relative w-full h-[450px] bg-[#3A3845] md:bg-[url('/src/assets/contact_header.png')] bg-cover">
                <div className="absolute left-1/3 transform -translate-x-1/2 top-0 bottom-0 w-full md:w-[420px] bg-[#3A3845] flex flex-col justify-center items-center p-8 space-y-8">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="w-20 h-20 rounded-full bg-[#C69B7B] flex items-center justify-center">
                        <Mail size={64} color="#3A3845" />
                    </div>
                    <h2 className="text-white text-3xl font-semibold uppercase font-garamond">
                        Contact Us
                    </h2>
                </div>
        <div className="flex flex-col items-center space-y-5 pt-6 border-t border-[#CAC9CF]">
            <p className="text-white text-sm font-semibold">
                Follow us on social media
            </p>
            <div className="flex space-x-4">
                {[
                    { icon: Facebook, name: 'facebook' },
                    { icon: Twitter, name: 'twitter' },
                    { icon: Instagram, name: 'instagram' },
                    { icon: Linkedin, name: 'linkedin' },
                    { icon: Youtube, name: 'youtube' },
                ].map(({ icon: Icon, name }) => (
                    <a
                        key={name}
                        href={`https://${name}.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 bg-[#C69B7B] rounded-full flex items-center justify-center"
                    >
                        <Icon size={16} color="#3A3845" />
                    </a>
                ))}
            </div>
        </div>
    </div>
</div>

            

            {/* Second Div */}
            <div className="w-full bg-white py-[80px]">
                <div className="flex justify-center items-center h-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-full max-w-screen-xl">
                        {products.slice(0, 4).map(product => (
                            <div key={product.id} className="flex flex-col items-center">
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover mb-2"
                                        style={{ width: '255px', height: '255px' }}
                                    />
                                </Link>
                                <Link to={`/product/${product.id}`}>
                                    <p className="text-center text-lg font-semibold">{product.name}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Third Div */}
            <div className="w-full bg-white">
                <div className="flex justify-center items-center h-full">
                    <div className="flex w-full h-[348px] max-w-screen-xl px-4">
                        {/* Left Partition */}
                        <div className="flex-1 flex flex-col justify-center p-8 bg-gray-100">
                            <h1 className="text-3xl font-bold mb-4">Discover Our Latest Collection</h1>
                            <p className="text-lg text-gray-700 mb-4">
                                Explore the elegance of our newly arrived products that are designed to 
                                inspire your everyday style.
                            </p>
                            <Link to="/shop">
                                <button className="text-lg font-semibold text-[#3A3845] underline hover:no-underline">
                                    Shop Now
                                </button>
                            </Link>
                        </div>

                        {/* Right Partition - Full Image Cover */}
                        <div className="flex-1 flex items-center justify-center bg-gray-200">
                            <img
                                src="src/assets/home/Image8.png" 
                                alt="Product Highlight"
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Fourth Div - Best Sellers */}
            <div className="w-full bg-white py-12">
            <div className="max-w-screen-xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {products.slice(0, 8).map(product => {
                        const inCart = cartItems.find(item => item.id === product.id);

                        return (
                            <div key={product.id} className="flex flex-col items-start">
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover mb-2"
                                        style={{ width: '255px', height: '321px' }}
                                    />
                                </Link>
                                <Link to={`/product/${product.id}`}>
                                    <p className="text-lg font-semibold mb-2">{product.name}</p>
                                </Link>
                                <p className="text-gray-700 mb-2">{product.cost}</p>
                                <p className="text-sm text-gray-500 mb-4">{product.description}</p>

                                {/* Add to Cart or Quantity management */}
                                {inCart ? (
                                    <div className="w-[255px] border border-[#3A3845] flex justify-between items-center">
                                        <button
                                            onClick={() => removeFromCart(product)}
                                            className="px-4 py-2 bg-gray-300 border-r border-gray-300"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2 text-center">Quantity: {inCart.quantity}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="px-4 py-2 bg-gray-300 border-l border-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-[255px] bg-white border border-[#3A3845] text-[#3A3845] py-2 px-4 hover:bg-gray-100"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

            {/* Fifth Div */}
            <div className="w-full bg-white py-8">
                <div className="flex flex-col items-center w-full max-w-screen-xl px-4 space-y-12">
                    {/* Row 1 - Content Left, Image Right */}
                    <div className="flex flex-col md:flex-row w-full items-center">
                        {/* Left Partition (Content) */}
                        <div className="md:flex-1 h-[348px] flex flex-col items-center justify-center p-8 bg-[#F7F6F5]">
                            <h2 className="text-3xl font-bold mb-4">Made in Viet Nam Since 1450</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Mattis sit phasellus mollis sit aliquam sit nullam neque ultrices.
                            </p>
                            <button className="text-lg font-semibold text-[#3A3845] underline hover:no-underline">
                                Learn More
                            </button>
                        </div>
                        
                        {/* Right Partition (Image) */}
                        <div className="md:flex-1 flex items-center justify-center bg-gray-200">
                            <img
                                src="src/assets/home/b1.png"
                                alt="Vision"
                                className="w-[555px] h-[348px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Row 2 - Image Left, Content Right */}
                    <div className="flex flex-col md:flex-row-reverse w-full items-center">
                        {/* Left Partition (Image) */}
                        <div className="md:flex-1 h-[348px] flex flex-col items-center justify-center p-8 bg-[#F7F6F5]">
                            <h2 className="text-3xl font-bold mb-4">Our History</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Mattis sit phasellus mollis sit aliquam sit nullam neque ultrices.
                            </p>
                            <button className="text-lg font-semibold text-[#3A3845] underline hover:no-underline">
                                Learn More
                            </button>
                        </div>
                        {/* Right Partition (Content) */}
                        <div className="md:flex-1 flex items-center justify-center bg-gray-200">
                            <img
                                src="src/assets/home/b2.png"
                                alt="Mission"
                                className="w-[555px] h-[348px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sixth Div - Discover New Arrivals */}
            <div className="w-full bg-white py-12">
            <div className="max-w-screen-xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Discover New Arrivals</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {products.slice(4, 8).map(product => {
                        const inCart = cartItems.find(item => item.id === product.id);

                        return (
                            <div key={product.id} className="flex flex-col items-start">
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover mb-2"
                                        style={{ width: '255px', height: '321px' }}
                                    />
                                </Link>
                                <Link to={`/product/${product.id}`}>
                                    <p className="text-lg font-semibold mb-2">{product.name}</p>
                                </Link>
                                <p className="text-gray-700 mb-2">{product.cost}</p>
                                <p className="text-sm text-gray-500 mb-4">{product.description}</p>

                                {/* Add to Cart or Quantity management */}
                                {inCart ? (
                                    <div className="w-[255px] border border-[#3A3845] flex justify-between items-center">
                                        <button
                                            onClick={() => removeFromCart(product)}
                                            className="px-4 py-2 bg-gray-300 border-r border-gray-300"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2 text-center">Quantity: {inCart.quantity}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="px-4 py-2 bg-gray-300 border-l border-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-[255px] bg-white border border-[#3A3845] text-[#3A3845] py-2 px-4 hover:bg-gray-100"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

            {/* Seventh Div */}
            <div className="w-full bg-white">
                <div className="flex justify-center items-center h-full">
                    <div className="flex w-full h-[348px] max-w-screen-xl px-4">
                        {/* Left Partition */}
                        <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-gray-100">
                            <p className="text-[#807F86]">TABLEWARE</p>
                            <h2 className="text-3xl font-bold mb-4">The Secrets to a Kitchen Room</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Mattis sit phasellus mollis sit aliquam sit nullam neque ultrices.
                            </p>
                        </div>

                        {/* Right Partition - Full Image Cover */}
                        <div className="flex-1 flex items-center justify-center bg-gray-200">
                            <img
                                src="src/assets/home/blog.png"
                                alt="Product Highlight"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Ninth Div */}
            <section className="w-full px-4 py-24 bg-white">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-lg font-semibold mb-2 text-gray-600">
                        Sign up for emails
                    </p>
                    <h2 className="text-3xl font-bold mb-8 uppercase text-gray-800">
                        FOR NEW COLLECTIONS & MORE
                    </h2>
                    <input
                        className="w-full mb-4 p-3 border-b border-gray-800 focus:outline-none"
                        placeholder="Enter your email address"
                    />
                    <button className="px-8 py-3 border border-gray-800 text-gray-800 font-semibold uppercase hover:bg-gray-800 hover:text-white transition duration-300">
                        SIGN UP
                    </button>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
};

export default Homepage;
