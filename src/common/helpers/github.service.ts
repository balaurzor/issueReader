import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { clientId, clientSecret } from 'environments/github';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Issue, IIssue } from 'common/models/issue.model';

export enum GIT_ISSUE_FILTER {
    ASSIGNED = 'assigned',
    CREATED = 'created',
    MENTIONED = 'mentioned',
    SUBSCRIBED = 'subscribed',
    ALL = 'all'
}

export enum ISSUE_STATE {
    ALL = 'all',
    OPEN = 'open',
    CLOSED = 'closed'
}

@Injectable()
export class GithubService {
    private GIT_HEADER = new HttpHeaders({
        accept_git_content: 'true'
    });

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject('window') private window: Window
    ) {}

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
        }).pipe(
            tap(({ access_token }) => {
                localStorage.setItem('access_token', access_token);

                this.router.navigate(['/user', 'issues']);
            })
        );
    }

    getIssues(filter: GIT_ISSUE_FILTER = GIT_ISSUE_FILTER.ALL): Observable<any> {
        return this.http.get<any>(`${environment.git_api_url}/user/issues`, {
            headers: this.GIT_HEADER,
            withCredentials: true,
            params: {
                filter,
                state: ISSUE_STATE.ALL
            }
        }).pipe(
            map((issues) => issues.map(issue => new Issue(issue)))
        );
    }

    toggleIssueState(state: ISSUE_STATE, issueNumber: string): Observable<Issue> {
        return this.http.patch(`${environment.git_api_url}/repos/balaurzor/issueReader/issues/${issueNumber}`, {
            state
        }, {
            withCredentials: true,
            headers: this.GIT_HEADER
        }).pipe(
            map((issue: IIssue) => new Issue(issue))
        );
    }

    getProfile(): Observable<any> {
        return this.http.get(`${environment.git_api_url}/user`, {
            withCredentials: true,
            headers: this.GIT_HEADER
        }).pipe(
            map((res) => {
                return res;
            })
        );
    }
}
