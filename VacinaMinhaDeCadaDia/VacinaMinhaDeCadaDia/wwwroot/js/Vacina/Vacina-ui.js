(function ($, window, container) {
    "use strict";

    var $container = $(container),
        $ui = null;

    var ui = {
        eventos: {
            obterVacinas: "obterVacinas",
            ExcluirVacina: "excluirVacina"
        },
        init: function () {
            $ui = $(this);

            $ui.trigger(ui.eventos.obterVacinas);
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
                    $ui.trigger(ui.eventos.ExcluirVacina, $(this).data("id"));
                })
                .on("click", "#toggle-busca", function (e) {
                    ui.limparCampos();
                })
                .on("click", "#buscar-grupos", function (e) {
                    $ui.trigger(ui.eventos.obterVacinas);

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
                $("#listagem-Vacinas tbody").html(
                    $("#listagem-template").render(dados)
                );
            } else {
                $("#listagem-Vacinas tbody").html(
                    $("#sem-resultado-template").render()
                );
            }
        },
        limparCampos: function () {
            $("#palavra-chave").val("");
        }
    };

    window.listagemVacina = {};
    window.listagemVacina.ui = ui;

})(jQuery, window, window.document);