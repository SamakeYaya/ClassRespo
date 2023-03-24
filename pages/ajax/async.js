// let form =  document.getElementById('registration_form')
// form.addEventListener('submit',(ev)=>{
//     ev.preventDefault()


//     asynchroniserRegister()

//     return false
// });

// function asynchroniserRegister(){
//     let formData = new FormData(form)
//     let data = Object.fromEntries(formData)
//     datajson = JSON.stringify(data)
//     let http = new XMLHttpRequest()
//     http.open('POST','ajax/register_ajax.php',true)

//     // Verifiction de la reponse
//     http.onreadystatechange = function(response){
//     if (this.readyState === 4 && this.status === 200) {
//         response = JSON.parse(this.response) 
//         if(response.succes==1){
//             console.log(response)
//         }
            
//         // console.log(response)            
//     }
//      }
     
//     // console.log(datajson)
//     http.send(datajson) 
// }
