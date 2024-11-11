import { createContext } from 'react';

const AppContext = createContext({
    cartItems: [],
    setCartItems: (items: any) => {},
    itemsCost: 0,
    setItemsCost: (cost: number) => {},
});

export default AppContext