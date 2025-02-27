import fs from 'fs';
import yaml from 'yaml';

export type CommandConfig = {
  name: string;
  description: string;
  author: string;
  matches: string[];
  searchUrl?: string;
  home: string;
  examples: string[];
};

export type Redirect = {
  searchUrl?: string;
  home: string;
};

export type CommandMapping = {
  [key: string]: {
    searchUrl?: string;
    home: string;
  };
};

export type CommandHelpInfo = {
  name: string;
  description: string;
  matches: string[];
  examples: {
    command: string;
    uriCommand: string;
  }[];
};

export type CommandData = {
  mapping: CommandMapping;
  helpInfo: CommandHelpInfo[];
};

export type SearchErrorParams = {
  token: string;
  closest: string;
  currQuery: string;
  currSearch: string;
};

export const isValidUrl = (s: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

export const readCommands = () => {
  const commandDir = fs.readdirSync('./src/lib/commands');
  const mapping: CommandMapping = {};
  const helpInfo: CommandHelpInfo[] = [];
  commandDir.forEach((filename) => {
    const file = fs.readFileSync(`./src/lib/commands/${filename}`).toString();
    const fileYaml: CommandConfig = yaml.parse(file);
    const searchUrl = fileYaml.searchUrl ?? '';
    const { home } = fileYaml;
    const { name } = fileYaml;
    const { description } = fileYaml;
    const { matches } = fileYaml;
    const examples = fileYaml.examples.map((example) => ({
      command: example,
      uriCommand: encodeURIComponent(example)
    }));
    const info = { name, description, matches, examples };

    helpInfo.push(info);

    if (searchUrl && !isValidUrl(`${searchUrl}test`)) {
      // eslint-disable-next-line no-console
      console.log(`${fileYaml.name} in ${filename} has an invalid URL`);
    }

    matches.forEach((match) => {
      if (match in mapping) {
        // eslint-disable-next-line no-console
        console.warn(`${match} already declared!`);
        return;
      }

      const redirect: Redirect = { searchUrl, home };
      mapping[match] = redirect;
    });
  });

  return { mapping, helpInfo };
};
