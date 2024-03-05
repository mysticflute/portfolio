import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Project from '../project';

describe('project', () => {
  it('matches snapshot', () => {
    render(
      <Project
        projectMetadata={{
          name: 'Test Project',
          slug: 'test-project',
          sort: 1,
          role: 'Composer',
          description: 'A test project.',
          soundCloudIds: [1661974287, 1661979261, 1661980971],
          icon: 'pulsar/leaf.svg',
          link: 'https://www.test-project.com',
          color: '#fffeee',
        }}
      ></Project>,
    );

    expect(screen.getByRole('article')).toMatchSnapshot();
  });

  it('does not render a project link if not specified', () => {
    render(
      <Project
        projectMetadata={{
          name: 'Test Project',
          slug: 'test-project',
          sort: 1,
          role: 'Composer',
          description: 'A test project.',
        }}
      ></Project>,
    );

    expect(
      screen.queryByRole('link', { name: 'View project website' }),
    ).not.toBeInTheDocument();
  });

  it('does not render soundcloud iframes if not specified', () => {
    render(
      <Project
        projectMetadata={{
          name: 'Test Project',
          slug: 'test-project',
          sort: 1,
          role: 'Composer',
          description: 'A test project.',
        }}
      ></Project>,
    );

    expect(screen.queryAllByTitle(/SoundCloud/i)).toHaveLength(0);
  });
});
