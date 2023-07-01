import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
import { IGeneratePdf } from '../interfaces';

@Injectable()
export class PdfService {
  constructor() {}

  async generatePdf(payload: IGeneratePdf): Promise<Buffer> {
    const { templateHbs, context, format } = payload;
    const templateName = templateHbs.endsWith('.hbs')
      ? templateHbs.slice(0, -4)
      : templateHbs;
    const htmlPath = path.join(
      __dirname,
      `../../../../view/pdf/${templateName}.hbs`,
    );
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const template = handlebars.compile(html);
    const resultHtml = template(context);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(resultHtml);
    const pdf = await page.pdf({ format: format || 'a4' });
    await browser.close();

    return pdf;
  }
}
