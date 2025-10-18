import { Injectable, OnInit, signal } from "@angular/core";

export interface Book {
    title: string;
    author: string;
    path: string;
}

export interface Category {
    name: string;
    books: Book[];
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    public categories$ = signal<Category[]>([]);

    public loadBooks(): void {
        fetch('/assets/navigation.json').then(async (response) => {this.categories$.set(await response.json())});        
    }
}