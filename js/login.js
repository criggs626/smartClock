$("#login").click(function(){
  var uname=$("#username").val();
  var pass=$("#password").val();
  $.post("php/login.php",{username:uname,password:pass},function(data){
    if(data==true){
      window.location.href="clock.html";
    }
    else{
      alert("Invalid login");
    }
  })
});
