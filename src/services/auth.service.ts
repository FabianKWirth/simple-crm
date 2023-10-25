import { Injectable, OnDestroy, inject } from "@angular/core";
import { Auth, idToken } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Subscription } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class FirebaseAuth implements OnDestroy {
    private auth: any = inject(Auth);
    idToken$ = idToken(this.auth);
    refreshToken: string = "";
    idTokenSubscription: Subscription;

    authType: string = "login";

    showMessage: Boolean = false;
    message: string = "";
    messageType: string = "";

    constructor() {

    }

    register(email, password) {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
                    //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
                    this.refreshToken = token;
                })
            })
            .catch((error) => {
                this.showFailedRegisterMessage();
                const errorCode = error.code;
                const errorMessage = error.message;
            });

            this.authType="login";
    }

    login(email, password) {

        let failed = 0;
        signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
                    //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
                    this.refreshToken = token;
                    this.showSuccessLoginMessage();
                })
            })
            .catch((error) => {
                this.showFailedLoginMessage();
            });


    }

    logout() {
        this.idTokenSubscription.unsubscribe();
        this.refreshToken=null;
        this.showSuccessLogoutMessage();
    }

    showSuccessLogoutMessage(){
        this.showMessage = true;
        this.message = "Logout erfolgreich";
        this.messageType = "success";
        setTimeout(() => {
            this.showMessage = false;
        }, 4000);
    }

    showSuccessLoginMessage(){
        this.showMessage = true;
        this.message = "Logout erfolgreich";
        this.messageType = "success";
        setTimeout(() => {
            this.showMessage = false;
        }, 4000);
    }

    showFailedLoginMessage(){
        this.showMessage = true;
        this.message = "Login failed";
        this.messageType = "error";
        setTimeout(() => {
            this.showMessage = false;
        }, 4000);
    }


    showFailedRegisterMessage(){
        this.showMessage = true;
        this.message = "Registration failed. Please check wether you already have an account with this address registered";
        this.messageType = "error";
        setTimeout(() => {
            this.showMessage = false;
        }, 4000);
    }



    ngOnDestroy() {
        // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
        this.idTokenSubscription.unsubscribe();
        this.refreshToken=null;
    }
}