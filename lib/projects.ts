import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const projectsDirectory = path.join(process.cwd(), 'data/projects');
const allowedSlugPattern = /^[a-z0-9\\-]+$/;

/**
 * Metadata about a portfolio project.
 */
export interface ProjectMetadata {
  /** Unique, dash-delimited name for the project (used in URL). */
  slug: string;

  /** Name of the project. */
  name: string;

  /** My primary role on the project. */
  role: string;

  /** Short project description. */
  description: string;

  /** List of 10-digit SoundCloud track IDs. */
  // soundcloudIDs: string[];

  /** The main image for the project. */
  image: string;

  /** A link to an external project landing page. */
  link?: string;

  /** The client's logo image. */
  logoImage?: string;
}

/**
 * Returns a string property from an object, or throws an error if undefined or the wrong type.
 *
 * @param obj The object.
 * @param key The property name.
 * @param filepath The path where the object's data was loaded from.
 * @returns The string value.
 */
function getString(obj: any, key: string, filepath: string): string {
  if (obj[key] === undefined || obj[key] === null) {
    throw new Error(`The key '${key}' is missing in file ${filepath}`);
  } else if (typeof obj[key] !== 'string') {
    throw new Error(`The key '${key}' must be a string in file ${filepath}`);
  }
  return obj[key] as string;
}

/**
 * Reads the project metadata from the yaml files in data/projects.
 */
export async function getProjects(): Promise<ProjectMetadata[]> {
  const filenames = await fs.readdir(projectsDirectory);

  // files beginning with an underscore are disabled.
  const projectFilenames = filenames
    .filter(filename => filename.endsWith('.yaml') || filename.endsWith('.yml'))
    .filter(filename => !filename.startsWith('_'));

  const projectMetadata = await Promise.all(
    projectFilenames.map(async (filename): Promise<ProjectMetadata> => {
      const filepath = path.join(projectsDirectory, filename);
      const contents = await fs.readFile(filepath, 'utf8');
      const metadata: any = yaml.load(contents, { filename: filepath });

      // gather required fields
      const name = getString(metadata, 'name', filepath);
      const role = getString(metadata, 'role', filepath);
      const description = getString(metadata, 'description', filepath);
      const image = getString(metadata, 'image', filepath);

      let slug: string;
      if (metadata['slug']) {
        slug = getString(metadata, 'slug', filepath);
        if (!allowedSlugPattern.test(slug)) {
          throw new Error(
            `The key 'slug' can only contain the characters a-z, 0-9 and hyphens, in file ${filepath}`
          );
        }
      } else {
        slug = path.parse(filename).name;
        if (!allowedSlugPattern.test(slug)) {
          throw new Error(
            `The filename for ${filepath} can only contain the characters a-z, 0-9 and hyphens.`
          );
        }
      }

      const validatedMetadata: ProjectMetadata = {
        slug,
        name,
        role,
        description,
        image,
      };

      // optional fields
      if (metadata['link']) {
        metadata.link = getString(metadata, 'link', filepath);
      }

      if (metadata['logoImage']) {
        metadata.logoImage = getString(metadata, 'logoImage', filepath);
      }

      return validatedMetadata;
    })
  );

  return projectMetadata;
}
