import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAcao } from './model/IAcao';
import { IExecucao } from './../execucao/model/IExecucao';

import { AcaoService } from './service/acao.service';
import { ExecucaoService } from '../execucao/service/execucao.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-acao',
  templateUrl: './acao.component.html',
  styleUrls: ['./acao.component.css']
})
export class AcaoComponent implements OnInit {

  @ViewChild('modalConfirmacao', { static: true }) modalConfirmacao: NgbModal;

  @ViewChild('modalEdicao', { static: true }) modalEdicao: NgbModal;

  @ViewChild('modalCadastro', { static: true }) modalCadastro: NgbModal;

  @ViewChild('modalDelecao', { static: true }) modalDelecao: NgbModal;

  @ViewChild('modalExecucao', { static: true }) modalExecucao: NgbModal;

  acoes: IAcao[];

  acao: IAcao;

  editMode: boolean;

  inputSwitch: boolean;

  loading: boolean;

  constructor(private acaoService: AcaoService, private ngbModal: NgbModal, private messageService: MessageService,
              private execucaoService: ExecucaoService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchAcoes();
  }

  async fetchAcoes(): Promise<void> {
    this.loading = true;
    setTimeout(() => {
      this.acaoService.index().toPromise().then(acoes => {
        this.acoes = acoes;
        this.loading = false;
      }
    );
    }, 3500);
  }

  onAtivoClicked(acao) {
    this.acao = acao;
    this.ngbModal.open(this.modalConfirmacao,  {ariaLabelledBy: 'modal-basic-title'})
      .result.then(result => {
          if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
            if (result === 'Save click') {
              acao.ativo = !acao.ativo;
              this.atualizarAcao(acao);
            }
          }
        }
      ).finally(() => {
          this.ngbModal.dismissAll();
        }
      );
  }

  onEdicaoClicked(acao) {
    this.acao = acao;
    this.editMode = true;
    this.ngbModal.open(this.modalEdicao,  {ariaLabelledBy: 'modal-basic-title'})
      .result.then(result => {
          if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
            if (result === 'Save click') {
              this.atualizarAcao(acao);
            }
          }
        }
      ).finally(() => {
          this.fetchAcoes();
          this.ngbModal.dismissAll();
        }
      );
  }

  onRemocaoClicked(acao) {
    this.acao = acao;
    this.editMode = true;
    this.ngbModal.open(this.modalDelecao,  {ariaLabelledBy: 'modal-basic-title'})
      .result.then(result => {
          if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
            if (result === 'Save click') {
              this.removerAcao(acao);
            }
          }
        }
      ).finally(() => {
          this.fetchAcoes();
          this.ngbModal.dismissAll();
        }
      );
  }

  onCadastroClicked() {
    this.acao = {
      nome: null,
      descricao: null,
      ativo: false,
    };

    this.ngbModal.open(this.modalCadastro,  {ariaLabelledBy: 'modal-basic-title'})
      .result.then(result => {
          if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
            if (result === 'Save click') {
              this.cadastrarAcao(this.acao);
            }
          }
        }
      ).finally(() => {
          this.fetchAcoes();
          this.ngbModal.dismissAll();
        }
      );
  }


  onExecutarAcaoClicked(acao) {
    this.acao = acao;
    this.editMode = true;
    this.ngbModal.open(this.modalExecucao,  {ariaLabelledBy: 'modal-basic-title'})
      .result.then(result => {
          if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
            if (result === 'Save click') {
              this.executarAcao(acao);
            }
          }
        }
      ).finally(() => {
          this.fetchAcoes();
          this.ngbModal.dismissAll();
        }
      );
  }

  async atualizarAcao(acao) {
    await this.acaoService.update(acao).toPromise().then(response => {
        const successMessage = {
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ação atualizada!'
        };
        this.messageService.add(successMessage);
      }
    ).catch(err => {
      const failedConstraintsMessage: any[] = [];

      if (err.error.campos !== undefined) {
        err.error.campos.forEach(campo => {
            const failedConstraintMessage = {
              severity: 'error',
              summary: 'Erro',
              detail: campo.mensagem,
              sticky: true,
            };
            failedConstraintsMessage.push(failedConstraintMessage);
          }
        );
      }

      const failMessage = {
        severity: 'error',
        summary: 'Erro',
        detail: err.error.detalhes,
        sticky: true,
      };

      failedConstraintsMessage.push(failMessage);
      this.messageService.addAll(failedConstraintsMessage);
      }
    );
  }

  async cadastrarAcao(acao) {
    await this.acaoService.store(acao).toPromise().then(response => {
        this.acoes.push(response);
        const successMessage = {
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ação cadastrada!'
        };
        this.messageService.add(successMessage);
      }
    ).catch(err => {

        const failedConstraintsMessage: any[] = [];

        if (err.error.campos !== undefined) {
          err.error.campos.forEach(campo => {
              const failedConstraintMessage = {
                severity: 'error',
                summary: 'Erro',
                detail: campo.mensagem,
                sticky: true,
              };
              failedConstraintsMessage.push(failedConstraintMessage);
            }
          );
        }

        const failMessage = {
          severity: 'error',
          summary: 'Erro',
          detail: err.error.detalhes,
          sticky: true,
        };

        failedConstraintsMessage.push(failMessage);
        this.messageService.addAll(failedConstraintsMessage);
      }
    );
  }

  async removerAcao(acao) {
    await this.acaoService.destroy(acao.id).toPromise().then(response => {
      const acaoIndex = this.acoes.findIndex(act => act.id === acao.id);
      this.acoes.splice(acaoIndex, 1);
      const successMessage = {
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Ação removida!'
      };
      this.messageService.add(successMessage);
    }
  ).catch(err => {

      const failedConstraintsMessage: any[] = [];

      if (err.error.campos !== undefined) {
        err.error.campos.forEach(campo => {
            const failedConstraintMessage = {
              severity: 'error',
              summary: 'Erro',
              detail: campo.mensagem,
              sticky: true,
            };
            failedConstraintsMessage.push(failedConstraintMessage);
          }
        );
      }

      const failMessage = {
        severity: 'error',
        summary: 'Erro',
        detail: err.error.detalhes,
        sticky: true,
      };

      failedConstraintsMessage.push(failMessage);
      this.messageService.addAll(failedConstraintsMessage);
    }
  );
  }

  async executarAcao(acao) {

    const execucao: IExecucao = {
      acao: {
        id: acao.id,
      },
    };

    await this.execucaoService.store(execucao).toPromise().then(response => {
        const successMessage = {
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ação executada!'
        };
        this.messageService.add(successMessage);
      }
    ).catch(err => {
      const failedConstraintsMessage: any[] = [];

      if (err.error.campos !== undefined) {
        err.error.campos.forEach(campo => {
            const failedConstraintMessage = {
              severity: 'error',
              summary: 'Erro',
              detail: campo.mensagem,
              sticky: true,
            };
            failedConstraintsMessage.push(failedConstraintMessage);
          }
        );
      }

      const failMessage = {
        severity: 'error',
        summary: 'Erro',
        detail: err.error.detalhes,
        sticky: true,
      };

      failedConstraintsMessage.push(failMessage);
      this.messageService.addAll(failedConstraintsMessage);
      }
    );
  }

}
