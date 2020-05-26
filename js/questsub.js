const submit = document.getElementById('questsub');

submit.addEventListener('click', function(e){
  e.preventDefault();
  

  const uploader = document.getElementById('uploader').value;
  const courses = document.getElementById('courses').value;
  const question = document.getElementById('question').value;
  const option1 = document.getElementById('option1').value;
  const option2 = document.getElementById('option2').value;
  const option3 = document.getElementById('option3').value;
  const option4 = document.getElementById('option4').value;
  const answer = document.getElementById('answer').value



  db.collection(courses).doc(question).set({
    uploader: uploader,
    courses: courses,
    question: question,
    option1: option1,
    option2: option2,
    option3: option3,
    option4: option4,
    answer: answer,
  })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
})

