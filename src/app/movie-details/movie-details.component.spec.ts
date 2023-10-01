import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { HelperService } from 'src/services/helper.service';
import { HttpService } from 'src/services/http.service';
import { AppState } from '../appState/app.state';
import { peopleDTO } from '../constants/api-dto';

import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
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

    fixture = TestBed.createComponent(MovieDetailsComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as getSetDataFromState 'Star-Wars'`, () => {
    const fixture = TestBed.createComponent(MovieDetailsComponent);
    const MovieDetails = fixture.componentInstance;
    expect(MovieDetails.getSetDataFromState).toBeDefined();
  });

  it(`should should set as starWarMovieDetails as per DTO`, () => {
    const mockResponse = {
      title: 'A New Hope',
      imgPath: '',
      episode_id: 4,
      opening_crawl:
        "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: '2014-12-10T14:23:31.880000Z',
      edited: '2014-12-20T19:49:45.256000Z',
      url: 'https://swapi.dev/api/films/1/',
    };
    const fixture = TestBed.createComponent(MovieDetailsComponent);
    router = TestBed.get(Router);
    const movieDetails = fixture.componentInstance;
    movieDetails.starWarFilmDetails = mockResponse;
    expect(movieDetails.starWarFilmDetails).toEqual(mockResponse);
  });

  it('should navigate to charcter', () => {
    const mockResponse = { id: 1 } as any;
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectTocharacters(mockResponse);
    expect(navigateSpy).toHaveBeenCalledWith([`/character/1`]);
  });

});
