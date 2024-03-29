const moment = require('moment');
const Normalizer = require('./normalizer');
const sanitizeHtml = require('sanitize-html');
const startsWith = require('lodash/startsWith');
const get = require('lodash/get');
const jsdom = require('jsdom');
const jquery = require('jquery');

const window = jsdom.jsdom().defaultView;
const $ = jquery(window);

// net empregos tags keywords onto the ads
function removeSelfLinks(tagName, attribs) {
  let replacementTag = tagName;
  const href = get(attribs, 'href') || '';
  if (startsWith(href, '/')) {
    replacementTag = '';
  }
  return { tagName: replacementTag };
}

const scraper = {
  getPostUrls(html, previousRefs) {
    const data = [];
    $(html).find('div font > table').each((index, table) => {
      const url = $(table).find('font > a').first()[0].href;
      const ref = url.split('/')[1];
      if (previousRefs.indexOf(ref) < 0) {
        data.push(`http://www.net-empregos.com/${url}`);
        previousRefs.push(ref);
      }
    });
    return data;
  },

  scrapePost(url, html) {
    html = $(html);  // eslint-disable-line no-param-reassign
    const center = $(html.find('center table:nth-child(2)'));
    const title = center.find('h1 strong font font').text();

    const detailsTable = $(center.find('tr:nth-child(2)'));
    const company = detailsTable.find('tr:nth-child(1) td:last-child').text().trim();
    const contractType = detailsTable.find('tr:nth-child(2) td:last-child').text().trim();
    const dateStr = detailsTable.find('tr:nth-child(3) td:last-child').text().trim();
      // month is 0-based
    const now = moment();
    const date = moment(`${dateStr} ${now.hours()}:${now.minutes()}:${now.seconds()}`, 'DD-MM-YYYY HH:mm:ss').valueOf();
    const location = detailsTable.find('tr:nth-child(4) td:last-child').text().trim();
    const industry = detailsTable.find('tr:nth-child(5) td:last-child').text().trim();
    const ref = detailsTable.find('tr:nth-child(6) td:last-child').text().split(' ')[1];
      // const shortDescription = center.find('tr:last-child p > font:last-child').html().trim();
    const content = center.find('tr:last-child p > font:last-child').html().trim();
    const cleanContent = sanitizeHtml(content, {
      exclusiveFilter: frame => !frame.text.trim(),
      transformTags: { a: removeSelfLinks }
    }
    );

    const values = {
      src: 'netEmpregos',
      title,
      url,
      company,
      contractType: Normalizer.normalizeContractType(contractType),
      date,
      location: Normalizer.normalizeLocation(location),
      industry,
      ref,
      content: cleanContent
    };
    return values;
  }
};

module.exports = scraper;
