import { describe, it, expect } from '@jest/globals';
import { getProjects } from '@/lib/projects';

describe('currently enabled projects', () => {
  it('should match snapshot', async () => {
    const projects = await getProjects();
    expect(projects).toMatchSnapshot();
  });
});
