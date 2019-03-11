import {AuthService, SocialUser} from 'angularx-social-login';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './face-login.component.html'
})
export class FaceLoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
