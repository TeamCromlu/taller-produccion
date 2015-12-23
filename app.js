// base de datos acceso admin
var config = require('./config');
var data_admin = {
  user : config.admin.user,
  pass : config.admin.pass
}

// Archivo principal del Backend, configuración del servidor
// y otras opciones
var express = require('express'); // Express: Framework HTTP para Node.js
var routes = require('./routes'); // Dónde tenemos la configuración de las rutas
var path = require('path');
var parsero = require('body-parser');
var mongoose = require('mongoose'); // Mongoose: Libreria para conectar con MongoDB
var User = require('./models/user').User;
var Msg = require('./models/messages').Msg;
var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios


// Importamos el modelo usuario y la configuración de passport
require('./models/user');
require('./models/messages');


var llamada = require('./routes/admin');

// Conexión a la base de datos de MongoDB que tenemos en 
mongoose.connect(config.mongodb.data_connect, function(err, res) {
  if(err) throw err;
  console.log('Conectado con éxito a la BD');
});


// Iniciamos la aplicación Express
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Configuración (Puerto de escucha, sistema de plantillas, directorio de vistas,...)
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));

// Middlewares de Express que nos permiten enrutar y poder
// realizar peticiones HTTP (GET, POST, PUT, DELETE)
app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());

// Ruta de los archivos estáticos (HTML estáticos, JS, CSS,...)
app.use(express.static(path.join(__dirname, 'public')));
// Indicamos que use sesiones, para almacenar el objeto usuario
// y que lo recuerde aunque abandonemos la página
app.use(express.session({ secret: 'lollllo' }));

// Configuración de Passport. Lo inicializamos
// y le indicamos que Passport maneje la Sesión
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// Si estoy en local, le indicamos que maneje los errores
// y nos muestre un log más detallado
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/* Rutas de la aplicación */
// Cuando estemos en http://localhost:puerto/ (la raiz) se ejecuta el metodo index
// del modulo 'routes'
app.get('/cursos', routes.index);

app.get('/login', function (req, res){
  function login(){
  var passport = require('passport');
  var login_now = require('./passport');
  login_now(passport);
  }
  res.render("login");
  login();
});

app.get('/login-again', function (req, res){
  function login_again(){
  var passport = require('passport');
  var login_now = require('./passport');
  login_now(passport);
  }
  res.render("login-again");
  login_again();
});

app.get('/politicas-seguridad', function (req, res){
  res.render("politicas-seguridad");
});

app.get('/register_new_user_token5985555213BMDXM', function (req, res){

  res.render('register_serial');
});

app.post('/register_new_user_token5985555213BMDX', function (req, res){
  // http://localhost:5000/register_new_user_token5985555213BMDX?usuario=joel&serial=45bMFFGS44FDZ12

  function registro(){
    this.llama = function(){
      var passport_register = require('passport');
      var register = require('./passport-register.js');
      register(passport_register);
    }
    // return llama
  }
    // registro();
    var holaa = new registro();
    holaa.llama();

    res.render("register", { 
    usuario : req.body.usuario
    // serial  : req.query.serial
    });

    // var login = require('./passport');
    // login(passport);

});

app.get('/ingresar-admin', function (req, res){
  res.render('login-admin');
});

app.post('/admin/panel', function  (req, res){
    var admin = {
      usuario : req.body.usuario,
      clave   : req.body.clave
    }

    if(admin.usuario == data_admin.user && admin.clave  == data_admin.pass){

      // res.render('panel',{master: admin.usuario} );
      // console.log('El usuario se logeo correctamente, usuario: ' + admin.usuario  + ' clave: ' + admin  .clave  );

      // app.post('/admin/usuarios/', function (req, res) {
          User.find(function (err, users) {
          // res.locals.users = users;
          if(err) res.send(500, err.message);

          console.log('GET/users')
            // res.status(200).jsonp(users);
          return res.render('users', {master : admin.usuario, users : users});
        });
      // });
 
        // Delete usuer
        app.post('/admin/usuarios/borrar/:id', function (req, res){
          User.findById(req.params.id, function (err, users) {
                  users.remove(function(err) {
                      if(err) return res.status(500).send(err.message);
                      // res.status(200).send();
                          User.find(function (err, users) {
                          // res.locals.users = users;
                          if(err) res.send(500, err.message);

                          return res.render('users', {master : admin.usuario, users : users});
                        });
                  })
              });
        });

    }else{
      res.send('¿Khé mamá...?   Acceso no permitido, >:(')
    }
});

app.get('/cursos/frontend', function (req, res){
	res.render("./frontend/index", {
    title: 'Taller de Frontend',
    user: req.user
	});
}); 

// Render clases de Frontend
app.get('/cursos/frontend/clase1', function (req, res){
  res.render("./frontend/clase1/index", {
    title: 'Taller de Frontend',
    user: req.user
  });
});
app.get('/cursos/frontend/clase2', function (req, res){
  res.render("./frontend/clase2/index", {
    title: 'Taller de Frontend',
    user: req.user
  });
});
app.get('/cursos/frontend/clase3', function (req, res){
  res.render("./frontend/clase3/index", {
    title: 'Taller de Frontend',
    user: req.user
  });
});
app.get('/cursos/frontend/clase4', function (req, res){
  res.render("./frontend/clase4/index", {
    title: 'Taller de Frontend',
    user: req.user
  });
});
app.get('/cursos/frontend/clase5', function (req, res){
  res.render("./frontend/clase5/index", {
    title: 'Taller de Frontend',
    user: req.user
  });
});
app.get('/cursos/frontend/clase6', function (req, res){
  res.render("./frontend/clase6/index", {
    title: 'Taller de Frontend',
    user: req.user
  });
});



app.get('/cursos/backend', function (req, res){
	res.render("./backend/index", {
	title: 'Taller de Backend',
	user: req.user
	});
});

// Render clases de Backend
app.get('/cursos/backend/clase1', function (req, res){
  res.render("./backend/clase1/index", {
    title: 'Taller de Backend',
    user: req.user
  });
});
app.get('/cursos/backend/clase2', function (req, res){
  res.render("./backend/clase2/index", {
    title: 'Taller de Backend',
    user: req.user
  });
});
app.get('/cursos/backend/clase3', function (req, res){
  res.render("./backend/clase3/index", {
    title: 'Taller de Backend',
    user: req.user
  });
});
app.get('/cursos/backend/clase4', function (req, res){
  res.render("./backend/clase4/index", {
    title: 'Taller de Backend',
    user: req.user
  });
});
app.get('/cursos/backend/clase5', function (req, res){
  res.render("./backend/clase5/index", {
    title: 'Taller de Backend',
    user: req.user
  });
});
app.get('/cursos/backend/clase6', function (req, res){
  res.render("./backend/clase6/index", {
    title: 'Taller de Backend',
    user: req.user
  });
});


app.get('/cursos/git', function (req, res){
	res.render("./git/index", {
    title: 'Taller de Git',
    user: req.user
	});
});
// cursos git
app.get('/cursos/git/clase1', function (req, res){
  res.render("./git/clase1/index", {
    title: 'Taller de Git',
    user: req.user
  });
});
app.get('/cursos/git/clase2', function (req, res){
  res.render("./git/clase2/index", {
    title: 'Taller de Git',
    user: req.user
  });
});
app.get('/cursos/git/clase3', function (req, res){
  res.render("./git/clase3/index", {
    title: 'Taller de Git',
    user: req.user
  });
});
app.get('/cursos/git/clase4', function (req, res){
  res.render("./git/clase4/index", {
    title: 'Taller de Git',
    user: req.user
  });
});
app.get('/cursos/git/clase5', function (req, res){
  res.render("./git/clase5/index", {
    title: 'Taller de Git',
    user: req.user
  });
});
app.get('/cursos/git/clase6', function (req, res){
  res.render("./git/clase6/index", {
    title: 'Taller de Git',
    user: req.user
  });
});


app.get('/live', function (req, res){

              Msg.find(function (err, messages) {

                        if(err) res.send(500, err.message);
                        var data = [];

                                var limite = messages.length -1;
                                for(var i = limite; i >= 0 ; i--){
                                  var parse_msg = messages[i].msg;
                                  data[limite - i] = JSON.parse(parse_msg);
                              }

                        console.log('GET/messages')

                        return res.render("./live/index", {
                            title: 'En vivo',
                            user: req.user,
                            messages : data
                        });
                });

});

app.get('/comprar-send-ok', function (req, res){
    res.render('send_ok-comprar');
});
/* Rutas de Passport */
// Ruta para desloguearse
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});
// Ruta para autenticarse con Twitter (enlace de login)
app.get('/auth/twitter', passport.authenticate('twitter'));
// Ruta para autenticarse con Facebook (enlace de login)
app.get('/auth/facebook', passport.authenticate('facebook'));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/cursos', failureRedirect: '/login-again'}
));
// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/cursos', failureRedirect: '/login-again'}
));

// Requisito para usar la DB y usar save
// var mongoose = require('mongoose');
var Msg = mongoose.model('Message');
io.on('connection', function (socket){
  socket.on('chat message', function (msg){
    // Evento save de messages
      Msg.find(function (err, messages) {
        if(err) res.send(500, err.message);
        // Volviendo a cadena el dato de mensaje recibido para la base de datos
          var send_msg = msg;
          // console.log(send_msg);
          var data = JSON.stringify(send_msg);
          // console.log(data);
          // creando el schema del mensaje
          var messages = new Msg({
           name        : "usuario",
           msg         :  data
          });
          //almacenandolo 
          messages.save(function(err) {
           if(err) throw err;
           // done(null, false);
          });
    });

    io.emit('chat message',  msg);
  });
});


 // Handle 404
  app.use(function(req, res) {
     res.render('error_404', 404);
  });
  
  // Handle 500
  app.use(function(error, req, res, next) {
     res.render('error_500', 500);
  });


// Inicio del servidor
http.listen(app.get('port'), function(){
  console.log('Aplicación Express escuchando en el puerto ' + app.get('port'));
});
