const form = document.forms["loginForm"];
form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const email = form["email"].value;
  const password = form["password"].value;

  return loginUser({ email, password });
}

function loginUser({ email, password }) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      const userCredential = user.user;
      const uuid = userCredential.uid;
      console.log("UUID del usuario:", uuid);
      console.log("userCredential:", userCredential);

      //localStorage.setItem("dato", uuid);
      //localStorage.setItem("dato2", user);
      window.location.href =
        "F1ZWS3CgDdAikCh9jOGuFcBT8PTy5xPc8NTyL1EqfNms2euI.html";
    })
    .catch(function (error) {
      console.log(error);
      alertTryAgain(error);
    });
}

function signoutUser() {
  firebase.auth().signOut();
}

function alertTryAgain(error) {
  return alert("Error, intenta de nuevo.");
}
