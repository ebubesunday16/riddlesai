import { getRiddleTotalKeyword, slugify } from "@/utils/func";
import { MetadataRoute } from "next";

const BASE_URL = 'https://nofarehikes.net';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/riddles/impossible`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/riddles/trending`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/riddles/categories`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];

    const dynamicRoutes: MetadataRoute.Sitemap = getRiddleTotalKeyword().map((category) => {
        const postSlug = slugify(category)
        return {
            url: `${BASE_URL}/riddles/${postSlug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        };
    });

    return [...staticRoutes, ...dynamicRoutes];
}