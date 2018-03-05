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
                .on("click", '#Excluir', function (e) {
                    var id = $(this).attr('data-id');

                    $("#modal-excluir").modal('show');
                    
                    $("#modal-btn-sim").attr('data-id', id);

                    e.stopPropagation();
                    e.preventDefault();
                })
                .on("click", "#modal-btn-sim", function (e) {
                    var id = $(this).attr('data-id');

                    $ui.trigger(ui.eventos.excluirVacinaPessoa, id);

                    $("#modal-btn-sim").removeAttr('data-id');

                    $("#modal-excluir").modal('hide');

                    e.stopPropagation();
                    e.preventDefault();
                })
                .on("click", "#modal-btn-nao", function () {
                    $("#modal-excluir").modal('hide');
                })
                .on("click", "#toggle-busca", function (e) {
                    ui.limparCampos();
                })
                .on("click", "#Adicionar", function (e) {
                    var dataDeAplicacao = $("#DataDeAplicacao").val();

                    var data = {
                        dataDeAplicacao: dataDeAplicacao,
                        idPessoa: settings.idPessoa,
                        idVacina: $(this).attr('data-id')
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
                });
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
        }
    };

    window.listagemVinculoVacina = {};
    window.listagemVinculoVacina.ui = ui;

})(jQuery, window, window.document);