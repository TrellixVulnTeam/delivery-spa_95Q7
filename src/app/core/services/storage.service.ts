import { Injectable } from "@angular/core";
import { STORAGE } from "../config/storage";
import { CurrentUser } from "../models/currentUser";

@Injectable()
export class StorageService {

    getCurrentUser() : CurrentUser {
        let usr = localStorage.getItem(STORAGE.currentUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setCurrentUser(obj : CurrentUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE.currentUser);
        }
        else {
            localStorage.setItem(STORAGE.currentUser, JSON.stringify(obj));
        }
    }
}