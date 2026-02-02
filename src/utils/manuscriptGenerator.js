// Manuscript Generator using docx library
// Generates Word documents in IMRaD format

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  PageBreak,
  TabStopPosition,
  TabStopType,
  NumberFormat,
  Header,
  Footer,
  PageNumber
} from 'docx';
import { saveAs } from 'file-saver';

/**
 * Generate a manuscript Word document
 * @param {Object} data - Manuscript data
 * @param {string} journalFormat - Journal format ID
 * @returns {Promise<void>}
 */
export async function generateManuscript(data, journalFormat = 'diabetes-care') {
  const styles = getJournalStyles(journalFormat);

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 24 // 12pt
          }
        }
      },
      paragraphStyles: [
        {
          id: 'Title',
          name: 'Title',
          basedOn: 'Normal',
          next: 'Normal',
          run: {
            font: 'Times New Roman',
            size: 32,
            bold: true
          },
          paragraph: {
            spacing: { before: 240, after: 240 },
            alignment: AlignmentType.CENTER
          }
        },
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          next: 'Normal',
          run: {
            font: 'Times New Roman',
            size: 28,
            bold: true
          },
          paragraph: {
            spacing: { before: 360, after: 120 }
          }
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          run: {
            font: 'Times New Roman',
            size: 24,
            bold: true,
            italics: true
          },
          paragraph: {
            spacing: { before: 240, after: 80 }
          }
        },
        {
          id: 'Normal',
          name: 'Normal',
          run: {
            font: 'Times New Roman',
            size: 24
          },
          paragraph: {
            spacing: { after: 200, line: 480 } // Double spacing
          }
        }
      ]
    },
    sections: [{
      properties: {
        page: {
          size: {
            width: 12240, // US Letter width in twips
            height: 15840 // US Letter height in twips
          },
          margin: {
            top: 1440, // 1 inch
            right: 1440,
            bottom: 1440,
            left: 1440
          }
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: data.title.substring(0, 50) + (data.title.length > 50 ? '...' : ''),
                  italics: true,
                  size: 20
                })
              ],
              alignment: AlignmentType.RIGHT
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  children: ['Page ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES],
                  size: 20
                })
              ],
              alignment: AlignmentType.CENTER
            })
          ]
        })
      },
      children: [
        // Title
        new Paragraph({
          style: 'Title',
          children: [new TextRun({ text: data.title, bold: true })]
        }),

        // Authors
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: data.authors,
              italics: true,
              size: 24
            })
          ]
        }),

        // Abstract Heading
        new Paragraph({
          style: 'Heading1',
          children: [new TextRun('Abstract')]
        }),

        // Abstract Text
        ...data.abstract.split('\n\n').map(para =>
          new Paragraph({
            style: 'Normal',
            children: [new TextRun(para.trim())]
          })
        ),

        // Keywords if present
        ...(data.keywords ? [
          new Paragraph({
            spacing: { before: 240, after: 400 },
            children: [
              new TextRun({ text: 'Keywords: ', bold: true }),
              new TextRun(data.keywords.join('; '))
            ]
          })
        ] : []),

        // Page break before main content
        new Paragraph({
          children: [new PageBreak()]
        }),

        // Introduction
        new Paragraph({
          style: 'Heading1',
          children: [new TextRun('Introduction')]
        }),
        ...splitIntoParagraphs(data.sections?.introduction || ''),

        // Methods
        new Paragraph({
          style: 'Heading1',
          children: [new TextRun('Methods')]
        }),
        ...splitIntoParagraphs(data.sections?.methods || ''),

        // Results
        new Paragraph({
          style: 'Heading1',
          children: [new TextRun('Results')]
        }),
        ...splitIntoParagraphs(data.sections?.results || ''),

        // Discussion
        new Paragraph({
          style: 'Heading1',
          children: [new TextRun('Discussion')]
        }),
        ...splitIntoParagraphs(data.sections?.discussion || ''),

        // References
        new Paragraph({
          children: [new PageBreak()]
        }),
        new Paragraph({
          style: 'Heading1',
          children: [new TextRun('References')]
        }),
        ...(data.references || []).map((ref, index) =>
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: `${index + 1}. `,
                bold: true
              }),
              new TextRun(ref.text)
            ]
          })
        ),

        // AI Disclosure
        new Paragraph({
          children: [new PageBreak()]
        }),
        new Paragraph({
          style: 'Heading2',
          children: [new TextRun('AI Assistance Disclosure')]
        }),
        new Paragraph({
          style: 'Normal',
          border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
            left: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
            right: { style: BorderStyle.SINGLE, size: 1, color: '999999' }
          },
          children: [
            new TextRun({
              text: 'This manuscript was drafted with AI assistance using the Medical Affairs AI Scientific Communications Platform. All findings, citations, and statistical claims have been verified against primary sources. Authors are responsible for the accuracy and integrity of all content.',
              italics: true
            })
          ]
        }),

        // Generation timestamp
        new Paragraph({
          spacing: { before: 400 },
          children: [
            new TextRun({
              text: `Generated: ${new Date().toISOString().split('T')[0]}`,
              size: 18,
              color: '666666'
            })
          ]
        })
      ]
    }]
  });

  // Generate and save the document
  const blob = await Packer.toBlob(doc);
  const fileName = `manuscript_${sanitizeFilename(data.title)}_${Date.now()}.docx`;
  saveAs(blob, fileName);

  return fileName;
}

/**
 * Split text into paragraphs
 * @param {string} text - Text to split
 * @returns {Array<Paragraph>} - Array of Paragraph objects
 */
function splitIntoParagraphs(text) {
  if (!text) return [new Paragraph({ style: 'Normal', children: [new TextRun('[Content to be added]')] })];

  return text.split('\n\n').filter(p => p.trim()).map(para =>
    new Paragraph({
      style: 'Normal',
      children: [new TextRun(para.trim())]
    })
  );
}

/**
 * Get journal-specific styles
 * @param {string} journalId - Journal format ID
 * @returns {Object} - Style configuration
 */
function getJournalStyles(journalId) {
  const styles = {
    'diabetes-care': {
      font: 'Times New Roman',
      titleSize: 16,
      bodySize: 12,
      lineSpacing: 2
    },
    'nejm': {
      font: 'Times New Roman',
      titleSize: 14,
      bodySize: 11,
      lineSpacing: 2
    },
    'lancet': {
      font: 'Times New Roman',
      titleSize: 14,
      bodySize: 12,
      lineSpacing: 1.5
    },
    'jama': {
      font: 'Times New Roman',
      titleSize: 14,
      bodySize: 11,
      lineSpacing: 2
    }
  };

  return styles[journalId] || styles['diabetes-care'];
}

/**
 * Sanitize filename
 * @param {string} title - Document title
 * @returns {string} - Safe filename
 */
function sanitizeFilename(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

/**
 * Generate a summary report (lighter weight than full manuscript)
 * @param {Object} data - Research data
 * @returns {Promise<string>} - Generated filename
 */
export async function generateSummaryReport(data) {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 720, right: 720, bottom: 720, left: 720 }
        }
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: 'Research Summary Report',
              bold: true,
              size: 32
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: `Generated: ${new Date().toLocaleDateString()}`,
              size: 20,
              color: '666666'
            })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Query: ',
              bold: true
            }),
            new TextRun(data.query || 'N/A')
          ]
        }),
        new Paragraph({
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: 'Key Findings:',
              bold: true,
              size: 26
            })
          ]
        }),
        ...(data.findings || []).map((finding, i) =>
          new Paragraph({
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({
                text: `${i + 1}. ${finding.title}`,
                bold: true
              }),
              new TextRun({
                text: `\n${finding.summary}`,
                break: 1
              }),
              new TextRun({
                text: `\nSource: ${finding.source.authors} (${finding.source.year}) - PMID: ${finding.source.pmid}`,
                italics: true,
                size: 20
              })
            ]
          })
        )
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `research_summary_${Date.now()}.docx`;
  saveAs(blob, fileName);

  return fileName;
}
