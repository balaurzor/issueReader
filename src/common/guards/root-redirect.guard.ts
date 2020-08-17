import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GithubService } from 'common/helpers/github.service';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class RootRedirectGuard implements CanActivate {
    constructor(
        private githubService: GithubService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.githubService.getProfile().pipe(
            switchMap(() => {
                this.router.navigate(['/user', 'issues']);
                return of(true);
            }),
            catchError(() => {
                this.router.navigate(['/home']);
                return of(false);
            })
        );
    }
}
