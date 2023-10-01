import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { HelperService } from 'src/services/helper.service';
import { HttpService } from 'src/services/http.service';
import { AppState } from '../appState/app.state';

import { CharacterDetailsComponent } from './character-details.component';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let router: Router;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDetailsComponent],
      imports: [HttpClientTestingModule, NgxsModule.forRoot([AppState])],
      providers: [
        HttpService,
        HelperService,
        Router,
        Store,
        HttpClientTestingModule,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as getSetDataFromState 'Star-Wars'`, () => {
    const fixture = TestBed.createComponent(CharacterDetailsComponent);
    const CharacterDetails = fixture.componentInstance;
    expect(CharacterDetails.getSetDataFromState).toBeDefined();
  });

  it(`should should set as starWarCharacterDetails as per DTO`, () => {
    const mockResponse = {
      name: 'Luke Skywalker',
      height: 172,
      mass: 77,
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
      fimList: [{}],
    };
    const fixture = TestBed.createComponent(CharacterDetailsComponent);
    const CharacterDetails = fixture.componentInstance;
    CharacterDetails.starWarCharacterDetails = mockResponse;
    expect(CharacterDetails.starWarCharacterDetails).toEqual(mockResponse);
  });

  it('should navigate to charcter', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToMovie(1);
    expect(navigateSpy).toHaveBeenCalledWith([`/movie/1`]);
  });

});
