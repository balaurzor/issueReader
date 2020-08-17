import { GithubService } from './github.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { IIssue, Issue } from 'common/models/issue.model';
import moment from 'moment';

describe('GithubService', () => {
    let instance: GithubService;
    let fakeHttpClient: jasmine.SpyObj<HttpClient>;
    let fakeRouter: jasmine.SpyObj<Router>;
    let fakeStorage: jasmine.SpyObj<Storage>;
    let fakeWindow: Window;

    beforeEach(() => {
        fakeHttpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'patch']);
        fakeRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
        fakeStorage = jasmine.createSpyObj<Storage>('Storage', ['getItem', 'setItem']);

        fakeWindow = {
            location: {
                href: ''
            },
            localStorage: fakeStorage
        } as any;

        instance = new GithubService(fakeHttpClient, fakeRouter, fakeWindow);
    });

    it('SHOULD redirect to login with github', () => {
        instance.login('test_user');
        const params = {
            client_id: '276498138670bcb62aa6',
            redirect_uri: `http://localhost:4200/authorize`,
            login: 'test_user',
            scope: 'public_repo'
        };

        const queryParams = Object.keys(params).map(key => key + '=' + params[key]).join('&');

        expect(fakeWindow.location.href).toEqual(`https://github.com/login/oauth/authorize?${queryParams}`);
    });

    it('SHOULD swap code for access token and store it', fakeAsync(() => {
        fakeHttpClient.post.and.callFake(() => of({access_token: 'token'} as any));
        instance.authorize('code_received').subscribe();
        tick(1);

        expect(fakeHttpClient.post).toHaveBeenCalledWith(`/login/oauth/access_token`, {
            client_id: jasmine.any(String),
            client_secret: jasmine.any(String),
            code: 'code_received',
            redirect_uri: jasmine.any(String)
        });
        expect(fakeWindow.localStorage.setItem).toHaveBeenCalledWith('access_token', 'token');
        expect(fakeRouter.navigate).toHaveBeenCalledWith(['/user', 'issues']);
    }));

    it('SHOULD map returned issues to model', fakeAsync(() => {
        let response: any[];
        const issues: IIssue[] = [
            {
                id: 131,
                closed_at: moment().toISOString(),
                title: 'TItle 1',
                number: 1,
                user: {
                    login: 'Lau'
                }
            },
            {
                id: 131,
                closed_at: moment().toISOString(),
                title: 'TItle 1',
                number: 1,
                user: {
                    login: 'Lau'
                }
            }
        ];
        fakeHttpClient.get.and.callFake(() => of(issues as any));

        instance.getIssues().subscribe((i) => response = i);
        tick(1);

        expect(response.length).toEqual(2);
        expect(response[0]).toEqual(jasmine.any(Issue));
    }));
});
