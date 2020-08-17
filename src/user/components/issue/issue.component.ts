import { Component, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Issue } from 'common/models/issue.model';
import { GithubService, ISSUE_STATE } from 'common/helpers/github.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-issue',
    templateUrl: 'issue.component.html'
})

export class IssueComponent implements OnDestroy {
    @Input() issue: Issue;
    @Output() issueChange = new EventEmitter<Issue>();

    isLoading: boolean;
    ISSUE_STATE = ISSUE_STATE;

    private destroyed = new Subject<void>();

    constructor(
        private githubService: GithubService,
        private snackBar: MatSnackBar
    ) {}

    toggleIssue(state: ISSUE_STATE): void {
        this.isLoading = true;
        this.githubService.toggleIssueState(state, this.issue.number.toString()).pipe(
            takeUntil(this.destroyed),
            finalize(() => this.isLoading = false)
        ).subscribe((issue) => {
            this.issueChange.emit(issue);
            this.snackBar.open(`Issues has been ${state}`, undefined, {
                duration: 2000,
              });
        });
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
