import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Implement login logic here
    // e.g., call an authentication service to submit credentials
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

  constructor() { }

  ngOnInit() { }
}
