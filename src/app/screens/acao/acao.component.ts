import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IAcao } from './model/IAcao';

import { AcaoService } from './service/acao.service';

@Component({
  selector: 'app-acao',
  templateUrl: './acao.component.html',
  styleUrls: ['./acao.component.css']
})
export class AcaoComponent implements OnInit {

  @ViewChild('modalConfirmacao', { static: true }) modalConfirmacao: NgbModal;

  @ViewChild('modalEdicao', { static: true }) modalEdicao: NgbModal;

  @ViewChild('modalCadastro', { static: true }) modalCadastro: NgbModal;

  acoes: IAcao[];

  acao: IAcao;

  editMode: boolean;

  inputSwitch: boolean;

  constructor(private acaoService: AcaoService, private ngbModal: NgbModal, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchAcoes();
  }

  async fetchAcoes(): Promise<void> {
    await this.acaoService.index().toPromise().then(acoes => {
        this.acoes = acoes;
      }
    );
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

}
