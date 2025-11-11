import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { IonicModule, IonTabs } from "@ionic/angular";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [IonicModule],
})
export class TabsPage implements OnInit {

  @ViewChild(IonTabs) tabs?: IonTabs

  constructor() { }

  ngOnInit() {
  }

}
