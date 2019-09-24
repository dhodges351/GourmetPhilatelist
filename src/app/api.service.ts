import { Injectable, enableProdMode } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { Contact } from './models/contact.model';
import { BlogContent } from './models/blogcontent';
import { Comment } from './models/comment';
import { all } from 'q';
import { User } from './models/user';
import { environment } from './../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiUrl:string = "";
  loginUrl:string = "";
  blogContentUrl:string = "";
  commentUrl = "";

  constructor(private http: HttpClient) {    
    console.log(environment.production); // Logs false for default     
    this.apiUrl = environment.apiUrl;
    console.log(this.apiUrl);
    this.loginUrl = this.apiUrl + '/login';
    this.blogContentUrl = this.apiUrl + '/blogContent';
    this.commentUrl = this.apiUrl + '/comment';
   }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  login(email:string, password:string): Observable<any> {
    return this.http.post<User>(this.loginUrl, {email, password}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }  

  getBlogPosts(): Observable<any> {
    return this.http.get(this.apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getBlogPost(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  postBlogPost(data): Observable<any> {
    return this.http.post(this.apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  updateBlogPost(id: string, data): Observable<any> {    
    return this.http.put(this.apiUrl + '/' + id, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  deleteBlogPost(id: string): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveContact(contact: Contact): Observable<any>{
    return this.http.post(this.apiUrl + '/contact',  
    {
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      subject: contact.subject,
      message: contact.message
    }, 
    httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  } 

  saveBlogContent(data): Observable<any>{
    return this.http.post(this.apiUrl + '/blogContent', data, 
    httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }  

  getAllBlogContent(): Observable<any> {
    return this.http.get(this.apiUrl + '/blogContent', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateBlogContent(id: string, data): Observable<any> {
    return this.http.put(this.apiUrl + '/blogContent/' + id, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  deleteBlogContent(id: string): Observable<{}> {   
    const url = `${this.blogContentUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBlogContentDetails(id: string): Observable<any> {   
    const url = `${this.blogContentUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  saveComment(data): Observable<any>{
    return this.http.post(this.commentUrl, data, 
    httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCommentDetails(id: string): Observable<any> {   
    const url = `${this.commentUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateComment(id: string, data): Observable<any> {
    return this.http.put(this.commentUrl + '/' + id, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  deleteComment(id: string): Observable<{}> {   
    const url = `${this.commentUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getComments(): Observable<any> {
    return this.http.get(this.commentUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
    
}
