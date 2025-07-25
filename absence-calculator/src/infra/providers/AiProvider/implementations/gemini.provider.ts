import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AxiosInstance } from 'axios';

import { IAiProvider } from 'src/business/providers/ai.provider.interface';

@Injectable()
export class GeminiProvider implements IAiProvider {
  private http: AxiosInstance;
  private genAI: GoogleGenerativeAI;

  constructor(private readonly config: ConfigService) {
    const gemini_api_key = config.get<string>('GEMINI_API_KEY');

    this.genAI = new GoogleGenerativeAI(gemini_api_key!);
  }

  async extractClasses(
    buffer: Buffer,
    mime_type: string,
  ): Promise<Record<string, string>> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([
      {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType: mime_type,
        },
      },
      {
        text: `Extraia as aulas de um documento ou imagem, agrupe as aulas pelo nome e retorne os dados em formato JSON sem a formatação markdown.

          Se houver uma ou mais aulas, retorne um array de objetos com essas propriedades:
          [
            {
              "<Nome da aula>": [
                {
                  "week_day": "[MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY]"
                  "start_time": "<Apenas o horário de começo da aula no formato ISO>"
                  "end_time": "<Apenas o horário de término da aula no formato ISO>"
                }
              ]
            },
          ]

          Se não houver nenhuma aulas, retorne um array vazio:
          []

          Se não for possível extrair as aulas, retorne um objeto com essa propriedade:
          {
            "error": "<Causa do erro>"
          }
        `,
      },
    ]);

    const response = JSON.parse(result.response.text());

    return response as unknown as Record<string, string>;
  }

  async extractHolidays(
    buffer: Buffer,
    mime_type: string,
  ): Promise<Record<string, string>> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([
      {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType: mime_type,
        },
      },
      {
        text: `Extraia os feriados de um documento ou imagem e retorne os dados em formato JSON sem a formatação markdown.

          Se houver um ou mais feriados, retorne um array de objetos com essas propriedades:
          [
            {
              "description": "<Nome ou descrição do feriado>",
              "date": "<Data do feriado no formato ISO>"
            },
          ]

          Se não houver nenhum feriado, retorne um array vazio:
          []

          Se não for possível extrair os feriados, retorne um objeto com essa propriedade:
          {
            "error": "<Causa do erro>"
          }
        `,
      },
    ]);

    const response = JSON.parse(result.response.text());

    return response as unknown as Record<string, string>;
  }
}
