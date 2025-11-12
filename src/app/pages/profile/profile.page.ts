import { Component, OnInit } from '@angular/core';
import { IonTitle, IonHeader, IonToolbar, IonContent } from "@ionic/angular/standalone";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    imports: [IonTitle, IonHeader, IonToolbar, IonContent],
})
export class ProfilePage implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
