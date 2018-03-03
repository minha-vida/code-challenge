(function ($, window, container) {
    "use strict";

    var $container = $(container),
        $ui = null;

    var ui = {
        eventos: {
            obterPessoas: "obterVacinasPessoa",
            ExcluirPessoa: "excluirVinculo"
        },
        init: function () {
            $ui = $(this);

            $ui.trigger(ui.eventos.obterVacinasPessoa, settings.idPessoa);
            ui.addEvents();
        },
        addEvents: function () {
            $container
                .on("click", "#limpar-filtros", function (e) {
                    ui.limparCampos();

                    e.preventDefault();
                    e.stopPropagation();
                })
                .on("click", '#Excluir', function () {
                    $ui.trigger(ui.eventos.ExcluirPessoa, $(this).data("id"));
                })
                .on("click", "#toggle-busca", function (e) {
                    ui.limparCampos();
                })
                .on("click", "#buscar-grupos", function (e) {
                    $ui.trigger(ui.eventos.obterPessoas);

                    e.preventDefault();
                    e.stopPropagation();
                });
        },
        recuperarFiltros: function () {
            var filtros = {
                PalavraChave: $("#palavra-chave").val()
            };

            return filtros;
        },
        carregarListagem: function (dados) {
            if (dados.length > 0) {
                $("#listagem-pessoas tbody").html(
                    $("#listagem-template").render(dados)
                );
            } else {
                $("#listagem-pessoas tbody").html(
                    $("#sem-resultado-template").render()
                );
            }
        },
        limparCampos: function () {
            $("#palavra-chave").val("");
        }
    };

    window.listagemVinculoVacina = {};
    window.listagemVinculoVacina.ui = ui;

})(jQuery, window, window.document);