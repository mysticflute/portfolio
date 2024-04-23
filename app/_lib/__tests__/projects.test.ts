import mockfs from 'mock-fs';
import { describe, it, expect, afterEach } from '@jest/globals';
import { getProjects } from '../projects';

const minimumProjectYaml = [
  'name: Project',
  'sort: 1',
  'role: Composer',
  'description: description...',
].join('\n');

describe('getProjects', () => {
  afterEach(() => {
    mockfs.restore();
  });

  it('it handles no projects found', async () => {
    mockfs({ 'data/projects': {} });
    expect(await getProjects()).toEqual([]);
  });

  it('reads all required project metadata', async () => {
    mockfs({ 'data/projects/project.yaml': minimumProjectYaml });

    expect(await getProjects()).toEqual([
      {
        sort: 1,
        slug: 'project',
        name: 'Project',
        role: 'Composer',
        description: 'description...',
      },
    ]);
  });

  it('throws an error if missing the project name', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        'sort: 1',
        'role: Composer',
        'description: description...',
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow(
      /Missing required property(.*)name/,
    );
  });

  it('throws an error if missing the project description', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        'name: Project',
        'sort: 1',
        'role: Composer',
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow(
      /Missing required property(.*)description/,
    );
  });

  it('throws an error if missing the project role', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        'name: Project',
        'sort: 1',
        'description: description...',
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow(
      /Missing required property(.*)role/,
    );
  });

  it('reads multiple project files', async () => {
    mockfs({
      'data/projects/project-a.yaml': [
        'name: Project A',
        'sort: 1',
        'role: Composer',
        'description: the first project.',
      ].join('\n'),
      'data/projects/project-b.yaml': [
        'name: Project B',
        'sort: 2',
        'role: Additional Composer',
        'description: the second project.',
      ].join('\n'),
    });

    expect(await getProjects()).toEqual([
      {
        sort: 1,
        slug: 'project-a',
        name: 'Project A',
        role: 'Composer',
        description: 'the first project.',
      },
      {
        sort: 2,
        slug: 'project-b',
        name: 'Project B',
        role: 'Additional Composer',
        description: 'the second project.',
      },
    ]);
  });

  it('it ignores non-yaml files', async () => {
    mockfs({ 'data/projects/project.txt': 'name: Project' });
    expect(await getProjects()).toEqual([]);
  });

  it('it ignores files starting with an underscore', async () => {
    mockfs({ 'data/projects/_project.yaml': 'name: Project' });
    expect(await getProjects()).toEqual([]);
  });

  it('throws an error if the yaml is invalid', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/invalid.yaml': 'name: name:',
      'data/projects/valid.yaml': minimumProjectYaml,
    });

    await expect(getProjects()).rejects.toThrow('invalid.yaml');
  });

  it('reads a specified slug field', async () => {
    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'slug: custom-slug',
      ].join('\n'),
    });

    expect(await getProjects()).toEqual([
      expect.objectContaining({ slug: 'custom-slug' }),
    ]);
  });

  it('it throws an error if a specified slug is invalid', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'slug: custom_$lug',
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow(
      'filename or specified value can only contain',
    );
  });

  it('it creates a slug from the filename if not specified', async () => {
    mockfs({
      'data/projects/sample-project-1.yaml': minimumProjectYaml,
    });

    expect(await getProjects()).toEqual([
      expect.objectContaining({ slug: 'sample-project-1' }),
    ]);
  });

  it('it throws an error if a filename is invalid for a slug', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/invalid_filename.yaml': minimumProjectYaml,
    });

    await expect(getProjects()).rejects.toThrow(
      'filename or specified value can only contain',
    );
  });

  it('reads the icon metadata', async () => {
    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'icon: pulsar/hero.svg',
      ].join('\n'),
      'public/images/icons/pulsar/hero.svg': '',
    });

    expect(await getProjects()).toEqual([
      expect.objectContaining({ icon: 'pulsar/hero.svg' }),
    ]);
  });

  it('throws an error if the icon does not exist', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'icon: pulsar/hero.svg',
      ].join('\n'),
      'public/images/icons/pulsar/tree.svg': '',
    });

    await expect(getProjects()).rejects.toThrow('Icon does not exist');
  });

  it('reads the link metadata', async () => {
    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'link: https://example.com',
      ].join('\n'),
    });

    expect(await getProjects()).toEqual([
      expect.objectContaining({ link: 'https://example.com' }),
    ]);
  });

  it('throws an error if the link is invalid', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'link: example.com',
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow('Expected a valid url');
  });

  it('reads the color metadata', async () => {
    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        "color: '#2e5eaa'",
      ].join('\n'),
    });

    expect(await getProjects()).toEqual([
      expect.objectContaining({ color: '#2e5eaa' }),
    ]);
  });

  it('throws an error if the color is invalid', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        "color: '#2e5eaaff'",
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow(
      'Expected a valid CSS hex color',
    );
  });

  it('reads the tracks metadata', async () => {
    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'tracks:',
        '  - name: Track 1',
        '    urls:',
        '      mp3: https://some/url/file.mp3',
        '  - name: Track 2',
        '    urls:',
        '      mp3: https://some/url/file.mp3',
        '      aac: https://some/url/file.mp4',
        '      soundcloud: https://soundcloud.com',
        '      bandcamp: https://bandcamp.com',
        '      spotify: https://spotify.com',
        '      apple: https://apple.com',
        '      itunes: https://itunes.com',
        '      youtube: https://youtube.com',
      ].join('\n'),
    });

    expect(await getProjects()).toEqual([
      expect.objectContaining({
        tracks: [
          { name: 'Track 1', urls: { mp3: 'https://some/url/file.mp3' } },
          {
            name: 'Track 2',
            urls: {
              mp3: 'https://some/url/file.mp3',
              aac: 'https://some/url/file.mp4',
              soundcloud: 'https://soundcloud.com',
              bandcamp: 'https://bandcamp.com',
              spotify: 'https://spotify.com',
              apple: 'https://apple.com',
              itunes: 'https://itunes.com',
              youtube: 'https://youtube.com',
            },
          },
        ],
      }),
    ]);
  });

  it('throws an error for missing track names', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'tracks:',
        '  - urls:',
        '      mp3: https://some/url/file.mp3',
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow(
      /Missing required property(.*)name/,
    );
  });

  it('throws an error for invalid track urls', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'tracks:',
        '  - name: Track 1',
        '    urls:',
        '      mp3: htps://some/url/file.mp3',
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow('Expected a valid url');
  });

  it('throws an error if both the mp3 and aac urls are missing', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project.yaml': [
        minimumProjectYaml,
        'tracks:',
        '  - name: Track 1',
        '    urls:',
        '      soundcloud: htps://soundcloud.com',
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow(
      'At least one direct audio url must be specified',
    );
  });

  it('sorts the projects by sort order', async () => {
    mockfs({
      'data/projects/project-b.yaml': [
        'name: Project B',
        'sort: 2',
        'role: Additional Composer',
        'description: the second project.',
      ].join('\n'),
      'data/projects/project-a.yaml': [
        'name: Project A',
        'sort: 3',
        'role: Composer',
        'description: the first project.',
      ].join('\n'),
      'data/projects/project-c.yaml': [
        'name: Project C',
        'sort: 1',
        'role: Composer',
        'description: the third project.',
      ].join('\n'),
    });

    expect(await getProjects()).toEqual([
      expect.objectContaining({ name: 'Project C' }),
      expect.objectContaining({ name: 'Project B' }),
      expect.objectContaining({ name: 'Project A' }),
    ]);
  });

  it('throws an error on duplicate sort orders', async () => {
    expect.assertions(1);

    mockfs({
      'data/projects/project-a.yaml': [
        'name: Project A',
        'sort: 1',
        'role: Composer',
        'description: the first project.',
      ].join('\n'),
      'data/projects/project-b.yaml': [
        'name: Project B',
        'sort: 1',
        'role: Additional Composer',
        'description: the second project.',
      ].join('\n'),
    });

    await expect(getProjects()).rejects.toThrow('Duplicate sort value "1"');
  });
});
