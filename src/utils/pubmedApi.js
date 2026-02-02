// PubMed E-utilities API Integration
// Base URL: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/

const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

/**
 * Search PubMed for articles matching a query
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum number of results (default: 20)
 * @returns {Promise<{totalCount: number, articles: Array}>}
 */
export async function searchPubMed(query, maxResults = 20) {
  try {
    // Step 1: ESearch to get PMIDs
    const searchUrl = `${BASE_URL}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=${maxResults}&retmode=json&sort=relevance`;

    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) {
      throw new Error(`ESearch failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const pmids = searchData.esearchresult?.idlist || [];
    const totalCount = parseInt(searchData.esearchresult?.count || '0', 10);

    if (pmids.length === 0) {
      return { totalCount: 0, articles: [] };
    }

    // Step 2: EFetch to get article details
    const fetchUrl = `${BASE_URL}/efetch.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=xml`;

    const fetchResponse = await fetch(fetchUrl);
    if (!fetchResponse.ok) {
      throw new Error(`EFetch failed: ${fetchResponse.status}`);
    }

    const xmlText = await fetchResponse.text();
    const articles = parseArticlesFromXML(xmlText);

    return {
      totalCount,
      articles
    };
  } catch (error) {
    console.error('PubMed search error:', error);
    throw error;
  }
}

/**
 * Parse PubMed XML response into structured article data
 * @param {string} xmlText - XML response from EFetch
 * @returns {Array} - Array of article objects
 */
function parseArticlesFromXML(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');
  const articles = [];

  const pubmedArticles = doc.querySelectorAll('PubmedArticle');

  pubmedArticles.forEach(article => {
    try {
      const medlineCitation = article.querySelector('MedlineCitation');
      const articleData = medlineCitation?.querySelector('Article');

      // Get PMID
      const pmid = medlineCitation?.querySelector('PMID')?.textContent || '';

      // Get title
      const title = articleData?.querySelector('ArticleTitle')?.textContent || 'Untitled';

      // Get authors
      const authorList = articleData?.querySelectorAll('Author');
      const authors = [];
      authorList?.forEach(author => {
        const lastName = author.querySelector('LastName')?.textContent || '';
        const initials = author.querySelector('Initials')?.textContent || '';
        if (lastName) {
          authors.push(`${lastName} ${initials}`.trim());
        }
      });

      // Get journal info
      const journal = articleData?.querySelector('Journal Title')?.textContent ||
                     articleData?.querySelector('ISOAbbreviation')?.textContent ||
                     medlineCitation?.querySelector('MedlineJournalInfo NlmUniqueID')?.textContent || '';

      // Get publication year
      const pubDate = articleData?.querySelector('Journal JournalIssue PubDate');
      const year = pubDate?.querySelector('Year')?.textContent ||
                   pubDate?.querySelector('MedlineDate')?.textContent?.substring(0, 4) || '';

      // Get abstract
      const abstractTexts = articleData?.querySelectorAll('Abstract AbstractText');
      let abstract = '';
      abstractTexts?.forEach(text => {
        const label = text.getAttribute('Label');
        if (label) {
          abstract += `${label}: `;
        }
        abstract += text.textContent + ' ';
      });
      abstract = abstract.trim() || 'No abstract available.';

      // Get DOI
      const articleIds = article.querySelectorAll('ArticleId');
      let doi = '';
      articleIds.forEach(id => {
        if (id.getAttribute('IdType') === 'doi') {
          doi = id.textContent || '';
        }
      });

      articles.push({
        pmid,
        title,
        authors,
        journal,
        year: parseInt(year, 10) || new Date().getFullYear(),
        abstract,
        doi
      });
    } catch (e) {
      console.warn('Error parsing article:', e);
    }
  });

  return articles;
}

/**
 * Get detailed article information by PMID
 * @param {string} pmid - PubMed ID
 * @returns {Promise<Object>} - Article details
 */
export async function getArticleDetails(pmid) {
  const fetchUrl = `${BASE_URL}/efetch.fcgi?db=pubmed&id=${pmid}&retmode=xml`;

  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.status}`);
  }

  const xmlText = await response.text();
  const articles = parseArticlesFromXML(xmlText);

  return articles[0] || null;
}

/**
 * Build a formatted citation string
 * @param {Object} article - Article object
 * @returns {string} - Formatted citation
 */
export function formatCitation(article) {
  const authorString = article.authors.length > 3
    ? `${article.authors.slice(0, 3).join(', ')}, et al.`
    : article.authors.join(', ');

  return `${authorString} ${article.title} ${article.journal}. ${article.year}. PMID: ${article.pmid}${article.doi ? `. DOI: ${article.doi}` : ''}`;
}
