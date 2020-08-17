import { Component, OnInit } from '@angular/core';
import { GithubService } from 'common/helpers/github.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Issue } from 'common/models/issue.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-issues-page',
    templateUrl: 'issues-page.component.html'
})

export class IssuesPageComponent implements OnInit {
    isLoading = true;
    issues: Issue[];

    private destroyed = new Subject<void>();

    constructor(
        private githubService: GithubService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.githubService.getIssues().pipe(
            takeUntil(this.destroyed),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe((issues) => {
            this.issues = issues;
        }, () => {
            this.snackBar.open(`Failed to load issues, try to login again`, undefined, {
                duration: 2000,
            });
        });
    }

    updateIssue(issue: Issue, index: number): void {
        this.issues[index] = issue;
    }
}
