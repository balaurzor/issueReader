import { Component, OnInit } from '@angular/core';
import { GithubService } from 'public/helpers/github.service';
import { ActivatedRoute } from '@angular/router';

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
