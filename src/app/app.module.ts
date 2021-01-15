import {MomentModule} from 'angular2-moment'
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, InactivityDialogComponent } from './app.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'
import { ErrorStateMatcher, MatOptionModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { AdminPageComponent } from 'src/admin-page/admin-page.component';
import {MatMenuModule} from '@angular/material/menu';
 import {MatStepperModule} from '@angular/material/stepper';
 import {MatExpansionModule} from '@angular/material/expansion';
import { QuizPageComponent } from '../quiz-page/quiz-page.component'; 
import {MatRadioModule} from '@angular/material/radio';
import { QuestionViewComponent } from '../question-view/question-view.component'; 
import { ChartsModule } from 'ng2-charts';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
 import { FormatterPipe } from '../pipes/formatter.pipe';
  import { QuizDashboardComponent } from '../quiz-dashboard/quiz-dashboard.component';    
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from '../home/home.component';
import { LoginGuard } from './login.guard';
import { ErrorInterceptor } from './error.interceptor';
import { IntroPageComponent } from '../intro-page/intro-page.component';
import { ScoreCardComponent } from 'src/score-card/score-card.component';
 import { NgxSpinnerModule } from "ngx-spinner";
 import { CarouselComponent } from '../home/carousel/carousel.component';
 import { FacultyComponent } from '../faculty/faculty.component';
import { AdmissionsComponent } from '../admissions/admissions.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { FooterComponent } from '../footer/footer.component';
import { FacultyCardComponent } from '../faculty/faculty-card/faculty-card.component';
import { PlayYoutubeVideoComponent } from 'src/home/play-youtube-video/play-youtube-video.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FtseQuizComponent } from '../ftse-quiz/ftse-quiz.component';
 import { FtseQuizPageComponent } from 'src/ftse-quiz-page/ftse-quiz-page.component';
 import { NgxCarouselModule } from 'ngx-light-carousel'
 import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SampleQuizComponent } from '../sample-quiz/sample-quiz.component';
import { CreatePlaygroundComponent } from '../create-playground/create-playground.component';
 import { QuestionFormComponent } from 'src/create-playground/question-form/question-form.component';
 import { StudentDataComponent } from '../student-data/student-data.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component'; 
import { AdminGuard } from './admin.gaurd';
  @NgModule({
 


  declarations: [
    
    AppComponent,
    LoginPageComponent,
    AdminPageComponent,
    QuizPageComponent,
    QuestionViewComponent,
    FormatterPipe,
     QuizDashboardComponent,
    HomeComponent,
    IntroPageComponent,
    ScoreCardComponent,
    CarouselComponent,
     FacultyComponent,
    AdmissionsComponent,
    ContactUsComponent,
    FooterComponent,
    FacultyCardComponent,
    PlayYoutubeVideoComponent,
    FtseQuizComponent,
    FtseQuizPageComponent,
    SampleQuizComponent,
    CreatePlaygroundComponent,
     QuestionFormComponent,
     StudentDataComponent,
     AdminLoginComponent,
     ],
  imports: [
     CarouselModule,
    NgxCarouselModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    MatDialogModule,
    NgxSpinnerModule,
     FlexLayoutModule,
    MatListModule, 
    ChartsModule ,
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
     HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
     MatCardModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatStepperModule,
    MatExpansionModule,
    MatRadioModule,
    MatCheckboxModule,
     MatGridListModule,
    MatProgressBarModule,
       
  ],
  providers: [ {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},AdminGuard , LoginGuard ,FormatterPipe ,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports:[
    MatInputModule,
    MatFormFieldModule,
     
  ],
  entryComponents:[ AppComponent, InactivityDialogComponent ],
  schemas: []
})
export class AppModule { }
