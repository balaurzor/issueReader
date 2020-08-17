import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { GithubService } from 'common/helpers/github.service';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    constructor(
        private githubService: GithubService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.isAllowed();
    }

    canLoad(): Observable<boolean> {
        return this.isAllowed();
    }

    isAllowed(): Observable<boolean> {
        return this.githubService.getProfile().pipe(
            switchMap(() => {
                return of(true);
            }),
            catchError(() => {
                this.router.navigate(['home']);
                return of(false);
            })
        );
    }
}
