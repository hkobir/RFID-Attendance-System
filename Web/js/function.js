// alert("working");
var firebaseConfig = {
  apiKey: "AIzaSyBm4lPbwRWuUa-IDgkQZkibv0GrA0Lb9jc",
  authDomain: "rfid-based-attendence-system.firebaseapp.com",
  projectId: "rfid-based-attendence-system",
  storageBucket: "rfid-based-attendence-system.appspot.com",
  messagingSenderId: "1017773700693",
  appId: "1:1017773700693:web:0e47d234bd5e6653b486dc",
  measurementId: "G-02VGVQPDRJ"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




  $(document).ready(function(){
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() +
    "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
var officeTime=new Date(formatted_date+" 10:00:00"); //yyyy-mm-dd hh:mm:ss
var currentdate=new Date(); //fetch the current date value
console.log("preveious time value: "+officeTime.getTime());
console.log("current time value: "+currentdate.getTime());

if(officeTime.getTime()<currentdate.getTime())
{
  console.log("True");
  $("#status").text("You are late!");
  $('#status').css('color','red');
}
else if(officeTime.getTime()>=currentdate.getTime())
{
  $("#status").text("You are in time!");
  $('#status').css('color','green');
}
else
{
  $("#status").text("equal");
}

});
