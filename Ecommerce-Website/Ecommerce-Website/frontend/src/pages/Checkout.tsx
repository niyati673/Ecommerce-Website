import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Smartphone } from 'lucide-react';
import AppContext from '../utils/AppContext';

const BreadcrumbItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <li>
    <Link to={href} className="text-gray-600 hover:text-gray-800">
      {children}
    </Link>
  </li>
);

const Breadcrumb = () => (
  <nav className="mb-4">
    <ol className="flex space-x-2">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <span className="text-gray-500">/</span>
      <BreadcrumbItem href="/shop">Shop</BreadcrumbItem>
      <span className="text-gray-500">/</span>
      <li className="text-gray-800 font-semibold">Checkout</li>
    </ol>
  </nav>
);

const InputField = ({
  label = '',
  type = 'text',
  required = false,
  placeholder = '',
  className = '',
}: {
  label?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && ' *'}
      </label>
    )}
    <input
      type={type}
      className="w-full bg-transparent p-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-[#3A3845]"
      required={required}
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({
  label = '',
  options,
  required = false,
}: {
  label?: string;
  options: string[];
  required?: boolean;
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && ' *'}
    </label>
    <select
      className="w-full bg-transparent p-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-[#3A3845]"
      required={required}
    >
      <option value="" disabled selected>
        Select {label}
      </option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const Button = ({
  className,
  children,
  primary = false,
}: {
  className?: string;
  children: React.ReactNode;
  primary?: boolean;
}) => (
  <button
    className={`px-4 py-2 rounded-none ${primary ? 'bg-[#3A3845] text-white' : 'bg-transparent border border-gray-300 text-gray-800'} ${className}`}
  >
    {children}
  </button>
);

const ProductSummary = ({ cartItems }) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const cost = Number(item.cost.slice(1).replace(",", "")); // Convert cost to number
      return total + (cost * item.quantity); // Calculate subtotal for each item
    }, 0);
  };

  const shippingCost = 15.00; // This can be dynamic as well

  const totalCost = calculateSubtotal() + shippingCost;

  return (
    <div className="p-4 rounded-none h-full">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2 text-sm">
        {cartItems.map((item) => {
          const cost = Number(item.cost.slice(1).replace(",", "")); // Convert cost to number
          return (
            <div className="flex justify-between" key={item.id}>
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{(cost * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
        <div className="border-t pt-2 font-semibold">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t pt-2 font-semibold">
          <div className="flex justify-between text-xl mt-2">
            <span>Total</span>
            <span>₹{totalCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};



const PaymentSection = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');

  return (
    <div className="bg-[#3A3845] text-white p-4 rounded-none mt-4 h-full">
      <h2 className="text-lg font-semibold mb-4">Payment</h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="flex items-center cursor-pointer transition-all duration-300 relative">
            <input
              type="radio"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={() => setPaymentMethod('credit')}
              className="absolute opacity-0 w-0 h-0"
            />
            <span className="w-5 h-5 inline-block mr-2 rounded-full border border-white flex-shrink-0 relative">
              <span
                className={`w-3 h-3 rounded-full bg-white absolute inset-0 m-auto transition-all duration-200 ${paymentMethod === 'credit' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              ></span>
            </span>
            <CreditCard className="mr-2" /> Credit Card
          </label>
          {paymentMethod === 'credit' && (
            <div className="space-y-2 transition-all duration-300">
              <InputField
                type="text"
                required
                placeholder="1234 5678 9012 3456"
              />
              <InputField type="text" required placeholder="John Doe" />
              <div className="flex space-x-2">
                <InputField
                  type="text"
                  required
                  placeholder="MM/YY"
                  className="w-1/2"
                />
                <InputField
                  type="text"
                  required
                  placeholder="123"
                  className="w-1/2"
                />
              </div>
            </div>
          )}
          <label className="flex items-center cursor-pointer transition-all duration-300 relative">
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
              className="absolute opacity-0 w-0 h-0"
            />
            <span className="w-5 h-5 inline-block mr-2 rounded-full border border-white flex-shrink-0 relative">
              <span
                className={`w-3 h-3 rounded-full bg-white absolute inset-0 m-auto transition-all duration-200 ${paymentMethod === 'paypal' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              ></span>
            </span>
            <Smartphone className="mr-2" /> PayPal
          </label>
          {paymentMethod === 'paypal' && (
            <div className="space-y-2 transition-all duration-300">
              <InputField type="email" required placeholder="PayPal email" />
            </div>
          )}
        </div>
        <button className="bg-transparent border px-4 py-2 flex items-center hover:bg-blue-50 hover:text-gray-900 transition duration-300">
          Place Order
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const Checkout = () => {
  const { cartItems } = useContext(AppContext);

  return (
    <div className="container mx-auto px-4">
      <Breadcrumb />
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="First Name" required placeholder="John" />
              <InputField label="Last Name" required placeholder="Doe" />
              <InputField
                label="Company"
                placeholder="Company Name (optional)"
              />
              <SelectField
                label="Country / Region"
                options={['United States', 'Canada', 'United Kingdom']}
                required
              />
            </div>
            <InputField
              label="Street address"
              required
              placeholder="123 Main St"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Town / City" required placeholder="New York" />
              <SelectField
                label="State"
                options={['California', 'New York', 'Texas']}
                required
              />
              <InputField label="ZIP Code" required placeholder="10001" />
              <InputField
                label="Phone"
                type="tel"
                required
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <InputField
              label="Email"
              type="email"
              required
              placeholder="john.doe@example.com"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order notes
              </label>
              <textarea
                className="w-full bg-transparent p-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-[#3A3845]"
                rows={4}
                placeholder="Additional information about your order"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <Link to="/cart">
                <Button className="border border-gray-300 hover:bg-gray-100 transition duration-300">
                  Return to cart
                </Button>
              </Link>
              <Button primary>Continue to shipping</Button>
            </div>
          </form>
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0 flex flex-col">
          <ProductSummary cartItems={cartItems} />
          <PaymentSection />
        </div>
      </div>
    </div>
  );
};


export default Checkout;
