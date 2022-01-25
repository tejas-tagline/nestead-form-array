import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  questionArray = [
    {
      inputType: 'checkbox',
      question: 'Test Checkbox question',
      answerGroup: {
        answerOptions: [
          {
            options: 'Option 1',
            correctAnswer: true
          },
          {
            options: 'Option 2',
            correctAnswer: false
          },
          {
            options: 'Option 3',
            correctAnswer: true
          },
        ],
        otherAnswer: 'Other answer',
      },
      usersAnswer: 'Test by user',
    },
    {
      inputType: 'textarea',
      question: 'Test brief question',
      usersAnswer: 'text area answer',
      answerGroup: {
        briefAnswer: 'Brief answer',
      },
    },
  ];

  constructor() {}
}
