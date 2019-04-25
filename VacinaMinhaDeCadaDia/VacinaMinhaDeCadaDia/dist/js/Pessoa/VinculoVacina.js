(function ($, window, ui) {
    "use strict";

    var $ui = $(ui);
        
    $ui
        .bind(ui.eventos.obterVacinasPessoa, function (e,data) {
            //var filtros = ui.recuperarFiltros();

            $.ajax({
                dataType: "JSON",
                url: "/Pessoa/ObterVinculosVacina",
                type: "GET",
                data: { idPessoa: data},
                //data: { filtros: JSON.stringify(filtros) },
                success: function (dados) {
                    ui.carregarListagemVinculos(dados);
                }
            });
        })
        .bind(ui.eventos.obterVacinas, function () {
            //var filtros = ui.recuperarFiltros();

            $.ajax({
                dataType: "JSON",
                url: "/Vacina/ObterVacinas",
                type: "GET",
                //data: { filtros: JSON.stringify(filtros) },
                success: function (dados) {
                    ui.carregarListagemVacinas(dados);
                }
            });
        })
        .bind(ui.eventos.vincularVacina, function (e, data) {
            $.ajax({
                dataType: "JSON",
                url: "/Pessoa/VincularVacinas",
                type: "POST",
                data: { idPessoa: data.idPessoa, idVacina: data.idVacina, dataDeAplicacao: data.dataDeAplicacao },
                //data: { filtros: JSON.stringify(filtros) },
                success: function (dados) {
                    $ui.trigger(ui.eventos.obterVacinasPessoa, settings.idPessoa);
                }
            });
        })
        .bind(ui.eventos.excluirVacinaPessoa, function (e, data) {
            $.ajax({
                url: "/Pessoa/ExcluirVinculoVacina",
                data: {id : data},
                success: function () {
                    $ui.trigger(ui.eventos.obterVacinasPessoa, settings.idPessoa);
                }
            });
        });


    $(function () {
        ui.init();
    });

})(jQuery, window, window.listagemVinculoVacina.ui);