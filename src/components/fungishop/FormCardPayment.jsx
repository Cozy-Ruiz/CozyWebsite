import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import AppContext from '@context/AppContext';

import saleRegister from '@hooks/fungishop/saleRegister';

const FormCardPayment = ({total}) => {
    const context = useContext(AppContext);
    const router = useRouter();
    
    useEffect(() => {
        if (typeof total === 'number') {
            let script = document.getElementById('mercadoPagoScript');

            if (!script) {
                script = document.createElement('script');
                script.id = 'mercadoPagoScript';
                script.src = "https://sdk.mercadopago.com/js/v2";
                script.async = true;
                document.body.appendChild(script);
            }
            
            script.onload = () => {
                const mp = new MercadoPago('TEST-bbac164e-70fd-43c3-ae5e-04398832db48', {
                    locale: 'es-MX'
                });

                const bricksBuilder = mp.bricks();

                const renderCardPaymentBrick = async (bricksBuilder) => {
                    const settings = {
                        initialization: {
                            amount: total, // monto a ser pago
                            payer: {
                                email: "",
                            },
                        },
                        customization: {
                            visual: {
                                style: {
                                customVariables: {
                                    theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
                                }
                                }
                            },
                            paymentMethods: {
                                maxInstallments: 1,
                            }
                        },
                        callbacks: {
                            onReady: () => {
                                // callback llamado cuando Brick esté listo
                            },
                            onSubmit: (cardFormData) => {
                                //  callback llamado cuando el usuario haga clic en el botón enviar los datos
                                //  ejemplo de envío de los datos recolectados por el Brick a su servidor
                                return new Promise((resolve, reject) => {
                                    fetch("http://localhost:8000/apiClient/proccess-payment/", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(cardFormData)
                                    })
                                        .then((response) => {
                                            console.log(response)
                                            if (!response.ok) {
                                                throw new Error('Response was not ok');
                                            }
                                            return response.json();  // parse the response as JSON
                                        })
                                        .then((data) => {
                                            // Now you can access the data in the response
                                            saleRegister(data, context.stateContext.cart, router, context);

                                            resolve();
                                        })
                                        .catch((error) => {
                                            // tratar respuesta de error al intentar crear el pago
                                            alert('Pago fallido ' + error);
                                            reject();
                                        })
                                });
                            },
                            onError: (error) => {
                                // callback llamado para todos los casos de error de Brick
                            },
                        },
                    };

                    window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
                };

                renderCardPaymentBrick(bricksBuilder);
            };

            document.body.appendChild(script);
        }
    }, [total]);

    return(
        <div id="cardPaymentBrick_container"></div>
    );
}

export default FormCardPayment;
