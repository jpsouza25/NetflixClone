import { Component, OnInit } from '@angular/core';
import { IonTitle, IonHeader, IonToolbar, IonContent } from "@ionic/angular/standalone";

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
    imports: [IonTitle, IonHeader, IonToolbar, IonContent],
})
export class NewsPage implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
