var x = document.getElementById("dropdown_id");
x.style.display = "none";

// function qwert(unit) {
//   window.frames['iframe_b'].location = "info.html?unit="+unit;
// };

// global = {
//   openinfo: function (unit) {
//     return qwert(unit);
//   }
// };

function asdfg() {
  window.frames['iframe_a'].location = "map.html";
}

function zxcvb() {
  window.frames['iframe_a'].location = "edit.html";
}

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
          var x = document.getElementById("dropdown_id"); 
          x.style.display = "block";    
          var x = document.getElementById("login_id"); 
          x.style.display = "none";  
          asdfg(); 
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