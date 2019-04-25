(function ($, window, ui) {
    "use strict";

    var $ui = $(ui);
        
    $ui
        .bind(ui.eventos.obterPessoas, function () {
            $.ajax({
                dataType: "JSON",
                url: "/Pessoa/ObterPessoas",
                type: "GET",
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

})(jQuery, window, window.listagemPessoa.ui);