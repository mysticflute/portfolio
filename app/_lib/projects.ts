import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '@/lib/logger';
import { exists } from '@/lib/files';
import {
  infer as Infer,
  object,
  string,
  number,
  ZodError,
  ZodIssueCode,
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
  icon: string().min(1).optional(),

  /** A link to the project's external website.  */
  link: url.min(1).optional(),

  /** The project's accent color, in css hex format. */
  color: color.optional(),

  /** The audio tracks for the project. */
  tracks: object({
    /** The display name of the track. */
    name: string().min(1),

    /** The URL to an audio file in mp3 format. */
    mp3: url.min(1).optional(),

    /** The URL to an audio file in aac format. */
    aac: url.min(1).optional(),

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
      const metadata = yaml.load(contents, { filename: filepath });

      const finalProjectSchema = projectSchema.extend({
        // default value of the slug is the filename
        slug: projectSchema.shape.slug.default(path.parse(filename).name),

        // the icon must exist at the expected path
        icon: projectSchema.shape.icon.refine(
          async icon =>
            icon === undefined ||
            (await exists(path.join(iconsDirectory, icon))),
          `Icon does not exist under '${iconsDirectory}', or is inaccessible`,
        ),
      });

      let validated: ProjectMetadata;

      try {
        validated = await finalProjectSchema.parseAsync(metadata);
      } catch (e) {
        if (e instanceof ZodError) {
          const errors = e.issues.map(issue => {
            logger.trace(issue, 'error details for %s', filename);

            const location = issue.path
              .map(i => (typeof i === 'number' ? `item ${i + 1}` : i))
              .join(' > ');

            if (
              issue.code === ZodIssueCode.invalid_type &&
              issue.received === 'undefined'
            ) {
              return `Missing required property "${location}".`;
            }

            return `${issue.message}, for property "${location}".`;
          });

          throw new Error(
            `Invalid data in project YAML file ${filepath}:\n${errors.join('\n\n')}`,
          );
        } else {
          throw e;
        }
      }

      logger.trace(validated, 'successfully parserd project metadata');
      return validated;
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
