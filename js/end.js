// const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const logout = document.getElementById('logout')
var db = firebase.firestore();

logout.addEventListener('click', ()=>{
  firebase.auth().signOut().then(function () {
    window.location= 'index.html'
  }).catch(function (error) {
    // An error happened.
  });
})

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = `${mostRecentScore} / ${MAX_HIGH_SCORES}`;



// saveHighScore = e => {
//   console.log("clicked the save button!");
//   e.preventDefault();


//   const score = {
//     score: mostRecentScore,
//     name: username.value
//   };

//   localStorage.setItem("highScores", JSON.stringify(highScores));
//   window.location.assign("startpage.html");
// };


function save(e){
  e.preventDefault();
  console.log('1')
  var user = firebase.auth().currentUser
  db.collection("student").doc("score").set({
    name: user.email,
    score: mostRecentScore,
    
  })
    .then(function () {
      console.log("Document successfully written!");
      firebase.auth().signOut()
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user)
  } else {
    window.location = 'index.html'
  }
});

