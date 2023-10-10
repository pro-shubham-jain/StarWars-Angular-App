import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { HttpService } from 'src/services/http.service';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './appState/app.state';
import { EnvServiceProvider } from 'src/environments/env.service.provider';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MovieDetailsComponent,
    CharacterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState]),
    NgbToastModule
  ],
  providers: [HttpService, EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
