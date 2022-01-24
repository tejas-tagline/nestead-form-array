import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
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


  questionArray = [];

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngAfterViewInit(): void {
    // document.getElementById('addNewQuestion').click();
    // this.addQuestionList();
    // this.addNewAnswerOptions(0);
    this.initForm();
    this.questionForm.get('inputType').valueChanges.subscribe((value) => {
      console.log(`this.questionForm`, this.questionForm);
      this.questionForm.removeControl('answerGroup');
      if (value === 'checkbox') {
        console.log('checkbox');
        this.questionForm.addControl('answerGroup', this.getCheckboxForm());
      } else {
        this.questionForm.addControl('answerGroup', this.getBriefAnswer());
      }
    });
  }

  initForm() {
    this.questionForm = this.fb.group({
      inputType: ['checkbox'],
      question: [null],
      answerGroup: this.getCheckboxForm(),
    });
  }

  ngOnInit(): void {}

  getOptionFormArray(): FormArray {
    return this.questionForm
      .get('answerGroup')
      .get('answerOptions') as FormArray;
  }

  getQuestionFormArray(): FormArray {
    return this.allQuestionListForm.get('questionArray') as FormArray;
  }

  getQuestionById(id: number) {
    return this.questionArray[id];
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

  // answerOptions(empIndex: number): FormArray {
  //   return this.getQuestionListFormArray()
  //     .at(empIndex)
  //     .get('optionsList') as FormArray;
  // }

  newAnswerOptions(): FormGroup {
    return this.fb.group({
      options: '',
    });
  }

  // removeAnswerOpetions = () => {
  //   while (this.answerOptions(0).controls.length !== 0) {
  //     this.answerOptions(0).removeAt(0);
  //   }
  // };

  addNewAnswerOptions(): void {
    console.log(`getOptionFormArray()`, this.getOptionFormArray());
    this.getOptionFormArray().push(this.newAnswerOptions());
  }

  removeAnswerOptionsSkill(empIndex: number): void {
    this.getOptionFormArray().removeAt(empIndex);
  }

  // Modal open and close handler start
  open(content): void {
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
    const questionFormData = this.questionForm.value;
    this.getQuestionFormArray().push(this.questionForm);
    // this.questionForm.reset();
    console.log(`this.`, this.getQuestionFormArray().value)

    this.questionArray = this.getQuestionFormArray().value

    this.initForm();
    modal.close('Save click');
  }

  getData() {}
}
