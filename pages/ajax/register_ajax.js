// Evenements
let form = document.querySelector("#registration_form");

form.addEventListener('submit', (ev) => {
	ev.preventDefault();

	asynchroniserRegister();
	// console.log(fname)
	return false;

})

// La recuperation des elements 
let fname = document.querySelector('#fname');
let lname = document.querySelector('#lname');
let email = document.querySelector('#email');
let contact = document.querySelector('#tel');
let password = document.querySelector('#pass');
let password2 = document.querySelector('#cfpass');

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


	// First Name verify
	if (fnameValue === "") {
		let message = "First name ne peut pas être vide";
		setError(fname, message);
	} else if (!fnameValue.match(/^[a-zA-Z]/)) {
		let message = "First name ne doit commencer par une lettre";
		setError(fname, message)
	} else {
		let letterNum = fnameValue.length;
		if (letterNum < 3) {
			let message = "First name doit avoir au moins 3 caractères";
			setError(fname, message)
		} else {
			// setSuccess(fname);
			data['fname'] = fnameValue
      // Last name veify
			if (lnameValue === "") {
				let message = "Last name ne peut pas être vide";
				setError(lname, message);
			} else if (!lnameValue.match(/^[a-zA-Z]/)) {
				let message = "Last name doit commencer par une lettre";
				setError(lname, message)
			} else {
				let letterNum = lnameValue.length;
				if (letterNum < 3) {
					let message = "Last name doit avoir au moins 3 caractères";
					setError(lname, message)
				} else {
					// setSuccess(lname);
					data['lname'] = lnameValue

					// email verify
					if (emailValue === "") {
						let message = "Email ne peut pas être vide";
						setError(email, message);
					} else if (!email_verify(emailValue)) {
						let message = "Email non valide";
						setError(email, message);
					} else {
						// setSuccess(email)
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
								let message = "Le mot de passe est trop faible (8 à 12 caractères). Au moins 1 caractères majuscule,1 caractères special et un chiffre";
								setError(password, message)
							} else {
								// setSuccess(password);
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
				// document.getElementById('mg').style.display = 'none'
			
				let formData = new FormData(form)
				let data1 = Object.fromEntries(formData)
				datajson = JSON.stringify(data1)
				let http = new XMLHttpRequest()
				http.open('POST', 'ajax/register_ajax.php', true)

				// Verifiction de la reponse
				http.onreadystatechange = function(response) {
					if (this.readyState === 4 && this.status === 200) {
						response = JSON.parse(this.response)
						 if(response.succes==1){
						     console.log(response)
                 let message = 'User succeccfully saved';
                 setSuccess(document.getElementById('msg'),message)
                //Ici je fais la redirection vers une autre page
						 }else{
                 let message = "User allready Exist! Pleace verify your E-mail."
                 setSuccess(document.getElementById('msg'),message)
             }

						// console.log(response)
					}
				}

				// console.log(datajson)
				http.send(datajson)		
		}
	}
}

function setError(elm, message) {

	document.getElementById('msg').innerHTML = '<div class="alert alert-danger" id="mg">' + message + '</div>';
	elm.className = "form-control error";
	// elm.style.bgColor='red';
	elm.focus()
}

function setSuccess(elem,message) {
	// const formControl = elem.parentElement;
	// formControl.className ='form-control success'
	// elem.className ='form-control border'
	elem.innerHTML = '<div class="alert alert-success">' + message + '</div>';

}

function email_verify(email) {
  // Expression régulière pour valider l'adresse e-mail
  const regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

  // Utilise la méthode test() de l'objet RegExp pour vérifier si la chaîne de caractères respecte la RegEx
  return regex.test(email);
}


function password_verify(passeword) {
  // Expression régulière pour valider le mot de passe
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;

  // Utilise la méthode test() de l'objet RegExp pour vérifier si la chaîne de caractères respecte la RegEx
  return regex.test(passeword);
}


function contact_verify(contact) {
	// Expression régulière pour valider le numéro de téléphone
	const regex = /^(\+225|00225)?\s?(05|07|01)(\s?\d{2}){3}$/;

	// Utilise la méthode test() de l'objet RegExp pour vérifier si la chaîne de caractères respecte la RegEx
	return regex.test(contact);
}