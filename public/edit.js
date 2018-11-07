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

var imei, unit_curr, unit_new, line1, line2, line3, line4, alarm1, alarm2;

function update(){
  

  // Get the value of the input field with id="numb"
  imei = document.getElementById("imei").value;
  unit_curr = document.getElementById("unit_curr").value;
  unit_new = document.getElementById("unit_new").value;
  latitude = document.getElementById("latitude").value;
  longtitude = document.getElementById("longtitude").value;
  
  
  line1 = document.getElementById("line1").value;
  line2 = document.getElementById("line2").value;
  line3 = document.getElementById("line3").value;
  line4 = document.getElementById("line4").value;

  alarm1 = document.getElementById("alarm1").checked;
  alarm2 = document.getElementById("alarm2").checked;


  console.log(alarm1);
  console.log(alarm2);

  // 019652455487501 A01 Signal101
  var stat = 'Status: Wrong IMEI';
  document.getElementById("status").innerHTML = stat;
  // document.getElementById("status").innerHTML = stat;
  var ref = database.ref('/IMEI');
  ref.once('value',function (snapshot) {
    snapshot.forEach(function(childSnapshot) {       
      var key = childSnapshot.key;
      var val = childSnapshot.val();

      if (imei == key)
      {
        // stat = val;
        stat = 'Status: Wrong Unit Name';
        document.getElementById("status").innerHTML = stat;
        // val = 'A01';
        var db_id = database.ref('/ID').child(val + '/Current');
        db_id.once('value',function (snapshot_id) {
          // stat = 'OK';
          var data = snapshot_id.val();
          // stat = unit_curr + '...' + data['UnitName'];
          if (unit_curr == data['UnitName']){
            data['UnitName'] = unit_new;
            data['Latitude'] = parseFloat(latitude);
            data['Longtitude'] = parseFloat(longtitude);
            
            data['Line1'] = line1;
            data['Line2'] = line2;
            data['Line3'] = line3;
            data['Line4'] = line4;

            data['Alarm1'] = alarm1;
            data['Alarm2'] = alarm2;

            


            data['Pub'] = 1;
            

            
            db_id.set(data);           
            stat = 'Status: Update Success';
            document.getElementById("status").innerHTML = stat;
          }
        });
      }
  });
  });
}

function load(){
  var imei, unit_curr, unit_new;

  // Get the value of the input field with id="numb"
  imei = document.getElementById("imei").value;
  unit_curr = document.getElementById("unit_curr").value;
  unit_new = document.getElementById("unit_new").value;

  // 019652455487501 A01 Signal101
  var stat = 'Status: Wrong IMEI';
  document.getElementById("status").innerHTML = stat;
  // document.getElementById("status").innerHTML = stat;
  var ref = database.ref('/IMEI');
  ref.once('value',function (snapshot) {
    snapshot.forEach(function(childSnapshot) {       
      var key = childSnapshot.key;
      var val = childSnapshot.val();

      if (imei == key)
      {
        stat = 'Status: Wrong Unit Name';
        document.getElementById("status").innerHTML = stat;

        var db_id = database.ref('/ID').child(val + '/Current');
        db_id.once('value',function (snapshot_id) {
          var data = snapshot_id.val();
          if (unit_curr == data['UnitName']){
            document.getElementById("unit_new").value = unit_curr;
            document.getElementById("latitude").value =data['Latitude'];
            document.getElementById("longtitude").value = data['Longtitude'];
            
            document.getElementById("line1").value = data['Line1'];
            document.getElementById("line2").value = data['Line2'];
            document.getElementById("line3").value = data['Line3'];
            document.getElementById("line4").value = data['Line4'];

            document.getElementById("alarm1").value = data['Alarm1']; 
            document.getElementById("alarm2").value = data['Alarm2'];
            
        
            console.log(data['Alarm1']);

            document.getElementById("alarm1").checked = data['Alarm1'];
            document.getElementById("alarm2").checked = data['Alarm2'];

            
                  
            stat = 'Status: Load Success';
            document.getElementById("status").innerHTML = stat;
          }
        });
      }
  });
  });
}



