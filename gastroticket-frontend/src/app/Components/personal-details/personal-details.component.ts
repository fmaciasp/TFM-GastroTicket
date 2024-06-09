import { Component } from '@angular/core';
import { User } from 'src/app/Services/auth/user';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {

  errorMessage: String="";
  user?: User;

  constructor(private userService: UserService){
    this.userService.getUser(103).subscribe({
      next: (userData) => {
        this.user=userData;
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data ok");
      }
    })
  }

}
