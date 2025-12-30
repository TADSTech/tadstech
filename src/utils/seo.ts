import type { BlogPost } from '../services/blogService';

export const generateMetaTags = (post: BlogPost) => {
    const siteUrl = window.location.origin;
    const postUrl = `${siteUrl}/writing/${post.slug}`;

    return {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        canonical: postUrl,
        ogTitle: post.seoTitle || post.title,
        ogDescription: post.seoDescription || post.excerpt,
        ogUrl: postUrl,
        ogImage: post.ogImageUrl || `${siteUrl}/og-default.png`,
        ogType: 'article',
        twitterCard: 'summary_large_image',
        twitterTitle: post.seoTitle || post.title,
        twitterDescription: post.seoDescription || post.excerpt,
        articleAuthor: 'Michael Tunwashe',
        articlePublishedTime: post.publishedAt.toISOString(),
        articleTags: post.tags.join(', '),
    };
};

export const generateStructuredData = (post: BlogPost) => {
    const siteUrl = window.location.origin;

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.ogImageUrl || `${siteUrl}/og-default.png`,
        datePublished: post.publishedAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
            '@type': 'Person',
            name: 'Michael Tunwashe',
            url: siteUrl,
        },
        publisher: {
            '@type': 'Person',
            name: 'Michael Tunwashe',
            url: siteUrl,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/writing/${post.slug}`,
        },
        keywords: post.tags.join(', '),
    };
};
