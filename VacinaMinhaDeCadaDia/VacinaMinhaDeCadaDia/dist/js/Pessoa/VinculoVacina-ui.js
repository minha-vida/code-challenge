(function ($, window, container) {
    "use strict";

    var $container = $(container),
        $ui = null;

    var ui = {
        eventos: {
            obterVacinasPessoa: "obterVacinasPessoa",
            obterVacinas: "obterVacinas",
            excluirVacinaPessoa: "excluirVacinaPessoa",
            vincularVacina: "vincularVacina"
        },
        init: function () {
            $ui = $(this);

            $ui.trigger(ui.eventos.obterVacinasPessoa, settings.idPessoa);
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
                    $ui.trigger(ui.eventos.excluirVacinaPessoa, $(this).data("id"));
                })
                .on("click", "#toggle-busca", function (e) {
                    ui.limparCampos();
                })
                .on("click", "#Adicionar", function (e) {
                    var dataDeAplicacao = $("#DataDeAplicacao").val();

                    var data = {
                        dataDeAplicacao: dataDeAplicacao,
                        idPessoa: settings.idPessoa,
                        idVacina: $(this).data("id")
                    };

                    $ui.trigger(ui.eventos.vincularVacina, data);
                })
                .on("blur", "#DataDeAplicacao", function (e) {
                    var dataAplicacao = $("#DataDeAplicacao").val();

                    var isValid = Inputmask.isValid(dataAplicacao, { alias: "datetime", inputFormat: "dd/mm/yyyy" });

                    if (dataAplicacao !== "" && isValid)
                    {
                        $(".acoes-Adicionar").removeAttr("disabled");
                    }
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
        carregarListagemVinculos: function (dados) {
            if (dados.length > 0) {
                $("#listagem-vacinas-antigas tbody").html(
                    $("#listagem-template-vacinas-antigas").render(dados)
                );
            } else {
                $("#listagem-vacinas-antigas tbody").html(
                    $("#sem-resultado-template").render()
                );
            }
        },
        carregarListagemVacinas: function (dados) {
            if (dados.length > 0) {
                $("#listagem-vacinas-novas tbody").html(
                    $("#listagem-template-vacinas-novas").render(dados)
                );
            } else {
                $("#listagem-vacinas-novas tbody").html(
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