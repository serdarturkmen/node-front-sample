import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample-front';

  constructor(public translateService: TranslateService) {
    this.translateService.setDefaultLang('de');
    this.translateService.use('de');
  }
}
