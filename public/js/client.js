var V = {
    toggleMenu: function() {
        var div = document.getElementById("employeeDiv");
        div.style.display = div.style.display == "none" ? "block" : "none";
        this.clearMenu();
    },
    clearMenu: function() {
        document.getElementById("idValueTxt").value = "";
        document.getElementById("nameValueTxt").value = "";
        document.getElementById("surnameValueTxt").value = "";
        document.getElementById("levelValueTxt").value = "";
        document.getElementById("salaryValueTxt").value = "";
    }
};
