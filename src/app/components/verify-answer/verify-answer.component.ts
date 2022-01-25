import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-verify-answer',
  templateUrl: './verify-answer.component.html',
  styleUrls: ['./verify-answer.component.scss'],
})
export class VerifyAnswerComponent implements OnInit {
  private state$: Observable<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonServiceService
  ) {}

  answer: any;
  correctAnswer: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.answer = this.commonService.questionArray[+params['id']];

      if (this.answer.inputType === 'checkbox') {
        this.correctAnswer = this.answer.answerGroup.answerOptions
          .filter((value) => value.correctAnswer)
          .map((data) => data.options)
          .join(', ');
      }
      console.log('this.answer :>> ', this.answer);
    });
  }
}
