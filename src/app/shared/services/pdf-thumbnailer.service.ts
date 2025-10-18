import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = '/assets/pdfjs.worker.js';

const devMode: boolean = false;

function debugLog(...args: any[]) {
  if (devMode) {
    console.log(...args);
  }
}

@Injectable({ providedIn: 'root' })
export class PdfThumbnailerService {
  // Кэш для уже сгенерированных превью
  private cache = new Map<string, string>();

    private readonly http = inject(HttpClient);

  /**
   * Рендерит первую страницу PDF в DataURL
   */
  async renderThumbnail(pdfUrl: string, width = 150): Promise<string> {
    if (this.cache.has(pdfUrl)) {
        debugLog('[ThumbService] Берём из кэша:', pdfUrl);
        return this.cache.get(pdfUrl)!;
    }

    debugLog('[ThumbService] Начинаем загрузку PDF:', pdfUrl);
    try {
      // 1) Получаем бинарник PDF через HttpClient
      const arrayBuffer = await this.http
        .get(pdfUrl, { responseType: 'arraybuffer' })
        .toPromise();
        debugLog('[ThumbService] Данные загружены, bytes:', (arrayBuffer as ArrayBuffer).byteLength);

      // 2) Загружаем документ
      const loadingTask = getDocument({ data: arrayBuffer });
      debugLog('[ThumbService] Задача PDF.js инициализирована');

      const pdf: PDFDocumentProxy = await loadingTask.promise;
      debugLog('[ThumbService] PDF загружен, страниц:', pdf.numPages);

      // 3) Рендерим первую страницу
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const scale = width / viewport.width;
      const scaled = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.width = scaled.width;
      canvas.height = scaled.height;
      const ctx = canvas.getContext('2d')!;
      await page.render({ canvasContext: ctx, viewport: scaled }).promise;
      debugLog('[ThumbService] Страница отрендерена, размер:', canvas.width, '×', canvas.height);

      const dataUrl = canvas.toDataURL();
      this.cache.set(pdfUrl, dataUrl);
      return dataUrl;

    } catch (err) {
      console.error('[ThumbService] Ошибка при загрузке/рендере PDF:', err);
      throw err;
    }
  }
}
