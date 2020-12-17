import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from 'src/about-us/about-us.component';
import { AdminPageComponent } from 'src/admin-page/admin-page.component';
import { AdmissionsComponent } from 'src/admissions/admissions.component';
import { ContactUsComponent } from 'src/contact-us/contact-us.component';
import { CreateQuizComponent } from 'src/create-quiz/create-quiz.component';
import { DashboardComponent } from 'src/dashboard/dashboard.component';
import { FacultyComponent } from 'src/faculty/faculty.component';
import { FtseQuizPageComponent } from 'src/ftse-quiz-page/ftse-quiz-page.component';
import { FtseQuizComponent } from 'src/ftse-quiz/ftse-quiz.component';
import { HomeComponent } from 'src/home/home.component';
import { IntroPageComponent } from 'src/intro-page/intro-page.component';
import { LoginPageComponent } from 'src/login-page/login-page.component';
import { QuestionFormComponent } from 'src/question-form/question-form.component';
import { QuizDashboardComponent } from 'src/quiz-dashboard/quiz-dashboard.component';
import { QuizPageComponent } from 'src/quiz-page/quiz-page.component';
import { ScoreCardComponent } from 'src/score-card/score-card.component';
import { AppComponent } from './app.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {path:'' , component:HomeComponent,canActivate:[LoginGuard]},
  {path:'admin' , component:AdminPageComponent ,canActivate:[LoginGuard]},
  {path:'createQuiz' , component:CreateQuizComponent,canActivate:[LoginGuard]},
  {path:'createQuestion' , component:QuestionFormComponent,canActivate:[LoginGuard]},
  {path:'quiz' ,component:QuizPageComponent,canActivate:[LoginGuard]},
  // {path:'dashboard' ,component:DashboardComponent,canActivate:[LoginGuard]},
  // {path:'quizDash' , component:QuizDashboardComponent,canActivate:[LoginGuard]},
  {path:'ftseQuiz' , component:FtseQuizComponent , canActivate:[LoginGuard]},
  {path:'about' , component:AboutUsComponent, canActivate:[LoginGuard]},
  {path:'score' , component:ScoreCardComponent , canActivate:[LoginGuard]},
  {path:'faculty',component:FacultyComponent, canActivate:[LoginGuard]},
  {path:'admissions', component:AdmissionsComponent, canActivate:[LoginGuard]},
  {path:'contact' , component:ContactUsComponent, canActivate:[LoginGuard]},
  {path:'login' , component:LoginPageComponent, canActivate:[LoginGuard]},
  {path:'results' , component:ScoreCardComponent , canActivate:[LoginGuard]},
  {path:'ftse' , component:FtseQuizPageComponent , canActivate:[LoginGuard]},
  {path:'intro' , component:IntroPageComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
