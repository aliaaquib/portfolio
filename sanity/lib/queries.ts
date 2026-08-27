import { defineQuery } from "next-sanity";

export const ARTICLE_LIST_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)]
  | order(publishedDate desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    publishedDate,
    readingTime,
    category,
    tags,
    featured,
    seoTitle,
    seoDescription,
    body
  }
`);

export const LATEST_ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)]
  | order(publishedDate desc, _createdAt desc)[0...$limit] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    publishedDate,
    readingTime,
    category,
    tags,
    featured,
    seoTitle,
    seoDescription,
    body
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    publishedDate,
    readingTime,
    category,
    tags,
    featured,
    seoTitle,
    seoDescription,
    body
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const WORK_LIST_QUERY = defineQuery(`
  *[_type == "work" && defined(slug.current)]
  | order(featured desc, completionDate desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    thumbnail{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    gallery[]{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    technologies,
    github,
    liveDemo,
    featured,
    completionDate,
    status
  }
`);

export const FEATURED_WORK_QUERY = defineQuery(`
  *[_type == "work" && defined(slug.current) && featured == true]
  | order(completionDate desc, _createdAt desc)[0...$limit] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    thumbnail{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    gallery[]{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    technologies,
    github,
    liveDemo,
    featured,
    completionDate,
    status
  }
`);

export const WORK_BY_SLUG_QUERY = defineQuery(`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    thumbnail{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    gallery[]{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    technologies,
    github,
    liveDemo,
    featured,
    completionDate,
    status
  }
`);

export const WORK_SLUGS_QUERY = defineQuery(`
  *[_type == "work" && defined(slug.current)] {
    "slug": slug.current
  }
`);
