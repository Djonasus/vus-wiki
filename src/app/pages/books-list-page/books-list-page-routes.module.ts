import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BooklistComponent } from "./components/booklist/booklist.component";
import { BookDetailComponent } from "./components/book-detail/book-detail.component";

const routes: Routes = [
    {
        path: ':category',
        component: BooklistComponent
    },
    {
        path: ':category/:book',
        component: BookDetailComponent
    },
    {
        path: '**',
        component: BooklistComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class BooksListPageRoutesModule {}