import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user: any = null;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.fireAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.user !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }

  // Returns
  get currentUserObservable(): Observable<firebase.User> {
    return this.fireAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.user.uid : null;
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.user.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.user) {
      return 'Guest';
    } else if (this.currentUserAnonymous) {
      return 'Anonymous';
    } else {
      return this.user['displayName'] || 'User without a Name';
    }
  }

  //// Email/Password Auth ////
  public async login(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.user = user;
        this.router.navigate(['/', 'admin']);
      });
  }

  public logout(): void {
    this.fireAuth.auth.signOut().then(() => {
      this.router.navigate(['/', 'login']);
    });
  }
}
