import { InductionRecord } from '../types/induction';

export const INDUCTION_SHEET_TITLE = 'Registro de Inducción Aprendices - SENA';
export const DEFAULT_SHEET_NAME = 'Registro_Aprendices';

export interface SpreadsheetInfo {
  id: string;
  name: string;
  webViewLink: string;
}

export const HEADERS = [
  'Fecha y Hora',
  'Nombre Completo',
  'Tipo Documento',
  'Número Documento',
  'Programa de Formación',
  'Ficha',
  'Regional',
  'Centro de Formación',
  'Módulos Completados',
  'Progreso (%)',
  'Evaluación Aprobada',
  'Calificación Examen (%)',
  'Estado',
  'Código Verificación',
];

/**
 * Searches user's Google Drive for existing induction spreadsheet, or creates a new stylized one.
 */
export async function findOrCreateInductionSpreadsheet(
  accessToken: string
): Promise<SpreadsheetInfo> {
  const query = encodeURIComponent(
    `name = '${INDUCTION_SHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`
  );

  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)&pageSize=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!searchRes.ok) {
    if (searchRes.status === 401) {
      throw new Error('AUTH_EXPIRED');
    }
    const errText = await searchRes.text();
    throw new Error(`Error al buscar en Google Drive: ${errText}`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    const file = searchData.files[0];
    return {
      id: file.id,
      name: file.name,
      webViewLink:
        file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
    };
  }

  // File not found; create a new spreadsheet with SENA styling
  const createPayload = {
    properties: {
      title: INDUCTION_SHEET_TITLE,
    },
    sheets: [
      {
        properties: {
          title: DEFAULT_SHEET_NAME,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: HEADERS.map((header) => ({
                  userEnteredValue: { stringValue: header },
                  userEnteredFormat: {
                    backgroundColor: {
                      red: 0.223, // SENA Green (#39A900)
                      green: 0.662,
                      blue: 0.0,
                    },
                    textFormat: {
                      foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                      bold: true,
                      fontSize: 10,
                    },
                    horizontalAlignment: 'CENTER',
                  },
                })),
              },
            ],
          },
        ],
      },
    ],
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createPayload),
  });

  if (!createRes.ok) {
    if (createRes.status === 401) {
      throw new Error('AUTH_EXPIRED');
    }
    const errText = await createRes.text();
    throw new Error(`Error al crear la hoja de cálculo en Drive: ${errText}`);
  }

  const createData = await createRes.json();
  const spreadsheetId = createData.spreadsheetId;

  // Retrieve webViewLink from Drive API for the newly created file
  let webViewLink = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  try {
    const fileRes = await fetch(
      `https://www.googleapis.com/drive/v3/files/${spreadsheetId}?fields=webViewLink`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      if (fileData.webViewLink) {
        webViewLink = fileData.webViewLink;
      }
    }
  } catch {
    // Fallback to direct URL
  }

  return {
    id: spreadsheetId,
    name: INDUCTION_SHEET_TITLE,
    webViewLink,
  };
}

/**
 * Gets the primary sheet title from the spreadsheet metadata.
 */
async function getFirstSheetName(accessToken: string, spreadsheetId: string): Promise<string> {
  const metaRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!metaRes.ok) {
    if (metaRes.status === 401) throw new Error('AUTH_EXPIRED');
    return DEFAULT_SHEET_NAME;
  }

  const metaData = await metaRes.json();
  const sheets = metaData.sheets || [];
  if (sheets.length > 0 && sheets[0]?.properties?.title) {
    return sheets[0].properties.title;
  }
  return DEFAULT_SHEET_NAME;
}

/**
 * Reads all registered apprentices from the Google Sheet.
 */
export async function fetchSpreadsheetRecords(
  accessToken: string,
  spreadsheetId: string
): Promise<InductionRecord[]> {
  const sheetName = await getFirstSheetName(accessToken, spreadsheetId);
  const range = encodeURIComponent(`'${sheetName}'!A2:N`);

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    if (res.status === 401) throw new Error('AUTH_EXPIRED');
    const errText = await res.text();
    throw new Error(`Error al leer registros de la hoja: ${errText}`);
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];

  return rows.map((row, index) => {
    const registeredAt = row[0] || '';
    const fullName = row[1] || '';
    const documentType = row[2] || '';
    const documentNumber = row[3] || '';
    const trainingProgram = row[4] || '';
    const ficheNumber = row[5] || '';
    const regional = row[6] || '';
    const trainingCenter = row[7] || '';
    const modulesStr = row[8] || '0';
    const progressStr = row[9] || '0%';
    const passedStr = row[10] || 'NO';
    const scoreStr = row[11] || '0%';
    const status = (row[12] || 'En Curso') as 'Completada' | 'En Curso' | 'Certificada';
    const verificationCode = row[13] || '';

    const completedCount = parseInt(modulesStr.split(' ')[0], 10) || 0;
    const progressPercent = parseInt(progressStr.replace('%', ''), 10) || 0;
    const isExamPassed = passedStr.trim().toUpperCase() === 'SÍ' || passedStr.trim().toUpperCase() === 'SI';
    const examScore = parseInt(scoreStr.replace('%', ''), 10) || 0;

    return {
      id: `row-${index + 2}`,
      registeredAt,
      fullName,
      documentType,
      documentNumber,
      trainingProgram,
      ficheNumber,
      regional,
      trainingCenter,
      completedModulesCount: completedCount,
      totalModulesCount: 7,
      progressPercent,
      isExamPassed,
      examScore,
      status,
      verificationCode,
    };
  });
}

/**
 * Appends a new apprentice record to the user's Google Sheet.
 */
export async function appendApprenticeRecord(
  accessToken: string,
  spreadsheetId: string,
  record: InductionRecord
): Promise<void> {
  const sheetName = await getFirstSheetName(accessToken, spreadsheetId);
  const range = encodeURIComponent(`'${sheetName}'!A:N`);

  const rowValues = [
    record.registeredAt,
    record.fullName,
    record.documentType,
    record.documentNumber,
    record.trainingProgram,
    record.ficheNumber,
    record.regional,
    record.trainingCenter,
    `${record.completedModulesCount} de ${record.totalModulesCount}`,
    `${record.progressPercent}%`,
    record.isExamPassed ? 'SÍ' : 'NO',
    `${record.examScore}%`,
    record.status,
    record.verificationCode,
  ];

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    }
  );

  if (!res.ok) {
    if (res.status === 401) throw new Error('AUTH_EXPIRED');
    const errText = await res.text();
    throw new Error(`Error al registrar en Google Sheets: ${errText}`);
  }
}
