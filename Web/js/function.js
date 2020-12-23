// alert("working");





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
