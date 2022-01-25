import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './components/questions/questions.component';
import { VerifyAnswerComponent } from './components/verify-answer/verify-answer.component';

const routes: Routes = [
  {path: '', component: QuestionsComponent},
  {path: 'verify-answer/:id', component: VerifyAnswerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
