var socket = io();

$('form').submit("keypress", function (event){
    if(event.which=13){
       var avatar = document.getElementById("avatar").getAttribute("value") ;
       var usuario = document.getElementById("usuario").getAttribute("value") ;
       
       socket.emit('chat message', { mensaje: $('#m').val(), avat: avatar, user: usuario });
       $('#m').val('');
       return false;
    }
  });

  socket.on('chat message', function (msg){
    $('#messages').prepend('<li class="Chat__item"><div class="Chat__title"><figure class="Chat__avatarUser"><img src="' + msg.avat + '" alt="" width="35px"/></figure><h3 class="Chat__nameUser">' + msg.user + '</h3></div><div class="Chat__coment"><p class="Chat__text">' + msg.mensaje + '</p></div></li> ');
  });

