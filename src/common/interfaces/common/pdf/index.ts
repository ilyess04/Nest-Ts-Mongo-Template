import { PaperFormat } from 'puppeteer';

interface IGeneratePdf {
  context: Record<string, any>;
  templateHbs: string;
  format?: PaperFormat;
}
export type { IGeneratePdf };
