import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const projectsDir = path.join(process.cwd(), 'data/projects');

export interface Project {
  name: string;
  role: string;
  description: string;
  image: string;
  link?: string;
  logo?: string;
}

function getString(o: any, key: string, filepath: string): string {
  if (o[key] === undefined || o[key] === null) {
    throw new Error(`The key '${key}' is missing in file ${filepath}`);
  } else if (typeof o[key] !== 'string') {
    throw new Error(`The key '${key}' must be a string in file ${filepath}`);
  }
  return o[key] as string;
}

/**
 * Reads the project metadata from yaml files in data/projects.
 */
export async function getProjects(): Promise<Project[]> {
  const filenames = await fs.readdir(projectsDir);

  // files beginning with an underscore (_) are disabled.
  const projectFilenames = filenames
    .filter(filename => filename.endsWith('.yaml') || filename.endsWith('.yml'))
    .filter(filename => !filename.startsWith('_'));

  const projectMetadata = await Promise.all(
    projectFilenames.map(async (filename): Promise<Project> => {
      const filepath = path.join(projectsDir, filename);
      const contents = await fs.readFile(filepath, 'utf8');
      const metadata: any = yaml.load(contents, { filename: filepath });

      // gather required fields
      const name = getString(metadata, 'name', filepath);
      const role = getString(metadata, 'role', filepath);
      const description = getString(metadata, 'description', filepath);
      const image = getString(metadata, 'image', filepath);

      const validatedMetadata: Project = {
        name,
        role,
        description,
        image,
      };

      // optional fields
      if (metadata['link'] !== undefined) {
        metadata.link = getString(metadata, 'link', filepath);
      }

      if (metadata['logo'] !== undefined) {
        metadata.logo = getString(metadata, 'logo', filepath);
      }

      return validatedMetadata;
    })
  );

  return projectMetadata;
}
