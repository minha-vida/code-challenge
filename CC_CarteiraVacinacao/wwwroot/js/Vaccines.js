function SetVaccineObject(name, AppliedDate) {
    var jObject = { VaccineName: name, AppliedAt: AppliedDate };
    return jObject;
}

function JohnnyGoAjaxStyle(jObject, urlToUse, fnSuccess, fnError) {
    $.ajax({
        type: "POST",
        url: urlToUse,
        data: JSON.stringify(jObject),
        contentType: "application/json",
        success: fnSuccess(data),
        error: fnError()
    });
}

function GetVaccines(urlToUse, fnSuccess, fnError) {

}