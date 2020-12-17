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
import { CreateQuizComponent } from '../create-quiz/create-quiz.component'; 
import {MatStepperModule} from '@angular/material/stepper';
import { QuestionFormComponent } from '../question-form/question-form.component'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { QuizPageComponent } from '../quiz-page/quiz-page.component'; 
import {MatRadioModule} from '@angular/material/radio';
import { QuestionViewComponent } from '../question-view/question-view.component'; 
import { ChartsModule } from 'ng2-charts';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormatterPipe } from '../pipes/formatter.pipe';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { QuizDashboardComponent } from '../quiz-dashboard/quiz-dashboard.component';    
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from '../home/home.component';
import { LoginGuard } from './login.guard';
import { ErrorInterceptor } from './error.interceptor';
import { IntroPageComponent } from '../intro-page/intro-page.component';
import { ScoreCardComponent } from 'src/score-card/score-card.component';
import { FocusChartComponent } from 'src/focus-chart/focus-chart.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatTableModule} from '@angular/material/table';
import { CarouselComponent } from '../home/carousel/carousel.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { FacultyComponent } from '../faculty/faculty.component';
import { AdmissionsComponent } from '../admissions/admissions.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { FooterComponent } from '../footer/footer.component';
import { FacultyCardComponent } from '../faculty/faculty-card/faculty-card.component';
import { PlayYoutubeVideoComponent } from 'src/home/play-youtube-video/play-youtube-video.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FtseQuizComponent } from '../ftse-quiz/ftse-quiz.component';
import { FtseQuizPageComponent } from 'src/ftse-quiz-page/ftse-quiz-page.component';
import { OverallPerformanceComponent } from 'src/score-card/overall-performance/overall-performance.component';
 
@NgModule({
 


  declarations: [
    OverallPerformanceComponent,
    AppComponent,
    LoginPageComponent,
    AdminPageComponent,
    CreateQuizComponent,
    QuestionFormComponent,
    QuizPageComponent,
    QuestionViewComponent,
    FormatterPipe,
    DashboardComponent,
    QuizDashboardComponent,
    HomeComponent,
    IntroPageComponent,
    ScoreCardComponent,
    FocusChartComponent,
    CarouselComponent,
    AboutUsComponent,
    FacultyComponent,
    AdmissionsComponent,
    ContactUsComponent,
    FooterComponent,
    FacultyCardComponent,
    PlayYoutubeVideoComponent,
    FtseQuizComponent,
    FtseQuizPageComponent,
      
    ],
  imports: [
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatTableModule,
    FlexLayoutModule,
    MatChipsModule, 
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
    MatListModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatStepperModule,
    MatExpansionModule,
    MatRadioModule,
    MatCheckboxModule,
    ScrollingModule,
    MatGridListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
      
  ],
  providers: [ {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher} , LoginGuard ,FormatterPipe ,
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
  entryComponents:[QuestionFormComponent , AppComponent, InactivityDialogComponent ],
   
})
export class AppModule { }
