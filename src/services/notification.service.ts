import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    showMessage: Boolean = false;
    message: string = "";
    messageType: string = "";





    showDealAddedMessage() {
        this.showMessage = true;
        this.message = "Deal Added";
        this.messageType = "success";
        setTimeout(() => {
            this.showMessage = false;
        }, 2000);
    }

    showDealEditedMessage() {
        this.showMessage = true;
        this.message = "Deal Edited";
        this.messageType = "success";
        setTimeout(() => {
            this.showMessage = false;
        }, 2000);
    }

    showDealDeleteMessage() {
        this.showMessage = true;
        this.message = "Deal deleted";
        this.messageType = "success";
        setTimeout(() => {
            this.showMessage = false;
        }, 2000);
    }

    showUserAddedMessage() {
        this.showMessage = true;
        this.message = "User Added";
        this.messageType = "success";
        setTimeout(() => {
            this.showMessage = false;
        }, 2000);
    }

    showUserEditedMessage() {
        this.showMessage = true;
        this.message = "User Edited";
        this.messageType = "success";
        setTimeout(() => {
            this.showMessage = false;
        }, 2000);
    }

    showUserDeleteMessage() {
        this.showMessage = true;
        this.message = "User deleted";
        this.messageType = "success";
        setTimeout(() => {
            this.showMessage = false;
        }, 2000);
    }



}