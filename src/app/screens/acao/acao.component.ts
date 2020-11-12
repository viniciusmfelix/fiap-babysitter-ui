import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { IAcao } from './model/IAcao';

import { AcaoService } from './service/acao.service';

@Component({
  selector: 'app-acao',
  templateUrl: './acao.component.html',
  styleUrls: ['./acao.component.css']
})
export class AcaoComponent implements OnInit {

  @ViewChild('modalConfirmacao', { static: true }) modalConfirmacao: NgbModal;

  @ViewChild('modalForm', { static: true }) modalForm: NgbModal;

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
    this.ngbModal.open(this.modalForm,  {ariaLabelledBy: 'modal-basic-title'})
      .result.then(result => {
          if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
            if (result === 'Save click') {
              this.atualizarAcao(acao);
            }
          }
        }
      ).finally(() => {
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
        const failMessage = {
          severity: 'error',
          summary: 'Erro',
          detail: err.error.detalhes,
        };
        this.messageService.add(failMessage);
      }
    );
  }

}
