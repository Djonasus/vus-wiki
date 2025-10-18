import { Component, inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { PdfThumbnailerService } from "../../../../shared/services/pdf-thumbnailer.service";
import { CommonModule } from "@angular/common";
import { Book } from "../../../../shared/services/category.service";

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
    ]
})
export class BookComponent implements OnChanges {
    @Input() pdfUrl!: string;
    thumbDataUrl: string | null = null;

    @Input() bookId!: number;

    @Input() categoryId!: number;

    @Input() book!: Book;

    private readonly thumbService = inject(PdfThumbnailerService);

    ngOnChanges(changes: SimpleChanges) {
        if (changes['pdfUrl'] && this.pdfUrl) {
        this.thumbDataUrl = null;
        this.thumbService.renderThumbnail(this.pdfUrl)
            .then(dataUrl => this.thumbDataUrl = dataUrl)
            .catch(() => this.thumbDataUrl = null);
        }
    }
}