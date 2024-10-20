import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

// Config value from config.yaml
export type Config = {
  title: string;
  subTitle: string;
  description: string;
  keywords: string;
  author: {
    name: string;
    link: string;
  };
  lang: string;
  avatar: string;
  background: string;
  slogan: string;
  socialMedia: {
    github: string;
    linkedin: string;
    x: string;
    instagram: string;
    youtube: string;
    telegram: string;
    bilibili: string;
    zhihu: string;
    email: string;
    rss: string;
  };
  thumbnailAbout: boolean;
  disqusShortname: string;
  commentAbout: boolean;
  scriptSlotHeader: string[];
  scriptSlotFooter: string[];
  slotFooter: string;
  slotComment: string;
};

export const getConfig = (): Config => {
  const filePath = path.join(process.cwd(), 'config.yml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const config = yaml.parse(fileContents) as Config;
  return config;
};
