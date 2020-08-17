import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'common/helpers/github.service';

@Component({
    selector: 'app-authorize-page',
    template: ''
})

export class AuthorizePageComponent implements OnInit {
    constructor(
        private githubService: GithubService,
        private routeParams: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const code = this.routeParams.snapshot.queryParamMap.get('code');

        if (code) {
            this.githubService.authorize(code).subscribe();
        }
    }
}
