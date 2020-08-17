import { IssuesPageComponent } from './issues-page.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IssueComponentMock } from 'user/components/issue/issue.component.mock';
import { GithubService } from 'common/helpers/github.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Issue } from 'common/models/issue.model';
import moment from 'moment';

describe('Value date tenor selector component', () => {
    let component: IssuesPageComponent;
    let fixture: ComponentFixture<IssuesPageComponent>;
    let fakeGithubService: jasmine.SpyObj<GithubService>;
    let fakeMatSnackBar: jasmine.SpyObj<MatSnackBar>;

    const issues: Issue[] = [
        new Issue({
            id: 131,
            closed_at: moment().toISOString(),
            title: 'TItle 1',
            number: 1,
            user: {
                login: 'Lau'
            }
        }),
        new Issue({
            id: 131,
            closed_at: moment().toISOString(),
            title: 'TItle 1',
            number: 1,
            user: {
                login: 'Lau'
            }
        })
    ];

    beforeEach(async(() => {
        fakeGithubService = jasmine.createSpyObj<GithubService>('GithubService', ['getIssues']);
        fakeMatSnackBar = jasmine.createSpyObj<MatSnackBar>('c', ['open']);

        TestBed.configureTestingModule({
            declarations: [
                IssuesPageComponent,
                IssueComponentMock
            ],
            providers: [
                { provide: GithubService, useValue: fakeGithubService },
                { provide: MatSnackBar, useValue: fakeMatSnackBar }
            ]
        }).compileComponents();
    }));

    function createComponent(): void {
        fixture = TestBed.createComponent(IssuesPageComponent);
        component = fixture.componentInstance;
    }

    it('SHOULD load all issues provided', () => {
        fakeGithubService.getIssues.and.callFake(() => of(issues));

        createComponent();

        expect(component.isLoading).toBe(true);

        fixture.detectChanges();

        expect(component.issues.length).toEqual(2);
        expect(component.isLoading).toBe(false);
        expect(fakeGithubService.getIssues).toHaveBeenCalledWith();
    });

    it('SHOULD show error when fetch fails', () => {
        fakeGithubService.getIssues.and.callFake(() => throwError('err'));

        createComponent();
        fixture.detectChanges();

        expect(component.issues).toBeUndefined();
        expect(fakeMatSnackBar.open).toHaveBeenCalledWith(`Failed to load issues, try to login again`, undefined, {
            duration: 2000,
        });
    });
});
