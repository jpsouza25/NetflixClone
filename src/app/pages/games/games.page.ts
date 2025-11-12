import { Component, OnInit } from '@angular/core';
import { IonToolbar, IonTitle, IonHeader, IonContent } from "@ionic/angular/standalone";

@Component({
    selector: 'app-games',
    templateUrl: './games.page.html',
    styleUrls: ['./games.page.scss'],
    imports: [IonToolbar, IonTitle, IonHeader, IonContent]
})
export class GamesPage implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
