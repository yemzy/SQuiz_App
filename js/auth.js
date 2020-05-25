firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user)
    document.getElementById('ename').innerHTML = user.email
  } else {
    window.location = 'index.html'
  }
});

