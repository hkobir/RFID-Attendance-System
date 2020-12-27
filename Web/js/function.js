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



  var pId;
  $(document).ready(function(){
    var database = firebase.database();
    var pTag;
    database.ref().child('RFID').on("value", function(snap){
      pTag = snap.val();
      pId = pTag;
      $("#patient_id").text(pTag);
      console.log("Utag: "+pTag);

    checkValid(pTag);  //check either tag is valid



  });


// hum burger menu
$('.header__burger').click(function(event) {
  $('.header__burger, .header__menu').toggleClass('active')
})




function checkValid(pTag){
  firebase.database().ref().child("employees").child(pTag).once('value').then(function(snapshot){
    if(snapshot.exists()){
        //patient exist with this number
        showPatient(pTag);
      }
      else{
        $('#status_image').attr('src', 'images/unverified.png');

        //firebase.database().ref().child("verified").set("no");  //set overall verification status

        $('#message').text("Patient unverified!");
        $('#message').css('color','red');
        $("#progress").hide();
        $("#status_label").hide();
        $('#status').hide();

    //set profile value to null
    $('#picture').attr('src', "");
    $('#patient_name').text("");
    $('#patient_address').text("");
    $('#patient_gender').text("");
    $('#patient_age').text("");
    $('#patient_blood').text("");
  }
});
}


function showPatient(pTag){
  firebase.database().ref().child("employees").child(pTag).child("profile").once('value').then(function(snapshot){
    if(snapshot.exists()){

      var image = snapshot.child("image").val();
      var name = snapshot.child("name").val();
      var address = snapshot.child("email").val();
      var gender = snapshot.child("gender").val();
      var dept = snapshot.child("dept").val();
      var designation = snapshot.child("designation").val();

      console.log("image: "+image);

      $('#picture').attr('src', image);
      $('#patient_name').text(name);
      $('#patient_address').text(address);
      $('#patient_gender').text(gender);
      $('#patient_age').text(dept);
      $('#patient_blood').text(designation);


        //show status
        $('#status_image').attr('src', 'images/verified.png');

        //firebase.database().ref().child("verified").set("yes");  //set overall verification status

        $('#message').text("Verified");
        $('#message').css('color','green');
        $("#progress").hide();
        $("#status_label").show();


//get status based on office time
var status = "";
let current_datetime = new Date();
let current_enteredTime = current_datetime.getHours()+":"+current_datetime.getMinutes();
let formatted_date = current_datetime.getFullYear() +
"-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
var officeTime = new Date(formatted_date+" 10:00:00"); //yyyy-mm-dd hh:mm:ss
var currentdate = new Date(); //fetch the current date value
console.log("preveious time value: "+officeTime.getTime());
console.log("current time value: "+currentdate.getTime());

if(officeTime.getTime()<currentdate.getTime())
{
  status = "Late";
  $('#status').css('color','red');
}
else if(officeTime.getTime() >= currentdate.getTime())
{
  status = "In time";
  $('#status').css('color','green');
}

//set employ status
console.log(status);
$('#status').text(status);


//insert attendence and status based on data
insertSheet(formatted_date, current_enteredTime, pTag, name, dept, status);




}

});
}


function insertSheet(formatted_date, current_enteredTime, pTag, name, dept, status){
  var isInsert = true;
  var sheetKey = firebase.database().ref().child("employees").child("sheets").push().key;

  firebase.database().ref().child("employees").child("sheets").once('value').then(function(snapshot){
    if(snapshot.exists()){
      snapshot.forEach(function (childSnapshot) {
        var sheet = childSnapshot.val();
        console.log("sheet data: "+sheet.date+" "+sheet.id);

        if(sheet.date == formatted_date && sheet.id == pTag){
          console.log("Already recorded with this ID");
          isInsert = false;
        }

      });

      if(isInsert){
   //insert new data
   firebase.database().ref("employees/sheets/"+sheetKey).set({
    date: formatted_date,
    enterd:current_enteredTime,
    id: pTag,
    name: name,
    department: dept,
    status: status
  });
 }
 else{
  //allready recorded
  $('#status').text("Already recorded!");
}
}
else{
  //insert new data
  console.log("inserted first time as empty record");

  firebase.database().ref("employees/sheets/"+sheetKey).set({
    date: formatted_date,
    enterd:current_enteredTime,
    id: pTag,
    name: name,
    department: dept,
    status: status
  });

}

});




}





});
