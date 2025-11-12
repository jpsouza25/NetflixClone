import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamesPageRoutingModule } from './games-routing.module';

import { GamesPage } from './games.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GamesPageRoutingModule
    ],

})
export class GamesPageModule { }
