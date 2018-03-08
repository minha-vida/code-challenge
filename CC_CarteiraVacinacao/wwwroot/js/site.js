function JohnnyGoAjaxStyle(jObject, urlToUse, fnSuccess, fnError) {
    $.ajax({
        type: "POST",
        url: urlToUse,
        data: jObject,
        success: function (data) { fnSuccess(data) },
        error: function () { fnError() }
    });
}