import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GithubService } from 'public/helpers/github.service';

@Component({
    selector: 'app-login-form',
    templateUrl: 'login-form.component.html',
    host: {
        '[class.login-form]': 'true'
    }
})

export class LoginFormComponent {
    error?: string;
    form: FormGroup = new FormGroup({
        username: new FormControl('balaurzor')
    });

    constructor(
        private githubService: GithubService
    ) { }

    submit(): void {
        if (this.form.valid) {
            this.githubService.login(this.form.value.username).subscribe();
        }
    }
}
