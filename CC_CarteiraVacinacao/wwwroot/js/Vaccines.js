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

function JohnnyGoAjaxStyle(jObject, urlToUse, fnSuccess, fnError) {
    $.ajax({
        type: "POST",
        url: urlToUse,
        data: jObject,
        success: function (data) { fnSuccess(data) },
        error: function () { fnError() }
    });
}

function AdjustDateVaccine(dateInFormat) {
    var dateSplit = dateInFormat.substring(0, dateInFormat.indexOf("T")).split('-');

    dateSplit = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
    return dateSplit;
}