import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import Testimonial from '../testimonial';

import testImage from '@/public/images/illustrations/paperfolio/avatar_male1.png';

describe('testimonial', () => {
  it('displays the name', () => {
    render(
      <Testimonial
        name="Test name"
        client="Test client"
        image={<Image src={testImage} alt="Test image" />}
      >
        Test quote.
      </Testimonial>,
    );

    expect(screen.getByText('Test name')).toBeInTheDocument();
  });

  it('displays the client', () => {
    render(
      <Testimonial
        name="Test name"
        client="Test client"
        image={<Image src={testImage} alt="Test image" />}
      >
        Test quote.
      </Testimonial>,
    );

    expect(screen.getByText('Test client')).toBeInTheDocument();
  });

  it('displays the image', () => {
    render(
      <Testimonial
        name="Test name"
        client="Test client"
        image={<Image src={testImage} alt="Test image" />}
      >
        Test quote.
      </Testimonial>,
    );

    expect(
      screen.getByRole('img', { name: /test image/i }),
    ).toBeInTheDocument();
  });

  it('displays the quote', () => {
    render(
      <Testimonial
        name="Test name"
        client="Test client"
        image={<Image src={testImage} alt="Test image" />}
      >
        Test quote.
      </Testimonial>,
    );

    expect(screen.getByRole('paragraph')).toHaveTextContent('Test quote.');
  });

  it('adds the closing quotation mark', () => {
    render(
      <Testimonial
        name="Test name"
        client="Test client"
        image={<Image src={testImage} alt="Test image" />}
      >
        Test quote.
      </Testimonial>,
    );

    expect(screen.getByRole('paragraph')).toHaveTextContent('”');
  });
});
