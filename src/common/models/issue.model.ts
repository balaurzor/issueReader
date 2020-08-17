import { User, IUser } from './user.model';
import moment from 'moment';

export class IIssue {
    id: number;
    title: string;
    user: IUser;
    closed_at: string;
    number: number;
}

export class Issue {
    title: string;
    user: User;
    closedAt: string;
    id: number;
    number: number;

    constructor(issue?: IIssue) {
        if (issue) {
            this.id = issue.id;
            this.closedAt = issue.closed_at;
            this.title = issue.title;
            this.number = issue.number;
            this.user = new User(issue.user);
        }
    }

    get closedAtFormatted(): moment.Moment {
        return moment(this.closedAt);
    }
}
