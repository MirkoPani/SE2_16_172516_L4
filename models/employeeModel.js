var employeeModel = {
    //Lookup table utilizzata per capire se un id e' usato o meno. Viene usata da insertEmployee
    employeesLookup: {},
    //array degli employee
    employees: [
        new Employee(1, "Mirko", "Pani", 10, 1000),
        new Employee(2, "Riccardo", "Grigoletto", 8, 500)
    ],
    //Funzione che aggiunge un employee o ne aggiorna uno.
    //Input: id per impiegato normale, id=-1 se id non inserito dall'utente o non valido
    //Returns: l'id dell'impiegato inserito, oppure -1 se ha aggiornato un impiegato
    insertEmployee: function(id, name, surname, level, salary) {

        //Se l'id è stato inserito ed è valido
        if (id != -1) {
            for (i = 0; i < this.employees.length; i++) {
                //Se esiste un impiegato con quell'id lo modifichiamo
                if (this.employees[i].ID == id) {
                    this.employees[i].Name = name;
                    this.employees[i].Surname = surname;
                    this.employees[i].Level = level;
                    this.employees[i].Salary = salary;
                    return -1;
                }
            }
            //else lo aggiungiamo
            this.employees.push(new Employee(id, name, surname, level, salary));
            return id;

        } else {
            //generiamo la lookup table
            this.employeesLookup={};
            for (var i = 0; i<this.employees.length; i++) {
                this.employeesLookup[this.employees[i].ID] = this.employees[i];
            }

            var genid = 1;
            //finche non troviamo una posizione libera
            while(typeof this.employeesLookup[genid] !== 'undefined') {
                genid++;
            }
            //aggiugiamo l'employee con l'id generato.
            this.employees.push(new Employee(genid, name, surname, level, salary));
            return genid;
        }
    },
    //Ritorna un employee fittizio
    returnEmptyEmployee: function() {
        return new Employee("", "", "", "", "");
    },
    //Ritorna un employee con quell'id
    returnEmployee: function(id) {
        for (i = 0; i < this.employees.length; i++) {
            //Se esiste un impiegato con quell'id lo restituiamo
            if (this.employees[i].ID == id)
                return this.employees[i];
            }
        //non è stato trovato nessuno: errore.
        return this.returnEmptyEmployee();
    },
    //Elimina un employee. Ritorna 1 se l'operazione ha avuto successo, -1 altrimenti.
    deleteEmployee: function(id) {
        for (i = 0; i < this.employees.length; i++) {
            //Se esiste un impiegato con quell'id lo cancelliamo
            if (this.employees[i].ID == id) {
                this.employees.splice(i, 1);
                return 1
            }
        }
        //non è stato trovato nessuno, non abbiamo cancellato.
        return -1;
    }
};

function Employee(id, name, surname, level, salary) {
    this.ID = id;
    this.Name = name;
    this.Surname = surname;
    this.Level = level;
    this.Salary = salary;
};

module.exports = employeeModel;
