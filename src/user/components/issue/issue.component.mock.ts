import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Issue } from 'common/models/issue.model';

@Component({
    selector: 'app-issue',
    template: ''
})

export class IssueComponentMock {
    @Input() issue: Issue;
    @Output() issueChange = new EventEmitter<Issue>();
}
