function Redirect(){
    var name = $('#usrname').val().trim();
    if (name.length > 0) {
        window.location = "index.html";
        localStorage.setItem("username", name);
        return false;
   }
 else{
    
    alert('Please enter your name..');
       event.preventDefault();
        
 }
}

$('input').on('focusin', function() {
    $(this).parent().find('label').addClass('active');
});
  
$('input').on('focusout', function() {
    if (!this.value) {
      $(this).parent().find('label').removeClass('active');
    }
});