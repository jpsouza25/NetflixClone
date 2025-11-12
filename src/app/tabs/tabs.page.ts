import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { IonTabs, IonTabButton, IonIcon, IonLabel, IonTabBar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { calendar, calendarOutline, gameController, gameControllerOutline, home, homeOutline, person, personOutline } from 'ionicons/icons'

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
    imports: [IonTabButton, IonIcon, IonLabel, IonTabs, IonTabBar],
})
export class TabsPage {

    @ViewChild(IonTabs) tabs?: IonTabs

    constructor() { 
        addIcons({
            home,
            homeOutline,
            gameController,
            gameControllerOutline,
            calendar,
            calendarOutline,
            person,
            personOutline


        })
    }


}
