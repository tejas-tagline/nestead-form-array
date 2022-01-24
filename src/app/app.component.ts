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

  // allQuestionListForm: FormGroup;
  questionForm: FormGroup;
  closeResult = '';

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngAfterViewInit(): void {
    // document.getElementById('addNewQuestion').click();
    // this.addQuestionList();
    // this.addNewAnswerOptions(0);
  }

  ngOnInit(): void {
    // this.allQuestionListForm = this.fb.group({
    //   questionFormList: this.fb.array([])
    // });

    this.questionForm = this.fb.group({
      inputType: ['checkbox'],
      question: [null],
      answerGroup: this.getCheckboxForm(),
    });

    this.questionForm.get('inputType').valueChanges.subscribe((value) => {
      console.log('value', value);
      console.log(`this.fo`, this.questionForm)
      if (value === 'checkbox') {
        console.log('checkbox');
        this.questionForm.removeControl('answerGroup')
        this.questionForm.addControl('answerGroup', this.getCheckboxForm());
      } else if (value === 'textarea') {
        // this.removeAnswerOpetions();
        this.questionForm.removeControl('answerGroup')
        this.questionForm.addControl('answerGroup', this.getBriefAnswer());
      }
    });
  }

  getOptionFormArray(): FormArray {
    return this.questionForm.get('answerGroup').get('answerOptions') as FormArray;
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

  // questionList form arry start
  getQuestionListFormArray(): FormArray {
    return this.questionForm.get('questionList') as FormArray;
  }

  newQuestionList(): FormGroup {
    return this.fb.group({
      questionDetail: '',
      optionsList: this.fb.array([]),
    });
  }

  addQuestionList(): void {
    this.getQuestionListFormArray().push(this.newQuestionList());
  }

  removeQuestionForm(empIndex: number): void {
    // this.getQuestionListFormArray().removeAt(empIndex);
  }

  closeModal(modal): void {
    modal.dismiss('Cross click');
  }

  answerOptions(empIndex: number): FormArray {
    return this.getQuestionListFormArray()
      .at(empIndex)
      .get('optionsList') as FormArray;
  }

  newAnswerOptions(): FormGroup {
    return this.fb.group({
      options: '',
    });
  }

  removeAnswerOpetions = () => {
    while (this.answerOptions(0).controls.length !== 0) {
      this.answerOptions(0).removeAt(0);
    }
  };

  addNewAnswerOptions(): void {
    console.log(`getOptionFormArray()`, this.getOptionFormArray())
    this.getOptionFormArray().push(this.newAnswerOptions());
  }

  removeAnswerOptionsSkill(empIndex: number): void {
    this.getOptionFormArray().removeAt(empIndex);
  }

  // onSubmit(): void {
  //   console.log(this.questionForm.value);
  // }
  // questionList form arry end

  // Modal open and close handler start
  open(content): void {
    // this.addQuestionList();
    // this.addNewAnswerOptions(0);

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
    console.log('questionFormData', questionFormData);
    this.removeQuestionForm(0);
    modal.close('Save click');
  }
}
