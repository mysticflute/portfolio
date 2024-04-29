import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { MediaContextProvider } from '@/components/mediaContext/mediaContext';
import Project from '../project';

describe('project', () => {
  it('matches snapshot', () => {
    render(
      <MediaContextProvider>
        <Project
          project={{
            name: 'Test Project',
            slug: 'test-project',
            sort: 1,
            role: 'Composer',
            description: 'A test project.',
            icon: 'pulsar/leaf.svg',
            link: 'https://www.test-project.com',
            color: '#fffeee',
            tracks: [
              { id: '123456', name: 'Test Track', mp3: 'https://url.mp3' },
            ],
          }}
        ></Project>
      </MediaContextProvider>,
    );

    expect(screen.getByRole('article')).toMatchSnapshot();
  });

  it('does not render an icon if not specified', () => {
    render(
      <Project
        project={{
          name: 'Test Project',
          slug: 'test-project',
          sort: 1,
          role: 'Composer',
          description: 'A test project.',
          link: 'https://www.test-project.com',
          color: '#fffeee',
        }}
      ></Project>,
    );

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('does not render a project link if not specified', () => {
    render(
      <Project
        project={{
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

  it('does not render tracks if not specified', () => {
    render(
      <MediaContextProvider>
        <Project
          project={{
            name: 'Test Project',
            slug: 'test-project',
            sort: 1,
            role: 'Composer',
            description: 'A test project.',
            icon: 'pulsar/leaf.svg',
            link: 'https://www.test-project.com',
            color: '#fffeee',
            tracks: undefined,
          }}
        ></Project>
      </MediaContextProvider>,
    );

    expect(screen.queryByTestId('tracks')).not.toBeInTheDocument();
  });
});
