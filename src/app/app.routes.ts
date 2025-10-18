import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/books-list-page/books-list-page.module').then(m => m.BooksListPageModule)
    }
];
