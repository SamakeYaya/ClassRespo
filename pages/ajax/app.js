let form =  document.getElementById('mylogin')
form.addEventListener('submit',(ev)=>{
    ev.preventDefault()


      asynchroniserlogin()

    return false
});

function asynchroniserlogin(){
    let formData = new FormData(form)
    let data = Object.fromEntries(formData)
    datajson = JSON.stringify(data)
    let http = new XMLHttpRequest()
    http.open('POST','ajax/ajax.php',true)

    // Verifiction de la reponse
    http.onreadystatechange = function(response){
    if (this.readyState === 4 && this.status === 200) {
        response = JSON.parse(this.response) 

        if(response.succes === 1){
       window.location='prive.php';
        console.log(response)
        }else{
        console.log(response)
        }
    }
     }
     
    console.log(datajson)
    http.send(datajson) 
}



