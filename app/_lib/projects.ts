import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { nanoid as generateNanoId } from 'nanoid';
import { logger } from '@/lib/logger';
import { exists } from '@/lib/files';
import {
  infer as Infer,
  object,
  string,
  number,
  nanoid,
  ZodError,
  prettifyError,
} from 'zod';

const projectsDirectory = path.join(process.cwd(), 'data/projects');
const publicDirectory = path.join(process.cwd(), 'public');
const iconsDirectory = path.join(publicDirectory, 'images/icons');

/** Zod matcher for a URL string. */
const url = string().regex(
  /^https?:\/\/.+/,
  'Expected a valid url beginning with https://',
);

/** Zod matcher for a CSS hex color. */
const color = string().regex(
  /^#[0-9a-fA-F]{6}$/,
  'Expected a valid CSS hex color',
);

/** Schema for the Yaml file. */
const projectSchema = object({
  // REQUIRED FIELDS

  /** Name of the project. */
  name: string().min(1),

  /** Unique, dash-delimited name for the project (used in page URL). */
  slug: string().regex(
    /^[a-z0-9\\-]+$/,
    'The filename or specified value can only contain the characters a-z, ' +
      '0-9 and hyphens',
  ),

  /** The sort position for the project. */
  sort: number().nonnegative(),

  /** The primary role on the project. */
  role: string().min(1),

  /** Short project description. */
  description: string().min(1),

  // OPTIONAL FIELDS

  /** The path to an icon representing the game type. */
  icon: string()
    .min(1)
    .refine(async icon => {
      // the icon must exist at the expected path
      return (
        icon === undefined || (await exists(path.join(iconsDirectory, icon)))
      );
    }, `Icon does not exist under '${iconsDirectory}', or is inaccessible`)
    .optional(),

  /** A link to the project's external website.  */
  link: url.min(1).optional(),

  /** The project's accent color, in css hex format. */
  color: color.optional(),

  /** The audio tracks for the project. */
  tracks: object({
    /** a unique identifier for the track. */
    id: nanoid().default(generateNanoId),

    /** The display name of the track. */
    name: string().min(1),

    /** The URL to an audio file in aac format. */
    aac: url.min(1).optional(),

    /** The URL to an audio file in mp3 format. */
    mp3: url.min(1).optional(),

    /** The URL to stream on Apple Music. */
    apple: url.min(1).optional(),

    /** The URL for iTunes. */
    itunes: url.min(1).optional(),

    /** The URL to stream on Spotify. */
    spotify: url.min(1).optional(),

    /** The URL to stream or purchase on Bandcamp. */
    bandcamp: url.min(1).optional(),

    /** The URL to stream on SoundCloud. */
    soundcloud: url.min(1).optional(),

    /** The URL to stream on YouTube. */
    youtube: url.min(1).optional(),
  })
    .refine(
      track => track.mp3 || track.aac,
      'At least one embeddable audio url must be specified (mp3 or aac)',
    )
    .array()
    .nonempty()
    .optional(),
});

/**
 * Metadata about a portfolio project.
 */
export type ProjectMetadata = Infer<typeof projectSchema>;

/**
 * Reads the project metadata from the yaml files in data/projects.
 */
export async function getProjects(): Promise<ProjectMetadata[]> {
  const filenames = await readdir(projectsDirectory);

  // files beginning with an underscore are disabled.
  const projectFilenames = filenames
    .filter(filename => filename.endsWith('.yaml') || filename.endsWith('.yml'))
    .filter(filename => !filename.startsWith('_'));

  logger.debug(projectFilenames, 'found project files');

  const projectMetadata = await Promise.all(
    projectFilenames.map(async (filename): Promise<ProjectMetadata> => {
      const filepath = path.join(projectsDirectory, filename);
      const contents = await readFile(filepath, 'utf8');
      const metadata = yaml.load(contents, { filename: filepath });

      const finalProjectSchema = projectSchema.extend({
        // default value of the slug is the filename
        slug: projectSchema.shape.slug.prefault(path.parse(filename).name),
      });

      try {
        const validated = await finalProjectSchema.parseAsync(metadata);
        logger.trace(validated, 'successfully parsed project metadata');
        return validated;
      } catch (e) {
        if (e instanceof ZodError) {
          throw new Error(
            `Invalid data in project YAML file ${filepath}:\n` +
              prettifyError(e),
          );
        } else {
          throw e;
        }
      }
    }),
  );

  // ensure sort positions are unique
  const positions = new Map();
  projectMetadata.forEach(project => {
    if (positions.has(project.sort)) {
      throw new Error(
        `Duplicate sort value "${project.sort}" in projects "${positions.get(
          project.sort,
        )}" and "${project.name}".`,
      );
    }
    positions.set(project.sort, project.name);
  });

  projectMetadata.sort((a, b) => a.sort - b.sort);

  return projectMetadata;
}
