const warning = document.getElementById('warn');
const submit = document.getElementById('submit')

submit.addEventListener('click', function(e){
  e.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('pass').value
  console.log('clicked')

  console.log(email)
  console.log(password)

  firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
    window.location = "startpage.html"
  }).catch(function (error) {
    console.log(error.code, error.message)
    warning.classList.remove("dis");
    });

  console.log('done')

})

