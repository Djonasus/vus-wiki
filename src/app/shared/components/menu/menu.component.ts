import { ChangeDetectorRef, Component, effect, inject, OnInit } from "@angular/core";
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import { Category, CategoryService } from "../../services/category.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    // standalone: true,
    imports: [
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
    ]
})
export class MenuComponent implements OnInit {
    
    private readonly catService = inject(CategoryService);
    private readonly changeDet = inject(ChangeDetectorRef);

    public categories: Category[] = [];

    constructor() {
        effect(() => {
            if (this.catService.categories$().length > 0) {
                this.categories = this.catService.categories$();
                this.changeDet.detectChanges();
            }
        });
    }

    public isMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    public ngOnInit(): void {
        this.catService.loadBooks();
    }
}