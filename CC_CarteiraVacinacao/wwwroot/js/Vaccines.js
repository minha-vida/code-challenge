function SetVaccineObject(name, AppliedDate) {
    var jObject = { VaccineName: name, AppliedAt: AppliedDate };
    return jObject;
}

function SetVaccineObjectEdit(nameOld, AppliedDateOld, name, AppliedDate) {
    var jObject = {
        VaccineOldName: nameOld, AppliedAtOld: AppliedDateOld,
        VaccineName: name, AppliedAt: AppliedDate
    };
    return jObject;
}

function AdjustDateVaccine(dateInFormat) {
    var dateSplit = dateInFormat.substring(0, dateInFormat.indexOf("T")).split('-');

    dateSplit = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
    return dateSplit;
}

function CreateItemOnScreen(VaccObj) {
    var item = "<button type='button' class='list-group-item' name='" + VaccObj.vaccineName + "'><span class='badge'><a href='#' class='fas fa-edit inverseTextColor' \
        data-vacname='"+ VaccObj.vaccineName.trim() + "' data-vacdate='" + AdjustDateVaccine(VaccObj.appliedAt) + "' data-toggle='modal' data-target='#ModalVacina'></a>\
<a href='#' onclick='RemoveVaccine(this);' class='fas fa-eraser inverseTextColor' data-vacname='"+ VaccObj.vaccineName + "' data-vacdate='" + AdjustDateVaccine(VaccObj.appliedAt) + "'></a></span> "
        + VaccObj.vaccineName + " - Aplicada em: "
        + AdjustDateVaccine(VaccObj.appliedAt) + "</button>";

    $("#listVaccs").append(item);
}

function RemoveItemOnScreen(elementName) {
    var element = document.getElementsByName(elementName);
    $(element).remove();
}

function LoadVaccines(data) {
    var dataVacc = data;

    for (var vaccine in data) {
        if (data.hasOwnProperty(vaccine))
            CreateItemOnScreen(data[vaccine]);
    }
}

function AddSuccess(data) {
    var dataVacc = data;
    CreateItemOnScreen(data);

    $("#ModalVacina").modal("hide");
}

function UpdateVaccine(vaccObj) {
    if (typeof vaccObj !== 'undefined') {
        var elementToChange = document.getElementById("Vacc_Old_Name").value;
        RemoveItemOnScreen(elementToChange);
        CreateItemOnScreen(vaccObj);

        $("#ModalVacina").modal("hide");
    }
}

function RemoveElement(vaccObj) {
    if (typeof vaccObj !== 'undefined') {
        var elementToChange = vaccObj.vaccineName;
        RemoveItemOnScreen(elementToChange);
    }
}