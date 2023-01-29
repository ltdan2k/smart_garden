
var statelamp =false;
var statefan =false;
var statepump =false;
var valueLamp ="OFF";
var valueFan ="OFF";
var valuePump ="OFF";


function LoadForm()
{
 document.getElementById("dangnhap").style.display = "block";
 document.getElementById("dieukhien").style.display = "none";

}

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA5R3tSn0rVajaU30eF3fgkhfRGZqvmaGA",
    authDomain: "tt-iot-eeb9d.firebaseapp.com",
    databaseURL: "https://tt-iot-eeb9d-default-rtdb.firebaseio.com",
    projectId: "tt-iot-eeb9d",
    storageBucket: "tt-iot-eeb9d.appspot.com",
    messagingSenderId: "610709263766",
    appId: "1:610709263766:web:d674ce2b9525e9bbcfb9b7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  //functions
  // make sure that the name in ' ' match with name of your database child
  var nhietDo = document.getElementById('nhietdo');
  var dbRef = firebase.database().ref().child('Nhiet do');
  var doAm = document.getElementById('doam');
  var dbRef2 = firebase.database().ref().child('Do am');
  dbRef.on('value', snap => nhietDo.innerText = snap.val());
  dbRef2.on('value', snap => doAm.innerText = snap.val());

  // var ssidd = document.getElementById('nhietdo');
  // var dbRef = firebase.database().ref().child('Nhiet do');
  // var doAm = document.getElementById('doam');
  // var dbRef2 = firebase.database().ref().child('Do am');
  // dbRef.on('value', snap => nhietDo.innerText = snap.val());
  // dbRef2.on('value', snap => doAm.innerText = snap.val());
  // var dbssid = firebase.database().ref().child('ssid');
  // var dbpass = firebase.database().ref().child('pass');

  // dbssid.once("value" , function(snapshot){
  //   var data_ssid = snapshot.val();
  // })
  // dbpass.once("value" , function(snapshot){
  //   var data_pass = snapshot.val();
  // })


  // var leadsRef = database.ref().child('ssid');
  // leadsRef.on('value', function(snapshot) {
  //     snapshot.forEach(function(childSnapshot) {
  //       var ssidd = childSnapshot.val();
  //     });
  // });




  var lampp = document.getElementById('den');
  var dbRef3 = firebase.database().ref('DK').child('den');
  dbRef3.on('value', snap => lampp.innerText = snap.val());

  var fann = document.getElementById('quat');
  var dbRef4 = firebase.database().ref('DK').child('quat');
  dbRef4.on('value', snap => fann.innerText = snap.val());

  var pumpp = document.getElementById('maybom');
  var dbRef5 = firebase.database().ref('DK').child('maybom');
  dbRef5.on('value', snap => pumpp.innerText = snap.val());

  function WriteDataTofb(lamp,fan,pump)
{
    firebase.database().ref("DK").set({
        den:lamp,
        quat:fan,
        maybom:pump
    });

}

// var dbReflamp = firebase.database().ref('DK').child('den');
// dbReflamp.on('value',snap => {
//     if(snap.val()=="ON"){
//         statelamp=true;
//         valueLamp="ON"
//     }
//     else if(snap.val()=="OFF"){
//         statelamp=false;
//         valueLamp="OFF";
//     }
// });

// var dbReffan = firebase.database().ref('DK').child('quat');
// dbReflamp.on('value',snap => {
//     if(snap.val()=="ON"){
//         statefan=true;
//         valueFan="ON"
//     }
//     else if(snap.val()=="OFF"){
//         statefan=false;
//         valueFan="OFF";
//     }
// });

// var dbReffan = firebase.database().ref('DK').child('maybom');
// dbReflamp.on('value',snap => {
//     if(snap.val()=="ON"){
//         statepump=true;
//         valuePump="ON"
//     }
//     else if(snap.val()=="OFF"){
//         statepump=false;
//         valuePump="OFF";
//     }
// });

function clicklamp(){
  statelamp=!statelamp;
  if(statelamp){
      valueLamp="ON";
  }else{
      valueLamp="OFF"
  }
  WriteDataTofb(valueLamp,valueFan,valuePump);
}

function clickfan(){
  statefan=!statefan;
  if(statefan){
      valueFan="ON";
  }else{
      valueFan="OFF"
  }
  WriteDataTofb(valueLamp,valueFan,valuePump);
}

function clickpump(){
  statepump=!statepump;
  if(statepump){
      valuePump="ON";
  }else{
      valuePump="OFF"
  }
  WriteDataTofb(valueLamp,valueFan,valuePump);
}


 


function backHOME(){
 //window.onload();
   if (window.confirm('Bạn muốn quay lại???'))
   {
       document.getElementById("dangnhap").style.display = "block";
       document.getElementById("dieukhien").style.display = "none";
   }
   else
   {
       document.getElementById("dangnhap").style.display = "none";
       document.getElementById("dieukhien").style.display = "block";	
   }
}

// check login form
function login()
{
   var ssid = document.getElementById("ssid").value;
   var pass = document.getElementById("pass").value;
   
   if(ssid == "a" && pass == "a")
   {
       console.log("OK");
       document.getElementById("ssid").value = "";	
       document.getElementById("pass").value = "";
       document.getElementById("dangnhap").style.display = "none";
       document.getElementById("dieukhien").style.display = "block";	
       
   }
   else 
   {
       console.log("Error!!!");
       document.getElementById("ssid").value = "";	
       document.getElementById("pass").value = "";
       alert("Tên đăng nhập hoặc mật khẩu không đúng vui lòng kiểm tra lại!!!");
   }
}

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() 
{
   var data = google.visualization.arrayToDataTable([
 ['Label', 'Value'],
 ['Nhiệt độ', 80],
]);

var data1 = google.visualization.arrayToDataTable([
 ['Label', 'Value'],
 ['Độ ẩm', 80],

]);

var optionsnhietdo = {
 min: 0, max: 150,
 width: 400, height: 120,
 redFrom: 130, redTo: 150,
 yellowFrom:100, yellowTo: 140,
 minorTicks: 5
};

var optionsdoam = {
 min: 0, max: 100,
 width: 400, height: 120,
 redFrom: 80, redTo: 100,
 yellowFrom:70, yellowTo:80,
 minorTicks: 5
};

var chart = new google.visualization.Gauge(document.getElementById('chart_nhietdo'));		
var chart1 = new google.visualization.Gauge(document.getElementById('chart_doam'));
   
chart.draw(data, optionsnhietdo);

chart1.draw(data1, optionsdoam);


setInterval(function() {
 
 var datanhietdo = nhietDo.innerText;
 data.setValue(0, 1, datanhietdo);
 chart.draw(data, optionsnhietdo);
}, 300);

setInterval(function() {
var datadoam = doAm.innerText;
 data1.setValue(0, 1, datadoam);
 chart1.draw(data1, optionsdoam);
}, 300);	
}

function Start()
{
LoadForm();
myFunction();
UpdateData();
}


// function GetButtonData(data)
// {
// switch (data)
// {
   
//    case 1:
      
//        console.log("OnClick Button TB 1");	
       
//        var trangthaitb1 = document.getElementById("den").value;
//        console.log(trangthaitb1);	
       
//        if(trangthaitb1 == "ON")			
//        {
//            var tx = "A0B";
           
//            var xhttp = new XMLHttpRequest(); 
//            xhttp.open("GET","/Button?Button="+tx,true);        
//            xhttp.send();
//        }
//        else if(trangthaitb1 == "OFF")
//        {
//            var tx = "A1B";
           
//            var xhttp = new XMLHttpRequest(); 
//            xhttp.open("GET","/Button?Button="+tx,true);        
//            xhttp.send();
//        }
       

       
//        break;
//    case 2:
//        console.log("OnClick Button TB 1");	
       
//        var trangthaitb2 = document.getElementById("quat").value;
//        console.log(trangthaitb2);
       

//        if(trangthaitb2 == "ON")			
//        {
//            var tx = "C0D";
//            var xhttp = new XMLHttpRequest(); 
//            xhttp.open("GET","/Button?Button="+tx,true);        
//            xhttp.send();
//        }
//        else if(trangthaitb2 == "OFF")
//        {
//            var tx = "C1D";
//            var xhttp = new XMLHttpRequest(); 
//            xhttp.open("GET","/Button?Button="+tx,true);        
//            xhttp.send();
//        }
       
       
               
//        break;
//        }
//    }

function myFunction() {
 var x = document.getElementById("pass");
 if (x.type === "password") {
   x.type = "text";
 } else {
   x.type = "password";
 }
}
