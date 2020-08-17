import { Component, OnInit } from '@angular/core';
import { GithubService } from 'common/helpers/github.service';

@Component({
    selector: 'app-home-page',
    templateUrl: 'home-page.component.html'
})

export class HomePageComponent implements OnInit {
    constructor(
        private githubService: GithubService
    ) {}

    ngOnInit(): void {
        this.githubService.getIssues().subscribe();
    }
}
