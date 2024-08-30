import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import testImage from '@/public/images/icons/pulsar/services.svg';
import MediaBox from '../mediaBox';

describe('mediaBox', () => {
  it('matches snapshot for default options', () => {
    const { container } = render(
      <MediaBox
        heading="Test Heading"
        image={<Image src={testImage} alt="Test Image" />}
      >
        Test Content
      </MediaBox>,
    );

    expect(container).toMatchSnapshot();
  });

  it('uses the specified heading level', () => {
    render(
      <MediaBox
        heading="Test Heading"
        headingLevel={2}
        image={<Image src={testImage} alt="Test Image" />}
      >
        Test Content
      </MediaBox>,
    );

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('adds the correct class name for vertical orientation', () => {
    render(
      <MediaBox
        heading="Test Heading"
        image={<Image src={testImage} alt="Test Image" />}
        orientation="vertical"
        data-testid="test-box"
      >
        Test Content
      </MediaBox>,
    );

    expect(screen.getByTestId('test-box')).toHaveClass('vertical');
    expect(screen.getByTestId('test-box')).not.toHaveClass('horizontal');
  });

  it('adds the correct class name for horizontal orientation', () => {
    render(
      <MediaBox
        heading="Test Heading"
        image={<Image src={testImage} alt="Test Image" />}
        orientation="horizontal"
        data-testid="test-box"
      >
        Test Content
      </MediaBox>,
    );

    expect(screen.getByTestId('test-box')).toHaveClass('horizontal');
    expect(screen.getByTestId('test-box')).not.toHaveClass('vertical');
  });

  it('adds the custom class name', () => {
    render(
      <MediaBox
        heading="Test Heading"
        image={<Image src={testImage} alt="Test Image" />}
        className="customclass"
        data-testid="test-box"
      >
        Test Content
      </MediaBox>,
    );

    expect(screen.getByTestId('test-box')).toHaveClass('customclass');
  });
});
