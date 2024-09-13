import React, { useRef } from 'react';
import { doContact } from '@services/api/auth.service';
import styles from '@styles/Contact.module.scss';
import Image from 'next/image';
import telefonoVerde from '@icons/ICN_TelefonoVerde.png';
import correoVerde from '@icons/ICN_CorreoVerde.png';
import telepatiaVerde from '@icons/ICN_TelepatiaVerde.png';

const ContactForm = ({ color = 'white' }) => {
	
	const form = useRef(null);

	const handleSubmit = (event) => {
		
		event.preventDefault();
		const formData = new FormData(form.current);
		const data = {
			"name": formData.get('Nombre'),
			"email": formData.get('Email'),
			"message": formData.get('Mensaje')
		}

		//console.log(data);

		doContact(data).then((response) => {

			console.log(response);
			
			var formularioMensaje = document.getElementById("formularioMensaje");
			var mensajeExitoso = document.getElementById("mensajeExitoso");

			if(mensajeExitoso.style.display == "none"){

				mensajeExitoso.style.display = "block";
				formularioMensaje.style.display = "none";

			}else{

				mensajeExitoso.style.display = "none";
				formularioMensaje.style.display = "block";
			}
			
		});

		
		
	}

	return (
		
		
			<div className="row justify-content-center  align-items-center" >	
				<div className="col-md-6 col-xxl-4">
					<div className="card-body text-center" style={{color}}>
						<br/>
						<p className="card-text"><Image src={telefonoVerde} style={{width: '20px', height: '20px'}} />Teléfono</p>
						<p className="card-text">5527702588 </p>
						<br/>
						<p className="card-text"><Image src={correoVerde} style={{width: '20px', height: '20px'}}  />Correo</p>
						<p className="card-text">cozy.ruiz@gmail.com</p>
						<br/>
						<p className="card-text"><Image src={telepatiaVerde} style={{width: '20px', height: '20px'}}  />Telepatía</p>
						<p className="card-text">(En desarrollo…)</p> 
						<br/>
					</div>
				</div>

				<div className="col-md-6 col-xxl-4">
					
					<div className="card" id="formularioMensaje">
						<div className="card-body">
							<h2 className="card-title text-center">Envíame un mensaje</h2>
							<br/><br/>
							<form onSubmit={handleSubmit} className={styles.form} ref={form}>

								<div className="mb-3">
									<label for="exampleInputPassword1" className="form-label">Nombre</label>
									<input type="text" className="form-control" id="Nombre" name="Nombre" />
								</div>

								<div className="mb-3">
								<label for="exampleInputEmail1" className="form-label">Email</label>
								<input type="email" className="form-control" id="Email" name="Email" placeholder="name@example.com" />
								</div>
								
								<div className="mb-3">
									<label for="exampleInputPassword1" className="form-label">Mensaje</label>
									<textarea className="form-control" id="Mensaje" name="Mensaje"></textarea>
								</div>

								<div className="mb-3 text-end">
									<button type="submit" className="btn btn-primary">Submit</button>
								</div>

							</form>
						</div>
					</div>

					<div className="card text-center" id="mensajeExitoso" style={{ display: "none" }}>
                        <h2 className="card-title" style={{ color: '#008300' }}>Muchas gracias!</h2>
                        <p>Te responderé lo más pronto que pueda.</p>
                    </div>
				</div>
			</div>
		

		/*
		<div className={styles.Login}>
			<div className={styles['Login-container']}>
				<img src="./logos/logo_yard_sale.svg" alt="logo" className={styles.logo} />
				<form action="/" className={styles.form} ref={form}>
					<label htmlFor="email" className={styles.label}>Email address</label>
					<input type="text" name="email" placeholder="platzi@example.cm" className="input input-email" />
					<label htmlFor="password" className={styles.label}>Password</label>
					<input type="password" name="password" placeholder="*********" className="input input-password" />
					<button 
						onClick={handleSubmit} 
						className="primary-button login-button">
						Log in
					</button>
					<a href="/">Forgot my password</a>
				</form>
				<button className="secondary-button signup-button" >Sign up</button>
			</div>
		</div>
		*/
		
	);
}

export default ContactForm;

		