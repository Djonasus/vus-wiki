import { ChangeDetectorRef, Component, effect, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Book, Category, CategoryService } from "../../../../shared/services/category.service";
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss'],
    imports: [
        NgxExtendedPdfViewerModule,
        CommonModule
    ]
})
export class BookDetailComponent {

    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly catService = inject(CategoryService);
    private readonly changeDet = inject(ChangeDetectorRef);

    public bookId: number = this.activatedRoute.snapshot.params['book'] || 0;
    public categoryId: number = this.activatedRoute.snapshot.params['category'] || 0;

    public book?: Book;

    constructor() {
        effect(() => {
            if (this.catService.categories$().length > 0) {
                this.book = this.catService.categories$()[this.categoryId].books[this.bookId];
                if (!this.book) {
                    this.changeDet.detectChanges();
                }
            }
        });
    }
}