import { Component } from '@angular/core';
import { EnvService } from 'src/environments/env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 
  
  public appUrl : any = '';
  constructor(public env : EnvService) {
    this.appUrl = this.env.API_URL;
    console.log('env varible -->', this.appUrl);
  }
 }
