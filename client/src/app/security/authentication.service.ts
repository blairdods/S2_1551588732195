/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://beta.skaffolder.com/#!/register?friend=5c7b5d0a8cc2881127fbfb10
*
* You will get 10% discount for each one of your friends
* 
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/s2_db/user';
import { store } from 'src/app/security/current-user';
import { SecurityService } from 'src/app/security/services/security.service';
import { Router } from '@angular/router';

/**
 * This service manage the Authentication
 */
@Injectable()
export class AuthenticationService {
    constructor(
        private securityService: SecurityService,
        private router: Router,
    ) { }

    /**
     * Get the logged user
     */
    public getUser(): Observable<User> {
        return new Observable<User>((ob: any) => {

            // Get JWT token from browser storage
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');

            // Get user from store
            store.currentUser$.subscribe(user => {
                if (token && user) {
                    // User logged and stored token
                    ob.next(user);
                } else if (token && !user) {
                    // If refresh page and have token but not logged user
                    // Verify token and get user
                    this.securityService.verifyToken(token).subscribe(
                        usr => {
                            if (!usr || (!usr._id && !usr.success)) {
                                ob.next(undefined);
                            } else {
                                ob.next(usr);
                            }
                        }
                    );
                } else {
                    // Logged user
                    ob.next(user);
                }
            });
        });
    }

    /**
     * Logout function
     */
    logout() {
        // Clear token and remove user from local storage to log user logout
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        store.setUser(null);
        this.router.navigate(['/login']);
    }

}