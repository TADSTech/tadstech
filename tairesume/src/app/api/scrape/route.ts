import { NextRequest } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return Response.json({ error: 'URL is required', success: false }, { status: 400 });
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return Response.json({ error: 'Invalid URL', success: false }, { status: 400 });
    }

    // Fetch the page
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return Response.json(
        { error: `Failed to fetch page: ${response.status}`, success: false },
        { status: 422 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove noise elements
    $('script, style, nav, footer, header, noscript, iframe, img, svg, form, [role="banner"], [role="navigation"], .cookie-banner, .popup, .modal, .ad, .advertisement').remove();

    // Try to find job description content
    const title = $('title').text().trim() || $('h1').first().text().trim() || 'Job Listing';

    // Common job description selectors
    const selectors = [
      '[data-testid="job-description"]',
      '.job-description',
      '.description',
      '#job-description',
      '#description',
      '.posting-requirements',
      '.job-details',
      '.job-content',
      'article',
      '[role="main"]',
      'main',
    ];

    let text = '';

    for (const selector of selectors) {
      const el = $(selector);
      if (el.length && el.text().trim().length > 100) {
        text = el.text().trim();
        break;
      }
    }

    // Fallback: get body text
    if (!text || text.length < 100) {
      text = $('body').text().trim();
    }

    // Clean up whitespace
    text = text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // Limit length
    if (text.length > 8000) {
      text = text.substring(0, 8000) + '...';
    }

    if (text.length < 50) {
      return Response.json(
        { error: 'Could not extract meaningful content. Try pasting the job description manually.', success: false },
        { status: 422 }
      );
    }

    return Response.json({
      title,
      text,
      success: true,
    });
  } catch (error) {
    console.error('Scrape error:', error);
    return Response.json(
      { error: 'Failed to scrape the page. Try pasting the job description manually.', success: false },
      { status: 500 }
    );
  }
}
