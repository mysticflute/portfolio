import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '@/lib/logger';
import { getString, getNumber, getNumberArray } from '@/lib/decoder';

const projectsDirectory = path.join(process.cwd(), 'data/projects');
const publicDirectory = path.join(process.cwd(), 'public');
const iconsDirectory = path.join(publicDirectory, 'images/icons');

const VALID_SLUG = /^[a-z0-9\\-]+$/;
const VALID_SOUNDCLOUD_ID = /^[0-9]{10}$/;
const VALID_COLOR = /^#[0-9a-fA-F]{6}$/;

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
  soundCloudIds?: number[];

  /** The path to an icon representing the game type. */
  icon?: string;

  /** A link to the project's external website.  */
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

      let slug: string;
      if (metadata['slug']) {
        slug = getString(metadata, 'slug', filepath);
        if (!VALID_SLUG.test(slug)) {
          throw new Error(
            `The key 'slug' can only contain the characters a-z, 0-9 and hyphens, in ${filepath}`,
          );
        }
      } else {
        slug = path.parse(filename).name;
        if (!VALID_SLUG.test(slug)) {
          throw new Error(
            `The filename for ${filepath} can only contain the characters a-z, 0-9 and hyphens.`,
          );
        }
      }

      const validated: ProjectMetadata = {
        slug,
        sort,
        name,
        role,
        description,
      };

      // read optional fields
      if (metadata['soundCloudIds']) {
        const ids = getNumberArray(metadata, 'soundCloudIds', filepath);
        ids.forEach(id => {
          if (!VALID_SOUNDCLOUD_ID.test(`${id}`)) {
            throw new Error(`Invalid SoundCloud ID "${id}" in ${filepath}`);
          }
        });
        validated.soundCloudIds = ids;
      }

      if (metadata['icon']) {
        const icon = getString(metadata, 'icon', filepath);
        const iconPath = path.join(iconsDirectory, icon);
        try {
          await fs.access(iconPath);
          validated.icon = icon;
        } catch (e) {
          throw new Error(
            `Icon "${icon}" in ${filepath} does not exist or is inaccessible at ${iconPath}`,
          );
        }
      }

      if (metadata['link']) {
        validated.link = getString(metadata, 'link', filepath);
      }

      if (metadata['color']) {
        const color = getString(metadata, 'color', filepath);
        if (!VALID_COLOR.test(color)) {
          throw new Error(`Invalid color "${color}" in ${filepath}`);
        }
        validated.color = color;
      }

      logger.trace(validated, 'found project metadata');
      return validated;
    }),
  );

  // ensure sort positions are unique
  const positions = new Map();
  projectMetadata.forEach(project => {
    if (positions.has(project.sort)) {
      throw new Error(
        `Duplicate sort value '${project.sort}' in projects '${positions.get(
          project.sort,
        )}' and '${project.name}'`,
      );
    }
    positions.set(project.sort, project.name);
  });

  projectMetadata.sort((a, b) => a.sort - b.sort);

  return projectMetadata;
}
