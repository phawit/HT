// function asdfg() {
//   window.frames['iframe_a'].location = "map.html";
// }

// function zxcvb() {
//   window.frames['iframe_a'].location = "edit.html";
// }

// var x = document.getElementById("dropdown_id");
// x.style.display = "none";

localStorage.name = 0;

var config = {
    apiKey: "AIzaSyA8hvIgXiCLMJt0cLKtQI-mwge4WvQbIuo",
    authDomain: "humidtemp-59706.firebaseapp.com",
    databaseURL: "https://humidtemp-59706.firebaseio.com",
    projectId: "humidtemp-59706",
    storageBucket: "humidtemp-59706.appspot.com",
    messagingSenderId: "1072796099399"
  };
firebase.initializeApp(config);
var database = firebase.database();

function pasuser(form) {
  var login_stat = 0;
  var ref = database.ref('/').child('User');
  ref.once('value',function (snapshot) {
    snapshot.forEach(function(childSnapshot) {       
      var key = childSnapshot.key;
      var val = childSnapshot.val();
      if (form.uname.value==key) { 
        if (form.psw.value==val) {
            login_stat = 1;   
            localStorage.name = 1;      
            // location="map.html";
        }
      }
    });
    if (login_stat==0)
    {
        alert("Invalid Username and Password")
    }
  });
}