import { describe, it, expect } from '@jest/globals';
import { getProjects } from '@/lib/projects';

describe('currently enabled projects', () => {
  it('should match snapshot', async () => {
    const projects = await getProjects();

    // generalize generated fields
    const propertyMatchers = projects.map(project => {
      if (project.tracks) {
        return {
          tracks: project.tracks.map(() => ({ id: expect.any(String) })),
        };
      }
      return {};
    });

    expect(projects).toMatchSnapshot(propertyMatchers);
  });
});
