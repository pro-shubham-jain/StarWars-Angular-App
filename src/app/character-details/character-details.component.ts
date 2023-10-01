import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HelperService } from 'src/services/helper.service';
import { HttpService } from 'src/services/http.service';
import { AddCharactersList, AddFilmsList } from '../appState/app.action';
import { filmResultDTO, filmsApi, peopleDTO } from '../constants/api-dto';
import * as _ from "lodash";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  public peopleId: number = 0;
  public isLoading: boolean = false;
  public starWarCharacterDetails = {} as peopleDTO;
  public filmsList: filmResultDTO[] = [];


  constructor(public httpServices: HttpService,
    public helperServices: HelperService,
    private store: Store,
    private route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.peopleId = Number(this.route?.snapshot?.paramMap?.get('id') || 0);
    if (!!this.peopleId && this.peopleId < 1) {
      this.router?.navigate(['/']);
    } else {
      this.getSetDataFromState();
    }
  }


  getSetDataFromState() {
    const filmsState = this.store.select(state => state?.starWarMoviesList);
    if(!!filmsState) {
      filmsState?.subscribe(response => {
        if (response?.starWarMoviesList?.length === 0) {
          this.getMovieList();
        }
        if (response?.starWarCharactersList?.length === 0) {
          this.getPeopleList();
        } else {
          const peopelList = response?.starWarCharactersList;
          const currFilm = response?.starWarFilmDetails as any;
          const findPeople = peopelList?.find((ele: peopleDTO) => { return this.helperServices.getIdfromUrl(ele?.url) === this.peopleId })
          this.starWarCharacterDetails = findPeople;
          if (!!currFilm && !_.isEmpty(currFilm) ) {
            this.starWarCharacterDetails.currFilm = currFilm;
          }
          if (!!response?.starWarMoviesList) {
            let filmList = response?.starWarMoviesList?.filter((ele: filmResultDTO) => {
              return findPeople?.films?.includes(ele?.url);
            })?.map((ele: filmResultDTO) => { return { id: this.helperServices.getIdfromUrl(ele?.url), name: ele?.title } });
            if (!!filmList && !_.isEmpty(filmList)) {
              this.starWarCharacterDetails.filmList = this.helperServices.removeDuplicates(filmList);
            }
          }
        }
      });
    }

  }
  getPeopleList() {
    this.isLoading = true;
    this.httpServices.getcharacterList().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        let data = response?.results as peopleDTO[];
        if (!!data) {
          this.store.dispatch(new AddCharactersList(data));
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log('api res error ->', err);
      }
    });
  }

  getMovieList() {
    this.isLoading = true;
    this.httpServices.getFilmsList().subscribe({
      next: (response) => {
        this.isLoading = false;
        const data = response as filmsApi;
        data.results = data?.results?.map((item, index) => {
          return { ...item, id: (index + 1), imgPath: `../../assets/movieImages/${index + 1}.jpg` }
        });
        if (data.results?.length > 0) {
          let filmList = data.results?.filter((ele: filmResultDTO) => {
            return this.starWarCharacterDetails?.films?.includes(ele?.url);
          })?.map((ele: filmResultDTO) => {
            return { id: this.helperServices.getIdfromUrl(ele?.url), name: ele?.title }
          });
          const finalList = this.helperServices.removeDuplicates(filmList);
          if(!!finalList && finalList?.length > 0) {
            this.starWarCharacterDetails.filmList = this.helperServices.removeDuplicates(filmList);
            this.store.dispatch(new AddFilmsList(data.results)); 
          }   
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log('api res error ->', err);
      }
    });
  }

  redirectToMovie(id: number) {
    this.router.navigate([`/movie/${id}`]);
  }
}
