// grab the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var model = require('./models/employeeModel.js');
//Express configuration
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
var port = process.env.PORT || 8080;
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//Richiesta home iniziale
app.get('/', function(req, res) {
    res.render('index', {
        message: "",
        employee: {},
        style: "display:none"
    });

});

//Cercare utente
app.post('/search', function(req, res) {
    var userid = req.body.idSearchTxt;
    var message = "";
    var employeeTmp;

    if (userid == '' || isNaN(userid)) {
        employeeTmp = model.returnEmptyEmployee();
        message = "Id non valido."
    } else {
        employeeTmp = model.returnEmployee(userid);
        message = employeeTmp.Name != ""
            ? "Ricerca effettuata."
            : "Ricerca effettuata ma nessun risultato trovato.";
    }
    res.render('index', {
        message: message,
        employee: employeeTmp,
        style: "display:block"
    });
});

//Eliminare utente
app.post('/delete', function(req, res) {
    var userid = req.body.idSearchTxt;
    var message = "";

    if (userid == '' || isNaN(userid)) {
        message = "Id non valido."
    } else {
        if (model.deleteEmployee(userid) === 1)
            message = "Employee eliminato";
        else {
            message = "Employee non trovato.";
        }
    }
    res.render('index', {
        message: message,
        employee: {},
        style: "display:none"
    });
});

//Inserire o aggiornare utente
app.post('/insert', function(req, res) {
    var userId = req.body.idValueTxt;
    var userName = req.body.nameValueTxt;
    var userSurname = req.body.surnameValueTxt;
    var userLevel = req.body.levelValueTxt;
    var userSalary = req.body.salaryValueTxt;
    var result;
    var message;

    //Proviamo ad aggionare/inserire employee. I campi non possono essere nulli. quindi..
    if (userName == '' || userSurname == '' || userLevel == '' || userSalary == '') {
        message =//I campi non sono nulli, controlliamo id
        "Errore. Tutti i campi sono richiesti.";
    } else {
        //Se id inserito non e' valido ne generiamo uno
        if (userId == '' || isNaN(userId)) {
            result = model.insertEmployee(-1, userName, userSurname, userLevel, userSalary
            );
        } else {
          //altrimenti usiamo l'id suo
            result = model.insertEmployee(userId, userName, userSurname, userLevel, userSalary);
        }
        message = result === -1
            ? "Employee aggiornato. ID: " + userId
            : "Employee inserito con ID: " + result;
    }
    //render page
    res.render('index', {
        message: message,
        employee: {},
        style: "display:none"
    });
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
