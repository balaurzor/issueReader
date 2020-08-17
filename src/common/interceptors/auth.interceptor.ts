import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const GIT_CONTENT_HEADER = 'accept_git_content';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        let request = req.clone({
            headers: req.headers.has(GIT_CONTENT_HEADER) ?
                req.headers.set('Accept', 'application/vnd.github.v3+json').delete(GIT_CONTENT_HEADER) :
                req.headers.set('Accept', `application/json`)
        });

        if (request.withCredentials) {
            request = request.clone({
                headers: request.headers.set('Authorization', `token ${localStorage.getItem('access_token')}`)
            });
        }

        // send cloned request with header to the next handler.
        return next.handle(request);
    }
}
