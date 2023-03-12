import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '@/lib/logger';
import { getString, getNumber, getNumberArray } from '@/lib/decoder';

const projectsDirectory = path.join(process.cwd(), 'data/projects');
const allowedSlugPattern = /^[a-z0-9\\-]+$/;

/**
 * Metadata about a portfolio project.
 */
export interface ProjectMetadata {
  /** Name of the project. */
  name: string;

  /** Unique, dash-delimited name for the project (used in URL). */
  slug: string;

  /** The sort position for the project. */
  sort: number;

  /** My primary role on the project. */
  role: string;

  /** Short project description. */
  description: string;

  /** List of 10-digit SoundCloud track IDs. */
  soundcloudIDs?: number[];

  /** The main image for the project. */
  image: string;

  /** The client's logo image. */
  logoImage?: string;

  /** A link to an external project landing page. */
  link?: string;

  /** Project's accent color, in css hex format. */
  color?: string;
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

  logger.debug(projectFilenames, 'found project files');

  const projectMetadata = await Promise.all(
    projectFilenames.map(async (filename): Promise<ProjectMetadata> => {
      const filepath = path.join(projectsDirectory, filename);
      const contents = await fs.readFile(filepath, 'utf8');
      const metadata: any = yaml.load(contents, { filename: filepath });

      // gather required fields
      const name = getString(metadata, 'name', filepath);
      const sort = getNumber(metadata, 'sort', filepath);
      const role = getString(metadata, 'role', filepath);
      const description = getString(metadata, 'description', filepath);
      const image = getString(metadata, 'image', filepath); // TODO: check that image exists

      let slug: string;
      if (metadata['slug']) {
        slug = getString(metadata, 'slug', filepath);
        if (!allowedSlugPattern.test(slug)) {
          throw new Error(
            `The key 'slug' can only contain the characters a-z, 0-9 and hyphens, in ${filepath}`
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

      const validated: ProjectMetadata = {
        slug,
        sort,
        name,
        role,
        description,
        image,
      };

      // optional fields
      if (metadata['link']) {
        // TODO: check that it is url format.
        validated.link = getString(metadata, 'link', filepath);
      }

      if (metadata['logoImage']) {
        // TODO: check that the image is in the right path.
        validated.logoImage = getString(metadata, 'logoImage', filepath);
      }

      if (metadata['soundcloudIDs']) {
        // TODO: check that they are all 10 digit ids.
        validated.soundcloudIDs = getNumberArray(
          metadata,
          'soundcloudIDs',
          filepath
        );
      }

      if (metadata['color']) {
        // TODO: check that it's in hex format.
        validated.color = getString(metadata, 'color', filepath);
      }

      logger.debug(validated, 'found project metadata');
      return validated;
    })
  );

  // ensure sort positions are unique
  const positions = new Map();
  projectMetadata.forEach(project => {
    if (positions.has(project.sort)) {
      throw new Error(
        `Duplicate sort value '${project.sort}' in projects '${positions.get(
          project.sort
        )}' and '${project.name}'`
      );
    }
    positions.set(project.sort, project.name);
  });

  projectMetadata.sort((a, b) => a.sort - b.sort);

  return projectMetadata;
}
