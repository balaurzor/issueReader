import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { clientId, clientSecret } from 'environments/github';
import { Router } from '@angular/router';

@Injectable()
export class GithubService {
    private accessToken: string;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.accessToken = localStorage.getItem('access_token');
    }

    login(username: string): Observable<void> {
        return this.http.get<any>(`/git/login/oauth/authorize`, { params: {
            client_id: clientId,
            redirect_uri: 'http://localhost:4200/authorize',
            login: username
        }});
    }

    authorize(code: string): Observable<void> {
        return this.http.post<any>(`/git/login/oauth/access_token`, {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: 'http://localhost:4200/authorize'
        }, {
            headers: new HttpHeaders({
                Accept: 'application/json'
            })
        }).pipe(
            tap(({ access_token }) => {
                this.accessToken = access_token;
                localStorage.setItem('access_token', access_token);

                this.router.navigate(['/issues']);
            })
        );
    }

    getIssues(): Observable<any> {
        return this.http.get<any>(`/git/issues`, {
            headers: new HttpHeaders({Authorization: `token ${this.accessToken}` })
        });
    }

    getProfile(): Observable<any> {
        const headers = new HttpHeaders({Authorization: `token${this.accessToken}` }); // ... Set content type to JSON

        return this.http.get('https://api.github.com/user', {
            headers
        }).pipe(
            map((res) => {
                console.log(res);
                return res;
            })
        );
    }
}
