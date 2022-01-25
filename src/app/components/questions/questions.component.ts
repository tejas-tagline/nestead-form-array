import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  public inputType: any[] = [
    {
      id: 1,
      name: 'checkbox',
    },
    {
      id: 2,
      name: 'textarea',
    },
  ];

  allQuestionListForm: FormGroup = this.fb.group({
    questionArray: this.fb.array([]),
  });
  questionForm: FormGroup;
  closeResult = '';

  // questionArray = [];

  private subs: Subscription;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private commonService: CommonServiceService
  ) {}

  initForm() {
    this.questionForm = this.fb.group({
      inputType: ['checkbox'],
      question: [null],
      answerGroup: this.getCheckboxForm(),
      usersAnswer: [null],
    });

    this.subs && this.subs.unsubscribe();
    this.subs = this.questionForm.get('inputType').valueChanges.subscribe({
      next: (value) => {
        this.questionForm.removeControl('answerGroup');
        if (value === 'checkbox') {
          this.questionForm.addControl('answerGroup', this.getCheckboxForm());
        } else {
          this.questionForm.addControl('answerGroup', this.getBriefAnswer());
        }
      },
      error: (error) => console.log('Error', error),
      complete: () => console.log('r :>> '),
    });
  }

  ngOnInit(): void {
    if(this.commonService.questionArray.length) {
      this.commonService.questionArray.forEach(() => {

      })
    }
  }

  getOptionFormArray(): FormArray {
    return this.questionForm
      .get('answerGroup')
      .get('answerOptions') as FormArray;
  }

  getQuestionFormArray(): FormArray {
    return this.allQuestionListForm.get('questionArray') as FormArray;
  }

  getQuestionById(id: number) {
    return this.commonService.questionArray[id];
  }

  getCheckboxForm() {
    return this.fb.group({
      answerOptions: this.fb.array([this.newAnswerOptions()]),
      otherAnswer: [null],
    });
  }

  getBriefAnswer() {
    return this.fb.group({
      briefAnswer: [''],
    });
  }

  newQuestionList(): FormGroup {
    return this.fb.group({
      questionDetail: '',
      optionsList: this.fb.array([]),
    });
  }

  // addQuestionList(): void {
  //   this.getQuestionListFormArray().push(this.newQuestionList());
  // }

  removeQuestionForm(empIndex: number): void {
    // this.getQuestionListFormArray().removeAt(empIndex);
  }

  closeModal(modal): void {
    modal.dismiss('Cross click');
  }

  newAnswerOptions(): FormGroup {
    return this.fb.group({
      options: [''],
      correctAnswer: [true]
    });
  }

  addNewAnswerOptions(): void {
    this.getOptionFormArray().push(this.newAnswerOptions());
  }

  removeAnswerOptionsSkill(empIndex: number): void {
    this.getOptionFormArray().removeAt(empIndex);
  }

  // Modal open and close handler start
  open(content): void {
    this.initForm();
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // Modal open and close handler end

  public submitQuestion(modal): void {
    console.log('this.getQuestionFormArray() :>> ', this.getQuestionFormArray());
    this.getQuestionFormArray().push(this.questionForm);
    this.commonService.questionArray = this.getQuestionFormArray().value;

    modal.close('Save click');
  }

  obj: { [key: number]: string[] } = {};
  checkBoxSelected(item: string, formIndex: number) {
    if (this.obj[formIndex]?.length) {
      const index = this.obj[formIndex].findIndex((data) => data === item);
      if (index === -1) {
        this.obj[formIndex].push(item);
      } else {
        this.obj[formIndex].splice(index, 1);
      }
    } else {
      this.obj[formIndex] = [];
      this.obj[formIndex].push(item);
    }
    this.getQuestionFormArray()
      .at(formIndex)
      .get('usersAnswer')
      .setValue(this.obj[formIndex].join(', '));
    this.commonService.questionArray = this.getQuestionFormArray().value;
  }

  verifyAnswer(id: number) {
    this.commonService.questionArray = this.getQuestionFormArray().value;
    console.log('this.commonService.questionArray :>> ', this.commonService.questionArray);
    this.router.navigate(['/verify-answer', id]);
  }
}
