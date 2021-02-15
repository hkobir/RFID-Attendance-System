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

// hum burger menu
$('.header__burger').click(function(event) {
  $('.header__burger, .header__menu').toggleClass('active')
})


//build up data table
var data =  `<table class="table table-bordered" id = "data_table">
<thead>
<tr>
<th scope="col">Date</th>
<th scope="col">E_ID</th>
<th scope="col">Name</th>
<th scope="col">Dept.</th>
<th scope="col">Entered time</th>
<th scope="col">Status</th>
</tr>
</thead>
<tbody>
<tr>`;


// show records data table
firebase.database().ref().child("employees").child("sheets").on("value", function(snapshot){
  if(snapshot.exists()){
        //record exists
        snapshot.forEach(function (childSnapshot) {
          var sheet = childSnapshot.val();
          var nextData = `<td> ${sheet.date}</td>
          <td>${sheet.id} </td>
          <td>${sheet.name} </td>
          <td>${sheet.department} </td>
          <td>${sheet.enterd} </td>`;
if(sheet.status == "Late"){
 nextData += `<td style = "color:red;">${sheet.status} </td></tr>`;
          data += nextData;
}
else{
   nextData += `<td style = "color:green;">${sheet.status} </td></tr>`;
          data += nextData;
}
          

        });

        data += `</tbody></table>`;
        console.log(data);
        jQuery('#records_table').html(data);
        $('#data_table').DataTable({
          "order": [
          [ 0, 'desc' ]
          ]
        });

        $("#progress").hide();
      }
      else{
        $("#progress").hide();
        alert("Empty records");
      }
    });


});

