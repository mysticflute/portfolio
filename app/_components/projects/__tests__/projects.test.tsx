import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import Projects from '../projects';

describe('projects', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Projects
        projectsMetadata={[
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

    expect(container).toMatchSnapshot();
  });
});
