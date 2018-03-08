//Script com diversas funções para cuidar de umas validações básicas

function CkIfNOU(beautifulVar) {
    var typeResult = typeof beautifulVar;

    if (typeResult === 'undefined')
        return true;
    else if (beautifulVar === null) {
        return true;
    }
    return false;
}

function ValidateDate(dearDate, minDate) {
    //usando o date do javascript é meio zuado, mas funcional (to a point thou...) GM
    //Formato esperado: dd/MM/yyyy
    var dataOficial = dearDate.split('/');
    var atualDate = new Date();
    var data = new Date(dataOficial[1] + '/' + dataOficial[0] + '/' + dataOficial[2]);
    var day = data.getDate();
    if (isNaN(data.getMilliseconds()) || day !== Number(dataOficial[0]))
        return false;
    else if (data.getMilliseconds() > atualDate.getMilliseconds)
        return false;

    if (typeof minDate !== 'undefined' && minDate !== "") {
        return data < new Date(minDate);
    }

    return true;
}

function AdjustDate(date) {
    if (CkIfNOU(date))
        return false;

    if (date.key.search(/Backspace|Del|Tab/g) === -1) {
        if ((date.target.value.length === 2 || date.target.value.length === 5) && date.key.search('/') === -1)
            date.target.value += '/';

        if (date.key.search(/\D/g) >= 0 && date.key.search("/") === -1)
            return false;
    }
}

function CheckEq(dataInput1, dataInput2) {
    if (!CkIfNOU(dataInput1) === !CkIfNOU(dataInput2))
        return dataInput1 === dataInput2;
    return false;
}

function ManageErrors(flag, elementToChange, errorClass, errorText) {
    if (!flag) {
        $(elementToChange).addClass("has-error");
        $(elementToChange).find(errorClass).text(errorText);
    }
    else {
        $(elementToChange).removeClass("has-error");
        $(elementToChange).find(errorClass).text("");
    }
}

function Failure() {
    $("#GlobalAlert").show("fast");
    $("#GlobalAlert").html("Erro Durante Requisição, tente novamente!");

    window.setTimeout(function () { $("#GlobalAlert").hide("fast"); $("#GlobalAlert").html(""); }, 10000);
}