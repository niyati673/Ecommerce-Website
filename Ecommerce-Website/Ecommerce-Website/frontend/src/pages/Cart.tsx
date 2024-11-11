import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from "../utils/AppContext";

const CartItem = ({ product, handleQuantityChange, handleRemove }) => {
    const { id, name, cost, image, quantity } = product;
    const subtotal = Number(cost.slice(1).replace(",", "")) * quantity;

    return (
        <tr className="text-center py-5">
            <td className="py-5">
                <button 
                    onClick={() => handleRemove(id)} 
                    className="text-red-600 hover:text-red-800"
                >
                    <FontAwesomeIcon icon={faTimes} className="text-red-600" />
                </button>
            </td>
            <td className="py-5">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-[120px] h-[141px] object-cover mx-auto" 
                />
            </td>
            <td className="py-5">{name}</td>
            <td className="py-5">${Number(cost.slice(1).replace(",", ""))}</td>
            <td className="py-5">
                <div className="flex items-center justify-center">
                    <button 
                        onClick={() => handleQuantityChange(id, quantity - 1)} 
                        className="px-2 py-1 border border-black bg-gray-200 hover:bg-gray-300"
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button 
                        onClick={() => handleQuantityChange(id, quantity + 1)} 
                        className="px-2 py-1 border border-black bg-gray-200 hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="py-5">${subtotal}</td>
        </tr>
    );
};

const CartPage = () => {
    const { cartItems, setCartItems } = useContext(AppContext);
    const [couponCode, setCouponCode] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(
            cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemove = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartSubtotal = cartItems.reduce((total, item) => total + Number(item.cost.slice(1).replace(",", "")) * item.quantity, 0);

    const handleCheckout = () => {
        navigate("/checkout"); // Redirect to checkout page
    };

    const handleApplyCoupon = () => {
        // Here you can add logic to apply the coupon
        toast.success("Coupon applied successfully!"); // Show success toast
    };

    // New function to handle the Update Cart action
    const handleUpdateCart = () => {
        // Logic for updating the cart can be added here
        toast.success("Cart updated successfully!"); // Show success toast
    };

    return (
        <div className="container mx-auto p-4">
            <Breadcrumb />
            <h2 className="text-2xl font-semibold mb-4">Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <table className="min-w-full border-collapse text-center">
                        <thead>
                            <tr className="bg-[#3A3845] text-white">
                                <th className="px-4 py-2">
                                    <FontAwesomeIcon icon={faTrash} />
                                </th>
                                <th className="px-4 py-2">Product</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(product => (
                                <CartItem
                                    key={product.id}
                                    product={product}
                                    handleQuantityChange={handleQuantityChange}
                                    handleRemove={handleRemove}
                                />
                            ))}
                        </tbody>
                    </table>

                    {/* Coupon and Update Cart section */}
                    <div className="flex justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            <input 
                                type="text" 
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Coupon Code" 
                                className="border px-4 py-2"
                            />
                            <button 
                                onClick={handleApplyCoupon}
                                className="bg-gray-800 text-white px-4 py-2 rounded-none"
                            >
                                Apply Coupon
                            </button>
                        </div>
                        <button 
                            onClick={handleUpdateCart} // Call the new function here
                            className="bg-gray-800 text-white px-4 py-2"
                        >
                            Update Cart
                        </button>
                    </div>

                    {/* Cart totals */}
                    <div className="mt-6 p-4 bg-[#3A3845] text-white w-full md:w-1/3 ml-auto">
                        <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Total:</span>
                            <span>${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <button 
                            className="bg-[#3A3845] text-white border-2 border-white px-4 py-2 mt-4 w-full hover:bg-gray-800"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
            <ToastContainer />
        </div>
    );
};

const Breadcrumb = () => (
    <nav className="mb-4">
        <ol className="flex space-x-2">
            <BreadcrumbItem href="/home">Home</BreadcrumbItem>
            <span className="text-gray-500">/</span>
            <li className="text-gray-800 font-semibold">Cart</li>
        </ol>
    </nav>
);

const BreadcrumbItem = ({ children, href }) => (
    <li>
        <Link to={href} className="text-gray-600 hover:text-gray-800">
            {children}
        </Link>
    </li>
);

export default CartPage;
