# job<>candidate matchmaker

**Disclaimer: This is a baby-repo, use it only for playing around!**

This repository provides a simple implementation of a HTTP RESTful API server wrapped around Github API.

The goal of this service is to provide a list of candidates matching inserted query criteria, such as skill-set information or base location, retrieving data from several data sources (such as Github, LinkedIn, Twitter, etc.) and aggregating them together.

**Note: Github API is only and partially supported**

## Prerequisites

- node & npm

## Install

```bash
npm install
```

## Start

```bash
npm start
# or in dev-mode (watch enabled)
npm start:dev
```

## Operations

To ease , this repository provides an initial implementation of a standardized query language where special key-separators are mapped to logical operations as it follows:

- `+` : AND operator. e.g. `sam+jones` means `Find something containing both "sam" and "jones"`

- `|` : OR operator. e.g. `uk|fr` means `Find something containing either "uk" or "fr"`

- `-` : NOT operator. e.g. `js-ts` means `Find something containing "js" but NOT "ts"` (**no yet implemented**)

### Retrieve a list of users

`GET /candidates`

This endpoint is calling the Github API `GET /search/users` (see reference below)

e.g. 

>Retrieve all users containing the keyword `sam`, and based either `UK`, `FR` or `ES`, and having contributions made either in `javascript` or `typescript`, and sort by most `updated` first.

```bash
/candidates?keyboards=sam&location=uk|fr|es&language=javascript|typescript&sort=updated
```

List of accessible query parameters:

- keywords
- location
- language
- sort

In order to maintain a full compatibility with Github queries

## Limitations

Github Search API comes with the following limitations:

- Does not accept queries that are longer than 256 characters (not including operators or qualifiers).

- Does not accept queries that have more than five AND, OR, or NOT operators.

- for unauthenticated requests, the rate limit allows you to make up to 10 requests per minute.

## References

- [Github API: Search Users](https://docs.github.com/en/rest/reference/search#search-users)
- [Github: Searching users qualifiers](https://docs.github.com/en/github/searching-for-information-on-github/searching-users)
- [Github: Understanding search syntax](https://docs.github.com/en/github/searching-for-information-on-github/understanding-the-search-syntax)
- [Github: Rate limit](https://docs.github.com/en/rest/reference/rate-limit)

## Credits

Project based on NestJS and created with Nest CLI.