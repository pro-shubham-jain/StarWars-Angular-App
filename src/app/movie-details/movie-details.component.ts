import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/services/http.service';
import { filmResultDTO, filmsApi, peopleDTO } from '../constants/api-dto';
import * as _ from 'lodash';
import { forkJoin, of } from 'rxjs';
import { HelperService } from 'src/services/helper.service';
import { AddFilmsDetails, AddCharactersList, AddCharactersDetails, AddFilmsList } from '../appState/app.action';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public filmId: number = 0;
  public isLoading: boolean = false;
  public starWarFilmDetails: filmResultDTO | undefined;

  constructor(public httpServices: HttpService,
    public helperServices: HelperService,
    private store: Store,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.filmId = Number(this.route?.snapshot?.paramMap?.get('id') || 0);
    if (!this.helperServices.checkValidId(this.filmId)) {
      this.router.navigate(['/homePage']);
    } else {
      this.getSetDataFromState();
    }
  }

  getSetDataFromState() {
    const filmsState = this.store.select(state => state?.starWarMoviesList);
    filmsState?.subscribe(response => {
      if (response?.starWarMoviesList?.length === 0) {
        this.getMovieList();
      } else {
        const filmsList = response?.starWarMoviesList;
        const isFilmInHistory = response?.starWarFilmDetails;
        if (isFilmInHistory?.id === this.filmId) {
          this.starWarFilmDetails = isFilmInHistory;
        } else {
          let findFilm = filmsList?.find((item: filmResultDTO) => {
            return item?.id === this.filmId;
          });
          if (!!findFilm) {
            this.getCharactersFromFilm(findFilm);
          }
        }
      }
    });
  }

  getMovieList() {
    this.isLoading = true;
    this.httpServices.getFilmsList().subscribe({
      next: (response) => {
        this.isLoading = false;
        let data = response as filmsApi;
        data.results = data?.results?.map((item, index) => {
          return { ...item, id: (index + 1), imgPath: `../../assets/movieImages/${index + 1}.jpg` }
        });
        if (data.results?.length > 0) {
          this.store.dispatch(new AddFilmsList(data.results));
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Film Details Api error response ->', err);
      }
    });
  }


  getCharactersFromFilm(movieDetails: filmResultDTO) {
    const charactersDetailsApiCall = movieDetails?.characters?.map(item => {
        const id = this.helperServices.getIdfromUrl(item);
        return id > 0 ? this.httpServices.getcharacterDetails(id) : null;
    });
    if(!charactersDetailsApiCall.includes(null)) {
      this.isLoading = true;
      forkJoin(charactersDetailsApiCall).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          let charactersList = response as peopleDTO[] || [];
          if (charactersList?.length > 0) {
            movieDetails.characters = charactersList?.map((item: peopleDTO, index: number) => {
              return { ...item, id: (index + 1) }
            });
            this.starWarFilmDetails = movieDetails;
            if (!!movieDetails) {
              this.store.dispatch(new AddCharactersList(movieDetails?.characters));
              this.store.dispatch(new AddFilmsDetails(movieDetails));
            }
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('characters DetailsApi error response ->', err);
        }
      });  
    }
  }

  redirectTocharacters(item: peopleDTO) {
    this.store.dispatch(new AddCharactersDetails(item));
    this.router.navigate([`/character/${item?.id}`]);
  }

  get isEmptyMovieDetial() {
    return _.isEmpty(this.starWarFilmDetails);
  }
}
