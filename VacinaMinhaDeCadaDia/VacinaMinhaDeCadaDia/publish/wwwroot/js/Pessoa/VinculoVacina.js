(function ($, window, ui) {
    "use strict";

    var $ui = $(ui);
        
    $ui
        .bind(ui.eventos.obterPessoas, function () {
            //var filtros = ui.recuperarFiltros();

            $.ajax({
                dataType: "JSON",
                url: "/Pessoa/ObterPessoas",
                type: "GET",
                //data: { filtros: JSON.stringify(filtros) },
                success: function (dados) {
                    ui.carregarListagem(dados);
                }
            });
        })
        .bind(ui.eventos.ExcluirPessoa, function (e, data) {
            $.ajax({
                url: "/Pessoa/ExcluirPessoa",
                data: {id : data},
                success: function () {
                    $ui.trigger(ui.eventos.obterPessoas);
                }
            });
        });


    $(function () {
        ui.init();
    });

})(jQuery, window, window.listagemVinculoVacina.ui);