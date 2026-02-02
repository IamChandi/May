// ClinicalTrials.gov API v2 Integration
// Base URL: https://clinicaltrials.gov/api/v2/studies

const BASE_URL = 'https://clinicaltrials.gov/api/v2/studies';

/**
 * Search ClinicalTrials.gov for trials matching a condition
 * @param {string} condition - Condition/disease to search for
 * @param {Object} options - Search options
 * @returns {Promise<{totalCount: number, trials: Array}>}
 */
export async function searchTrials(condition, options = {}) {
  const {
    maxResults = 10,
    status = null,
    phase = null,
    sponsor = null
  } = options;

  try {
    // Build query parameters
    const params = new URLSearchParams({
      'query.cond': condition,
      'pageSize': maxResults.toString(),
      'format': 'json'
    });

    // Add optional filters
    if (status) {
      params.append('filter.overallStatus', status);
    }
    if (phase) {
      params.append('filter.phase', phase);
    }
    if (sponsor) {
      params.append('query.spons', sponsor);
    }

    const url = `${BASE_URL}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`ClinicalTrials.gov API error: ${response.status}`);
    }

    const data = await response.json();
    const trials = parseTrialsFromResponse(data);

    return {
      totalCount: data.totalCount || trials.length,
      trials
    };
  } catch (error) {
    console.error('ClinicalTrials.gov search error:', error);
    throw error;
  }
}

/**
 * Parse trials from API response
 * @param {Object} data - API response
 * @returns {Array} - Array of trial objects
 */
function parseTrialsFromResponse(data) {
  const studies = data.studies || [];

  return studies.map(study => {
    const protocolSection = study.protocolSection || {};
    const identificationModule = protocolSection.identificationModule || {};
    const statusModule = protocolSection.statusModule || {};
    const designModule = protocolSection.designModule || {};
    const sponsorCollaboratorsModule = protocolSection.sponsorCollaboratorsModule || {};
    const conditionsModule = protocolSection.conditionsModule || {};
    const armsInterventionsModule = protocolSection.armsInterventionsModule || {};

    // Extract dates
    const startDate = statusModule.startDateStruct?.date || '';
    const completionDate = statusModule.completionDateStruct?.date ||
                          statusModule.primaryCompletionDateStruct?.date || '';

    // Extract interventions
    const interventions = (armsInterventionsModule.interventions || []).map(i => ({
      type: i.type,
      name: i.name
    }));

    return {
      nctId: identificationModule.nctId || '',
      title: identificationModule.officialTitle || identificationModule.briefTitle || 'Untitled Study',
      status: statusModule.overallStatus || 'Unknown',
      phase: formatPhase(designModule.phases),
      enrollment: designModule.enrollmentInfo?.count || 0,
      startDate: formatDate(startDate),
      completionDate: formatDate(completionDate),
      sponsor: sponsorCollaboratorsModule.leadSponsor?.name || 'Unknown',
      conditions: conditionsModule.conditions || [],
      interventions
    };
  });
}

/**
 * Format phase array to string
 * @param {Array} phases - Phase array
 * @returns {string} - Formatted phase string
 */
function formatPhase(phases) {
  if (!phases || phases.length === 0) return 'N/A';

  return phases.map(p => {
    switch (p) {
      case 'PHASE1': return 'Phase 1';
      case 'PHASE2': return 'Phase 2';
      case 'PHASE3': return 'Phase 3';
      case 'PHASE4': return 'Phase 4';
      case 'EARLY_PHASE1': return 'Early Phase 1';
      case 'NA': return 'N/A';
      default: return p;
    }
  }).join('/');
}

/**
 * Format date string
 * @param {string} dateStr - Date string
 * @returns {string} - Formatted date (YYYY-MM or original)
 */
function formatDate(dateStr) {
  if (!dateStr) return 'TBD';

  // Handle different date formats
  if (dateStr.includes('-')) {
    return dateStr.substring(0, 7); // YYYY-MM
  }

  return dateStr;
}

/**
 * Get detailed information for a specific trial
 * @param {string} nctId - NCT ID of the trial
 * @returns {Promise<Object>} - Trial details
 */
export async function getTrialDetails(nctId) {
  try {
    const url = `${BASE_URL}/${nctId}?format=json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch trial: ${response.status}`);
    }

    const data = await response.json();
    const protocolSection = data.protocolSection || {};

    return {
      ...parseTrialsFromResponse({ studies: [data] })[0],
      description: protocolSection.descriptionModule?.briefSummary || '',
      eligibility: protocolSection.eligibilityModule || {},
      outcomes: protocolSection.outcomesModule || {},
      contacts: protocolSection.contactsLocationsModule || {}
    };
  } catch (error) {
    console.error('Error fetching trial details:', error);
    throw error;
  }
}

/**
 * Get status color for display
 * @param {string} status - Trial status
 * @returns {string} - CSS color class
 */
export function getStatusColor(status) {
  const statusLower = status.toLowerCase();

  if (statusLower.includes('completed')) return 'sage';
  if (statusLower.includes('recruiting')) return 'coral';
  if (statusLower.includes('active')) return 'amber';
  if (statusLower.includes('terminated') || statusLower.includes('withdrawn')) return 'red';

  return 'gray';
}
