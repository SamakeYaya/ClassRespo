// La recuperation des elements 
let form = document.querySelector("#registration_form");
let fname = document.querySelector('#fname');
let lname = document.querySelector('#lname');
let email = document.querySelector('#email');
let contact = document.querySelector('#tel');
let password = document.querySelector('#pass');
let password2 = document.querySelector('#cfpass');

// Evenements
form.addEventListener('submit', (ev) => {
	ev.preventDefault();

	asynchroniserRegister();
	// console.log(fname)


	return false;

})

// Fonctions
function asynchroniserRegister() {
	// Obtenir toutes les valeurs des inputs
	fnameValue = fname.value.trim()
	lnameValue = lname.value.trim()
	emailValue = email.value.trim()
	contactValue = contact.value.trim()
	passwordValue = password.value.trim()
	password2Value = password2.value.trim()

	// console.log(fname)
	let data = {}


	// Username verify
	if (fnameValue === "") {
		let message = "Username ne peut pas être vide";
		setError(fname, message);
	} else if (!fnameValue.match(/^[a-zA-Z]/)) {
		let message = "Username doit commencer par une lettre";
		setError(fname, message)
	} else {
		let letterNum = fnameValue.length;
		if (letterNum < 3) {
			let message = "Username doit avoir au moins 3 caractères";
			setError(fname, message)
		} else {
			setSuccess(fname);
			data['fname'] = fnameValue

			if (lnameValue === "") {
				let message = "Username ne peut pas être vide";
				setError(lname, message);
			} else if (!lnameValue.match(/^[a-zA-Z]/)) {
				let message = "Username doit commencer par une lettre";
				setError(lname, message)
			} else {
				let letterNum = lnameValue.length;
				if (letterNum < 3) {
					let message = "Username doit avoir au moins 3 caractères";
					setError(lname, message)
				} else {
					setSuccess(lname);
					data['lname'] = lnameValue

					// email verify
					if (emailValue === "") {
						let message = "Email ne peut pas être vide";
						setError(email, message);
					} else if (!email_verify(emailValue)) {
						let message = "Email non valide";
						setError(email, message);
					} else {
						setSuccess(email)
						data['email'] = emailValue

						// Contact verify
						if (contactValue === "") {
							let message = "Contact ne peut pas être vide";
							setError(contact, message);
						} else if (!contact_verify(contactValue)) {
							let message = "Contact non valide";
							setError(contact, message);
						} else {
							// setSuccess(contact)
							data['contact'] = contactValue


							if (passwordValue === "") {
								let message = "Le passeword ne peut pas être vide";
								setError(password, message)

							} else if (!password_verify(passwordValue)) {
								let message = "Le mot de passe est trop faible (8 à 12 caractères)";
								setError(password, message)
							} else {
								setSuccess(password);
								data['password'] = passwordValue

								// pwd confirm
								if (password2Value === "") {
									let message = "Le passeword confirm ne peut pas être vide";
									setError(password2, message)
								} else if (passwordValue !== password2Value) {
									let message = "Les mot de passes ne correspondent pas";
									setError(password2, message)
								} else {

									//  setSuccess(password2)
									data['password2'] = password2Value
								}
							}
						}

					}
				}


			}
		}


		// ici je fais mon traitement asynchrone ( Vers un fichier php par exemple) par l'envoi de mes donees

		const condition = data['fname'] == undefined || data['email'] == undefined || data['password'] == undefined || data['lname'] == undefined || data['password2'] == undefined || data['contact'] == undefined
		if (condition) {
			console.log('Error!!!')
		}
		// Mon traitement asynchrone
		else {
			// Ici je fais mon traitement asynchrone
			console.log(data)
			if (document.getElementById('mg').style.display = 'block') {
				document.getElementById('mg').style.display = 'none'
			} else {
				let formData = new FormData(form)
				let data1 = Object.fromEntries(formData)
				datajson = JSON.stringify(data1)
				let http = new XMLHttpRequest()
				http.open('POST', 'ajax/register_ajax.php', true)

				// Verifiction de la reponse
				http.onreadystatechange = function(response) {
					if (this.readyState === 4 && this.status === 200) {
						response = JSON.parse(this.response)
						//  if(response.succes==1){
						//      console.log(response)
						//  }

						console.log(response)
						setSuccess(document.getElementById('msg'))

					}
				}

				// console.log(datajson)
				http.send(datajson)
			}
		}



	}
}

function setError(elm, message) {

	document.getElementById('msg').innerHTML = '<div class="alert alert-danger" id="mg">' + message + '</div>';
	elm.className = "form-control error";
	// elm.style.bgColor='red';
	elm.focus()
}

function setSuccess(elem) {
	// const formControl = elem.parentElement;
	// formControl.className ='form-control success'
	// elem.className ='form-control border'
	let message = 'Enregistre'
	elem.innerHTML = '<div class="alert alert-success">' + message + '</div>';

}

function email_verify(email) {
	/*
	* r_rona.22-t@gmail.com
	    /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
	*/
	return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}

function password_verify(passeword) {
	return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(passeword);
}

function contact_verify(contact) {
	// Expression régulière pour valider le numéro de téléphone
	const regex = /^(\+225|00225)?\s?(05|07|01)(\s?\d{2}){3}$/;

	// Utilise la méthode test() de l'objet RegExp pour vérifier si la chaîne de caractères respecte la RegEx
	return regex.test(contact);
}