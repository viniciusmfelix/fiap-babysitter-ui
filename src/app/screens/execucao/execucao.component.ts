import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AcaoService } from '../acao/service/acao.service';
import { IExecucao } from './model/IExecucao';
import { ExecucaoService } from './service/execucao.service';

@Component({
  selector: 'app-execucao',
  templateUrl: './execucao.component.html',
  styleUrls: ['./execucao.component.css']
})
export class ExecucaoComponent implements OnInit {

  @ViewChild('modalConfirmacao', { static: true }) modalConfirmacao: NgbModal;

  @ViewChild('modalEdicao', { static: true }) modalEdicao: NgbModal;

  @ViewChild('modalCadastro', { static: true }) modalCadastro: NgbModal;

  @ViewChild('modalDelecao', { static: true }) modalDelecao: NgbModal;

  @ViewChild('modalExecucao', { static: true }) modalExecucao: NgbModal;

  execucoes: IExecucao[];

  acao: IExecucao;

  editMode: boolean;

  inputSwitch: boolean;

  data: string;

  hora: string;

  loading: boolean;

  constructor(private acaoService: AcaoService, private ngbModal: NgbModal, private messageService: MessageService,
              private execucaoService: ExecucaoService) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    setTimeout(() => {
      this.fetchExecucoes();
    }, 3500);
  }

  async fetchExecucoes(): Promise<void> {
    await this.execucaoService.index().toPromise().then(execucoes => {
        this.execucoes = execucoes;
        let index = 0;
        this.execucoes.forEach(execucao => {
          [this.execucoes[index].data, this.execucoes[index].hora] = this.dateHourFormatter(execucao.dataExecucao);
          index++;
        });
        this.loading = false;
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
              // this.atualizarAcao(acao);
            }
          }
        }
      ).finally(() => {
          this.ngbModal.dismissAll();
        }
      );
  }

  dateHourFormatter(dataExecucao) {
    const timestampStr = dataExecucao.split('T');
    const dataStr = timestampStr[0];
    const horaStr: string = timestampStr[1];

    const [ano, mes, dia] = dataStr.split('-');
    const hora = horaStr.substr(0, horaStr.length - 1);

    const data = dia + '/' + mes + '/' + ano;

    return [data, hora];
  }

  // onEdicaoClicked(acao) {
  //   this.acao = acao;
  //   this.editMode = true;
  //   this.ngbModal.open(this.modalEdicao,  {ariaLabelledBy: 'modal-basic-title'})
  //     .result.then(result => {
  //         if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
  //           if (result === 'Save click') {
  //             this.atualizarAcao(acao);
  //           }
  //         }
  //       }
  //     ).finally(() => {
  //         this.fetchExecucoes();
  //         this.ngbModal.dismissAll();
  //       }
  //     );
  // }

  // onRemocaoClicked(acao) {
  //   this.acao = acao;
  //   this.editMode = true;
  //   this.ngbModal.open(this.modalDelecao,  {ariaLabelledBy: 'modal-basic-title'})
  //     .result.then(result => {
  //         if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
  //           if (result === 'Save click') {
  //             this.removerAcao(acao);
  //           }
  //         }
  //       }
  //     ).finally(() => {
  //         this.fetchExecucoes();
  //         this.ngbModal.dismissAll();
  //       }
  //     );
  // }

  // onCadastroClicked() {
  //   this.acao = {
  //     nome: null,
  //     descricao: null,
  //     ativo: false,
  //   };

  //   this.ngbModal.open(this.modalCadastro,  {ariaLabelledBy: 'modal-basic-title'})
  //     .result.then(result => {
  //         if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
  //           if (result === 'Save click') {
  //             this.cadastrarAcao(this.acao);
  //           }
  //         }
  //       }
  //     ).finally(() => {
  //         this.fetchExecucoes();
  //         this.ngbModal.dismissAll();
  //       }
  //     );
  // }


  // onExecutarAcaoClicked(acao) {
  //   this.acao = acao;
  //   this.editMode = true;
  //   this.ngbModal.open(this.modalExecucao,  {ariaLabelledBy: 'modal-basic-title'})
  //     .result.then(result => {
  //         if (result !== ModalDismissReasons.ESC && result !== ModalDismissReasons.BACKDROP_CLICK) {
  //           if (result === 'Save click') {
  //             this.executarAcao(acao);
  //           }
  //         }
  //       }
  //     ).finally(() => {
  //         this.fetchExecucoes();
  //         this.ngbModal.dismissAll();
  //       }
  //     );
  // }

  // async atualizarAcao(acao) {
  //   await this.acaoService.update(acao).toPromise().then(response => {
  //       const successMessage = {
  //         severity: 'success',
  //         summary: 'Sucesso',
  //         detail: 'Ação atualizada!'
  //       };
  //       this.messageService.add(successMessage);
  //     }
  //   ).catch(err => {
  //     const failedConstraintsMessage: any[] = [];

  //     if (err.error.campos !== undefined) {
  //       err.error.campos.forEach(campo => {
  //           const failedConstraintMessage = {
  //             severity: 'error',
  //             summary: 'Erro',
  //             detail: campo.mensagem,
  //             sticky: true,
  //           };
  //           failedConstraintsMessage.push(failedConstraintMessage);
  //         }
  //       );
  //     }

  //     const failMessage = {
  //       severity: 'error',
  //       summary: 'Erro',
  //       detail: err.error.detalhes,
  //       sticky: true,
  //     };

  //     failedConstraintsMessage.push(failMessage);
  //     this.messageService.addAll(failedConstraintsMessage);
  //     }
  //   );
  // }

  // async cadastrarAcao(acao) {
  //   await this.acaoService.store(acao).toPromise().then(response => {
  //       this.acoes.push(response);
  //       const successMessage = {
  //         severity: 'success',
  //         summary: 'Sucesso',
  //         detail: 'Ação cadastrada!'
  //       };
  //       this.messageService.add(successMessage);
  //     }
  //   ).catch(err => {

  //       const failedConstraintsMessage: any[] = [];

  //       if (err.error.campos !== undefined) {
  //         err.error.campos.forEach(campo => {
  //             const failedConstraintMessage = {
  //               severity: 'error',
  //               summary: 'Erro',
  //               detail: campo.mensagem,
  //               sticky: true,
  //             };
  //             failedConstraintsMessage.push(failedConstraintMessage);
  //           }
  //         );
  //       }

  //       const failMessage = {
  //         severity: 'error',
  //         summary: 'Erro',
  //         detail: err.error.detalhes,
  //         sticky: true,
  //       };

  //       failedConstraintsMessage.push(failMessage);
  //       this.messageService.addAll(failedConstraintsMessage);
  //     }
  //   );
  // }

  // async removerAcao(acao) {
  //   await this.acaoService.destroy(acao.id).toPromise().then(response => {
  //     const acaoIndex = this.acoes.findIndex(act => act.id === acao.id);
  //     this.acoes.splice(acaoIndex, 1);
  //     const successMessage = {
  //       severity: 'success',
  //       summary: 'Sucesso',
  //       detail: 'Ação removida!'
  //     };
  //     this.messageService.add(successMessage);
  //   }
  // ).catch(err => {

  //     const failedConstraintsMessage: any[] = [];

  //     if (err.error.campos !== undefined) {
  //       err.error.campos.forEach(campo => {
  //           const failedConstraintMessage = {
  //             severity: 'error',
  //             summary: 'Erro',
  //             detail: campo.mensagem,
  //             sticky: true,
  //           };
  //           failedConstraintsMessage.push(failedConstraintMessage);
  //         }
  //       );
  //     }

  //     const failMessage = {
  //       severity: 'error',
  //       summary: 'Erro',
  //       detail: err.error.detalhes,
  //       sticky: true,
  //     };

  //     failedConstraintsMessage.push(failMessage);
  //     this.messageService.addAll(failedConstraintsMessage);
  //   }
  // );
  // }

  // async executarAcao(acao) {

  //   const execucao: IExecucao = {
  //     acao: {
  //       id: acao.id,
  //     },
  //   };

  //   await this.execucaoService.store(execucao).toPromise().then(response => {
  //       const successMessage = {
  //         severity: 'success',
  //         summary: 'Sucesso',
  //         detail: 'Ação executada!'
  //       };
  //       this.messageService.add(successMessage);
  //     }
  //   ).catch(err => {
  //     const failedConstraintsMessage: any[] = [];

  //     if (err.error.campos !== undefined) {
  //       err.error.campos.forEach(campo => {
  //           const failedConstraintMessage = {
  //             severity: 'error',
  //             summary: 'Erro',
  //             detail: campo.mensagem,
  //             sticky: true,
  //           };
  //           failedConstraintsMessage.push(failedConstraintMessage);
  //         }
  //       );
  //     }

  //     const failMessage = {
  //       severity: 'error',
  //       summary: 'Erro',
  //       detail: err.error.detalhes,
  //       sticky: true,
  //     };

  //     failedConstraintsMessage.push(failMessage);
  //     this.messageService.addAll(failedConstraintsMessage);
  //     }
  //   );
  // }
}
