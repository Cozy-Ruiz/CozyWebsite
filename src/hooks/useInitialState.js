import { useState, useEffect } from "react";

const initialState = {
	cart: [],
}

const useInitialState = () => {
	const [stateContext, setState] = useState(initialState);

	const addToCart = (product) => {
		if (stateContext.cart.some(item => item.id === product.id)) {
			alert('Product is already in the cart');
		} else {
			setState(prevState => {
				const updatedCart = [...prevState.cart, {...product, quantity: 1}];
				localStorage.setItem('cart', JSON.stringify(updatedCart));
				return {...prevState, cart: updatedCart};
			});
		}
	};
	
	const removeFromCart = (product) =>{
		setState(prevState => {
			const updatedCart = prevState.cart.filter(items => items.id !== product.id);
			localStorage.setItem('cart', JSON.stringify(updatedCart));
			return {...prevState, cart: updatedCart};
		});
	}
	
	const setQuantity = (id, quantity) => {
		setState(prevState => {
			const updatedCart = prevState.cart.map(item => item.id === id ? {...item, quantity} : item);
			localStorage.setItem('cart', JSON.stringify(updatedCart));
			return {...prevState, cart: updatedCart};
		});
	}

	const setCart = () => {
		setState(initialState);
	}

	// Cargar los datos del carrito desde localStorage al iniciar la aplicación
	useEffect(() => {
		console.log('useEffect para obtener datos del carrito desde localStorage');
		const cartFromLocalStorage = localStorage.getItem('cart');
		if (cartFromLocalStorage) {
			setState(prevState => ({ ...prevState, cart: JSON.parse(cartFromLocalStorage) }));
		}
	  }, []);

	return {
		stateContext,
		addToCart,
		removeFromCart,
        setQuantity,
		setCart,
	}
}

export default useInitialState;