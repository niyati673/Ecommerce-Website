import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../utils/AppContext';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    price: [],
    color: [],
    tags: []
  });
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const { cartItems, setCartItems } = useContext(AppContext);

  useEffect(() => {
    // Fetching product data
    fetch('src/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Show all products by default
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const parsePrice = (priceString) => parseInt(priceString.replace(/₹|,/g, ''), 10);

  const applyFilters = () => {
    let tempProducts = [...products];

    // Category filter
    if (selectedFilters.category.length > 0) {
      tempProducts = tempProducts.filter(product => selectedFilters.category.includes(product.category));
    }

    // Price filter
    if (selectedFilters.price.length > 0) {
      tempProducts = tempProducts.filter(product => {
        const productPrice = parsePrice(product.cost);
        return selectedFilters.price.some(range => {
          if (range === '5500+') return productPrice > 5509;
          const [min, max] = range.split('-').map(Number);
          return productPrice >= min && productPrice <= max;
        });
      });
    }

    // Color filter
    if (selectedFilters.color.length > 0) {
      tempProducts = tempProducts.filter(product => selectedFilters.color.includes(product.color));
    }

    // Tag filter
    if (selectedFilters.tags.length > 0) {
      tempProducts = tempProducts.filter(product => selectedFilters.tags.includes(product.tag));
    }

    // Sorting
    if (sortBy === 'name') {
      tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
      tempProducts.sort((a, b) => parsePrice(a.cost) - parsePrice(b.cost));
    }

    setFilteredProducts(tempProducts);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters };
    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    } else {
      newFilters[filterType].push(value);
    }
    setSelectedFilters(newFilters);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    applyFilters(); // Apply filters after sorting
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters, sortBy]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => (
    <div className="flex justify-end mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`border border-gray-300 px-3 py-1 mx-1 ${
            currentPage === index + 1 ? 'bg-gray-300' : ''
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );

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
    <div className="flex justify-center w-full bg-white py-16">
      {/* Left Filter Section */}
      <div className="w-[258px] h-[852px] p-4 bg-white">
        <h3 className="text-lg font-semibold mb-4">Showing {filteredProducts.length} items</h3>
        {/* Category Filter */}
        <div className="mb-6">
  <h4 className="text-md font-semibold mb-2">Category</h4>
  {['dinnerware', 'ceramic', 'furniture', 'decor_art', 'gift_sets'].map(category => (
    <div key={category}>
      <label>
        <input
          type="checkbox"
          value={category}
          onChange={() => handleFilterChange('category', category)}
        />
        <span className="ml-2 capitalize">{category.replace('_', ' ')}</span>
      </label>
      <br />
    </div>
  ))}
  <hr className="border-t border-black mt-2 mb-4" />
</div>

{/* Price Range Filter */}
<div className="mb-6">
  <h4 className="text-md font-semibold mb-2">Price Range</h4>
  {['0-1500', '1500-3000', '3000-4000', '4000-5499', '5500+'].map(range => (
    <div key={range}>
      <label>
        <input
          type="checkbox"
          value={range}
          onChange={() => handleFilterChange('price', range)}
        />
        <span className="ml-2">₹{range.replace('-', ' - ')}</span>
      </label>
      <br />
    </div>
  ))}
  <hr className="border-t border-black mt-2 mb-4" />
</div>

        
      </div>

      {/* Right Products Section */}
      <div className="w-[829px] h-[1776px] p-4">
        {/* Sort By Dropdown */}
        <div className="flex justify-end items-center mb-8" style={{ height: '10px' }}>
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 font-semibold">Sort by:</label>
            <select
              id="sort"
              className="border border-gray-300 px-2 py-1"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentProducts.map((product) => {
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

        {/* Pagination */}
        {renderPagination()}

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ShopPage;
