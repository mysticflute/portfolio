import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Projects from '../projects';

describe('projects', () => {
  it('renders the heading', () => {
    render(
      <Projects
        projects={[
          {
            name: 'Test Project A',
            slug: 'test-project-a',
            sort: 1,
            role: 'Composer',
            description: 'Project A description.',
          },
          {
            name: 'Test Project B',
            slug: 'test-project-b',
            sort: 2,
            role: 'Additional Composer',
            description: 'Project B description.',
          },
        ]}
      ></Projects>,
    );

    expect(
      screen.getByRole('heading', { name: /music portfolio/ }),
    ).toBeInTheDocument();
  });

  it('renders the projects', () => {
    render(
      <Projects
        projects={[
          {
            name: 'Test Project A',
            slug: 'test-project-a',
            sort: 1,
            role: 'Composer',
            description: 'Project A description.',
          },
          {
            name: 'Test Project B',
            slug: 'test-project-b',
            sort: 2,
            role: 'Additional Composer',
            description: 'Project B description.',
          },
        ]}
      ></Projects>,
    );

    expect(
      screen.getByRole('heading', { name: 'Test Project A' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Test Project B' }),
    ).toBeInTheDocument();
  });
});
