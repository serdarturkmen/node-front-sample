import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {EmailService} from './services/email.service';
import {Email, IEmail} from './model/email.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sample-front';

  constructor(public translateService: TranslateService, private emailService: EmailService) {
    this.translateService.setDefaultLang('de');
    this.translateService.use('de');
  }

  ngOnInit(): void {
    const email: IEmail = new Email();
    email.from = 'Caglar Turkurka  <caglarturkurka@gmail.com>';
    email.to = 'caglar.turkurka@codenorm.de';
    email.subject = 'Dating Project Error';
    email.text = 'Dating Project Image error training';
    this.emailService.sendEmail(email).subscribe(value => {
      console.log(value);
    }, error1 => {
      console.log(error1);
    });
  }
}
