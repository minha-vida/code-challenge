(function ($, window, ui) {
    "use strict";

    var $ui = $(ui);

    $ui
        .bind(ui.eventos.obterVacinas, function () {
            //var filtros = ui.recuperarFiltros();

            $.ajax({
                dataType: "JSON",
                url: "/Vacina/ObterVacinas",
                type: "GET",
                //data: { filtros: JSON.stringify(filtros) },
                success: function (dados) {
                    ui.carregarListagem(dados);
                }
            });
        })
        .bind(ui.eventos.ExcluirVacina, function (e, data) {
            $.ajax({
                url: "/Vacina/ExcluirVacina",
                data: {id : data},
                success: function () {
                    $ui.trigger(ui.eventos.obterVacinas);
                }
            });
        });


    $(function () {
        ui.init();
    });

})(jQuery, window, window.listagemVacina.ui);