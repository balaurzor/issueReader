import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { clientId, clientSecret } from 'environments/github';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

export enum GIT_ISSUE_FILTER {
    ASSIGNED = 'assigned',
    CREATED = 'created',
    MENTIONED = 'mentioned',
    SUBSCRIBED = 'subscribed',
    ALL = 'all'
}

@Injectable()
export class GithubService {
    private accessToken: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject('window') private window: Window
    ) {
        this.accessToken = localStorage.getItem('access_token');
    }

    login(username: string): Observable<void> {
        const params = {
            client_id: clientId,
            redirect_uri: `${environment.redirect_uri}/authorize`,
            login: username,
            scope: ['public_repo'].join(',')
        };

        const queryParams = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        this.window.location.href = `https://github.com/login/oauth/authorize?${queryParams}`;

        return of(undefined);
    }

    authorize(code: string): Observable<void> {
        return this.http.post<any>(`/login/oauth/access_token`, {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: `${environment.redirect_uri}/authorize`
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

    getIssues(filter: GIT_ISSUE_FILTER = GIT_ISSUE_FILTER.ALL): Observable<any> {
        return this.http.get<any>(`${environment.git_api_url}/user/issues`, {
            headers: new HttpHeaders({Authorization: `token ${this.accessToken}`, Accept: 'application/vnd.github.v3+json' }),
            params: {
                filter
            }
        });
    }

    getProfile(): Observable<any> {
        const headers = new HttpHeaders({Authorization: `token ${this.accessToken}` }); // ... Set content type to JSON

        return this.http.get(`${environment.git_api_url}/user`, {
            headers
        }).pipe(
            map((res) => {
                return res;
            })
        );
    }
}
