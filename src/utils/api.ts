import { REVIEWS_PER_PAGE } from "./constants";
import {
  GetMoviesResponse,
  ImagesResponse,
  MovieDetail,
  ReviewsResponse,
  SeaonsResponse,
  Filters,
  InitialValues,
  InitialVlue,
} from "./types";

const TOKEN = process.env.REACT_APP_API_TOKEN || "";

class MainApi {
  private _baseUrl: string;
  private _headers: Record<string, string>;

  constructor(options: { baseUrl: string; headers: Record<string, string> }) {
    this._baseUrl = options.baseUrl;
    this._headers = {
      ...options.headers,
      "X-API-KEY": TOKEN,
    };
  }

  _getRequestResult(res: Response) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies(
    page: number,
    filters: Filters,
    moviesPerPage: number
  ): Promise<GetMoviesResponse> {
    const queryParams = new URLSearchParams();

    if (filters.year && filters.year.length > 0) {
      filters.year.forEach((year) => {
        queryParams.append("year", year);
      });
    }

    if (filters.country && filters.country.length > 0) {
      filters.country.forEach((country) => {
        queryParams.append("countries.name", country);
      });
    }

    if (filters.genre && filters.genre.length > 0) {
      filters.genre.forEach((genre) => {
        queryParams.append("genres.name", genre);
      });
    }

    if (filters.ageRating && filters.ageRating.length > 0) {
      filters.ageRating.forEach((ageRating) => {
        queryParams.append("ageRating", ageRating);
      });
    }

    return fetch(
      `${this._baseUrl}/v1.4/movie?page=${page}&limit=${moviesPerPage}&${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          ...this._headers,
        },
      }
    ).then((res) => this._getRequestResult(res));
  }

  getMovieById(id: number): Promise<MovieDetail> {
    return fetch(`${this._baseUrl}/v1.4/movie/${id}`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    }).then((res) => this._getRequestResult(res));
  }

  getReviewsByMovieId(id: number, page: number): Promise<ReviewsResponse> {
    return fetch(
      `${this._baseUrl}/v1.4/review?page=${page}&limit=${REVIEWS_PER_PAGE}&movieId=${id}`,
      {
        method: "GET",
        headers: {
          ...this._headers,
        },
      }
    ).then((res) => this._getRequestResult(res));
  }

  getImagesByMovieId(
    id: number,
    page: number,
    imagesPerPage: number
  ): Promise<ImagesResponse> {
    return fetch(
      `${this._baseUrl}/v1.4/image?page=${page}&limit=${imagesPerPage}&movieId=${id}`,
      {
        method: "GET",
        headers: {
          ...this._headers,
        },
      }
    ).then((res) => this._getRequestResult(res));
  }

  getSeasonsByMovieId(
    season: number,
    movieId: number
  ): Promise<SeaonsResponse> {
    return fetch(
      `${this._baseUrl}/v1.4/season?page=${season}&limit=1&selectFields=movieId&selectFields=number&selectFields=name&selectFields=episodes&movieId=${movieId}`,
      {
        method: "GET",
        headers: {
          ...this._headers,
        },
      }
    ).then((res) => this._getRequestResult(res));
  }

  searchMovie(
    keyword: string,
    page: number,
    moviesPerPage: number
  ): Promise<GetMoviesResponse> {
    return fetch(
      `${this._baseUrl}/v1.4/movie/search?page=${page}&limit=${moviesPerPage}&query=${keyword}}`,
      {
        method: "GET",
        headers: {
          ...this._headers,
        },
      }
    ).then((res) => this._getRequestResult(res));
  }

  getInitialValues(field: InitialVlue): Promise<InitialValues[]> {
    return fetch(
      `${this._baseUrl}/v1/movie/possible-values-by-field?field=${field}`,
      {
        method: "GET",
        headers: {
          ...this._headers,
        },
      }
    ).then((res) => this._getRequestResult(res));
  }
}

// Создание экземпляра класса Api
const mainApi = new MainApi({
  baseUrl: "https://api.kinopoisk.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
