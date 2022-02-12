import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { GithubShowcaseComponent } from './github-showcase/github-showcase.component';
import { GitHubService } from './services/git-hub.service';
import { MediaButtonComponent } from './media-button/media-button.component';
import { ProjectComponent } from './project/project.component';
import { AnimatedBackgroundComponent } from './animated-background/animated-background.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeComponent } from './resume/resume.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AboutMeComponent,
    GithubShowcaseComponent,
    MediaButtonComponent,
    ProjectComponent,
    AnimatedBackgroundComponent,
    ContactComponent,
    ResumeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutMeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'resume', component: ResumeComponent }
    ])
  ],
  providers: [
    GitHubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
