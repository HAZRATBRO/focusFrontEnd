import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from 'src/admin-login/admin-login.component';
 import { AdminPageComponent } from 'src/admin-page/admin-page.component';
import { AdmissionsComponent } from 'src/admissions/admissions.component';
import { ContactUsComponent } from 'src/contact-us/contact-us.component';
import { CreatePlaygroundComponent } from 'src/create-playground/create-playground.component';
 import { FacultyComponent } from 'src/faculty/faculty.component';
import { FtseQuizPageComponent } from 'src/ftse-quiz-page/ftse-quiz-page.component';
import { FtseQuizComponent } from 'src/ftse-quiz/ftse-quiz.component';
import { HomeComponent } from 'src/home/home.component';
import { IntroPageComponent } from 'src/intro-page/intro-page.component';
import { LoginPageComponent } from 'src/login-page/login-page.component';
 import { QuizDashboardComponent } from 'src/quiz-dashboard/quiz-dashboard.component';
import { QuizPageComponent } from 'src/quiz-page/quiz-page.component';
import { SampleQuizComponent } from 'src/sample-quiz/sample-quiz.component';
import { ScoreCardComponent } from 'src/score-card/score-card.component';
import { StudentDataComponent } from 'src/student-data/student-data.component';
import { AdminGuard } from './admin.gaurd';
import { AppComponent } from './app.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {path:'' , component:HomeComponent },
  {path:'admin' , component:AdminPageComponent, canActivate:[AdminGuard] },
     {path:'quiz' ,component:QuizPageComponent,canActivate:[LoginGuard]},
  // {path:'dashboard' ,component:DashboardComponent,canActivate:[LoginGuard]},
  // {path:'quizDash' , component:QuizDashboardComponent,canActivate:[LoginGuard]},
  {path:'ftseQuiz' , component:FtseQuizComponent , canActivate:[LoginGuard]},
   {path:'score' , component:ScoreCardComponent , canActivate:[LoginGuard]},
  {path:'faculty',component:FacultyComponent, canActivate:[LoginGuard]},
  {path:'admissions', component:AdmissionsComponent, canActivate:[LoginGuard]},
  {path:'contact' , component:ContactUsComponent, canActivate:[LoginGuard]},
  {path:'login' , component:LoginPageComponent, canActivate:[LoginGuard]},
  {path:'results' , component:ScoreCardComponent , canActivate:[LoginGuard]},
  {path:'ftse' , component:FtseQuizPageComponent , canActivate:[LoginGuard]},
  {path:'intro' , component:IntroPageComponent  , canActivate:[LoginGuard]},
  {path:'sampleTest' , component:SampleQuizComponent , canActivate:[LoginGuard]},
  {path:'createPlayground' , component:CreatePlaygroundComponent , canActivate:[AdminGuard]},
  {path:'studentData' , component:StudentDataComponent},
  {path:'adminLogin' , component:AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
