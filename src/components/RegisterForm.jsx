import React, { useRef } from 'react';
//import { doContact } from '@services/api/auth.service';
import styles from '@styles/Contact.module.scss';
import Image from 'next/image';
//import telefonoVerde from '@icons/ICN_TelefonoVerde.png';
//import correoVerde from '@icons/ICN_CorreoVerde.png';
//import telepatiaVerde from '@icons/ICN_TelepatiaVerde.png';

const RegisterForm = () => {
	
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
		
		<div className={styles.container}>
			<div className="row justify-content-center  align-items-center" >	

				<div className="col-md-6 col-xxl-4">
					
					<div className="card" id="formularioMensaje">
						<div className="card-body">
							<h2 className="card-title text-center">Register</h2>
							<br/><br/>
							<form onSubmit={handleSubmit} className={styles.form} ref={form}>

								<div className="mb-3">
									<label htmlFor="Nombre" className="form-label">Nombre</label>
									<input type="text" className="form-control" id="Nombre" name="Nombre" />
								</div>

								<div className="mb-3">
								<label htmlFor="Email" className="form-label">Email</label>
								<input type="email" className="form-control" id="Email" name="Email" placeholder="name@example.com" />
								</div>
								
								<div className="mb-3">
									<label htmlFor="Mensaje" className="form-label">Mensaje</label>
									<textarea className="form-control" id="Mensaje" name="Mensaje"></textarea>
								</div>

								<div className="mb-3 text-end">
									<button type="submit" className="btn btn-primary">Submit</button>
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
        
	);
}

export default RegisterForm;

		