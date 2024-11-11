import React, { useState, useEffect, useContext } from 'react';
import { FaStar, FaFacebookF, FaTwitter, FaInstagram, FaPlus, FaMinus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../utils/AppContext';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams<{ id: string }>(); // Retrieve the product ID from the URL
  const [loading, setLoading] = useState(true); // Track loading state
  const { cartItems, setCartItems } = useContext(AppContext);

  useEffect(() => {
    // Fetch the product data
    fetch('/src/data/products.json') // Make sure this path is correct
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched products:', data); // Check if the data is fetched
        setProducts(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // Even on error, set loading to false
      });
  }, []);

  const handleQuantityChange = (change: number) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
  };

  // Find the selected product based on the ID from the URL
  const selectedProduct = products.find(product => product.id === parseInt(id));

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <div className="w-full bg-white py-8 px-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> &gt;
          <a href="/shop" className="mx-2 hover:underline">Shop</a> &gt;
          <span className="mx-2">Product</span>
        </nav>

        <div className="flex">
          {/* Left Division */}
          <div className="w-[535px] h-[833px]">
            {/* Use object-contain to preserve the natural image size without distortion */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-[701px] object-contain"
            />
          </div>

          {/* Right Division */}
          <div className="w-[515px] h-[732px] pl-8">
            {/* Product Name and Rating */}
            <h1 className="text-2xl font-bold mb-2">{selectedProduct.name}</h1>
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
              <span className="ml-2 text-sm text-gray-500">(12345 reviews)</span>
            </div>

            {/* Stock Status */}
            <p className="text-sm text-gray-500 mb-2">Stock: In Stock</p>

            {/* Price */}
            <p className="text-xl font-semibold mb-4">{selectedProduct.cost}</p>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center mb-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-2 py-1 border-r border-gray-300 bg-gray-200 hover:bg-gray-300"
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-[100px] h-[48px] text-center border-0 outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-2 py-1 border-l border-gray-300 bg-gray-200 hover:bg-gray-300"
                >
                  <FaPlus />
                </button>
              </div>
              <button
                onClick={() => {
                  const temp = [...cartItems];
                  const currentItem = temp.find(item => item.id === selectedProduct.id);
                  console.log('Current item:', currentItem);
                  if (currentItem) {
                    currentItem.quantity += 1;
                  } else {
                    temp.push({ ...selectedProduct, quantity: 1 });
                  }
                  setCartItems(temp);
                }}
                className="bg-[#3A3845] text-white py-2 px-6 rounded h-[48px] ml-4"
              >
                Add to Cart
              </button>
            </div>

            {/* Buy Now and Favorite */}
            <div className="flex items-center mb-4">
              <button className="bg-white text-black border border-gray-300 py-2 px-6 rounded w-[457px] h-[48px] mr-4">Buy Now</button>
            </div>

            {/* Share Section */}
            <div className="flex items-center mb-4">
              <p className="text-sm font-semibold mr-4">Share this:</p>
              <a href="https://facebook.com" className="text-gray-500 mr-2 hover:text-gray-700">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-gray-500 mr-2 hover:text-gray-700">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-gray-700">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="w-full bg-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Similar Products</h2>

          {/* Display only 4 products (1 row of 4 products) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.slice(0, 4).map(product => (
              <div key={product.id} className="flex flex-col items-start">
                <Link to={`/product/${product.id}`}>
                  {/* Use object-contain to maintain the natural dimensions of the images */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-contain mb-2"
                    style={{ maxWidth: '255px', maxHeight: '321px' }} // Set max dimensions
                  />
                </Link>
                <Link to={`/product/${product.id}`}>
                  <p className="text-lg font-semibold mb-2">{product.name}</p>
                </Link>
                <p className="text-gray-700 mb-2">{product.cost}</p>
                <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                <button onClick={() => {
                  const temp = [...cartItems];
                  const currentItem = temp.find(item => item.id === product.id);
                  if (currentItem) {
                    currentItem.quantity += 1;
                  } else {
                    temp.push({ ...product, quantity: 1 });
                  }
                  setCartItems(temp);
                }} className="w-[255px] bg-white border border-[#3A3845] text-[#3A3845] py-2 px-4 hover:bg-gray-100">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
