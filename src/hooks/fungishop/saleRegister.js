const saleRegister = async (dataPayment, cart, router, context) => {

    try {

        if (dataPayment.body.status === 'approved') {

            console.log('Payment approved');

            const order = {
                name: dataPayment.payment_response.response.card.cardholder.name,
                email: dataPayment.payment_response.response.payer.email,
                phone: '',
                address: '',
                city: dataPayment.payment_response.response.card.country,
                state: '',
                zip_code: '',
                country: dataPayment.payment_response.response.card.country,
                organization: 1,
            };

            console.log("order:" +  JSON.stringify(order))
            
            const response = await fetch(`http://localhost:8000/apiClient/orders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });

            console.log(response);
            if (response.ok) {
                
                console.log('Sale register successfully');

                const responseOrder = await response.json();

                {cart.map((item) => {
                    const sale = {
                        product: item.id,
                        order: responseOrder.id,
                        quantity: item.quantity,
                        price: item.price,
                    };

                    const responseItem = fetch(`http://localhost:8000/apiClient/orders/OrderItems/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(sale)
                    });

                    if (responseItem.ok) {
                        console.log(responseItem.json());
                    }else{
                        console.log('Failed to register item sale');
                    }
                })}

                //vaciar carrito localsotrage
                context.setCart();

                //alert('Sale register successfully');
                router.push(`/fungishop/thanksPurchase/${responseOrder.id}`);
            } else {
                console.log('Failed to register sale');
                alert('Failed to register sale');
            }

        } else {
            console.log(dataPayment.body.status_detail);
            alert(dataPayment.body.status_detail);
            router.reload();
        }
        
    } catch (error) {
        console.log('Error:', error);
    }
    
}

export default saleRegister;