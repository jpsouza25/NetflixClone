import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NewsPageRoutingModule
    ],
})
export class NewsPageModule { }
