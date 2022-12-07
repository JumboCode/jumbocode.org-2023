import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!space || !accessToken) throw new Error('Missing Contentful credentials');

const client = createClient({ space, accessToken });
export default client;
