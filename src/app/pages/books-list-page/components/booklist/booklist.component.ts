import { ChangeDetectorRef, Component, effect, inject, OnInit } from "@angular/core";
import { Category, CategoryService } from "../../../../shared/services/category.service";
import { BookComponent } from "../book/book.component";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-booklist',
    templateUrl: './booklist.component.html',
    styleUrls: ['./booklist.component.scss'],
    imports: [
        BookComponent
    ],
})
export class BooklistComponent  {

    private readonly catService = inject(CategoryService);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly changeDet = inject(ChangeDetectorRef);

    public categories: Category[] = [];
    public currentCategory: number = this.activatedRoute.snapshot.params['category'] || 0;

    constructor() {        
        effect(() => {
            if (this.catService.categories$().length > 0 ) {                
                this.categories = this.catService.categories$();
                this.changeDet.detectChanges();                                
            }
        });
    }
}