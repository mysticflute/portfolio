import { describe, expect, it, jest, afterEach } from '@jest/globals';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from '../carousel';

describe('carousel', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws an error if no slides are specified', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    expect(() =>
      render(<Carousel label="Test Carousel" slides={[]} />),
    ).toThrow(/there must be at least one slide in the carousel/i);
  });

  it('throws an error if slides have duplicate ids', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    expect(() =>
      render(
        <Carousel
          label="Test Carousel"
          slides={[
            { id: 'id-1', content: <p>slide 1</p> },
            { id: 'id-1', content: <p>slide 2</p> },
          ]}
        />,
      ),
    ).toThrow(/the ids for the carousel slides must be unique/i);
  });

  it('adds the custom class name', () => {
    render(
      <Carousel
        label="Test Carousel"
        slides={[
          { id: 'id-1', content: <p>slide 1</p> },
          { id: 'id-2', content: <p>slide 2</p> },
        ]}
        className="customclass"
      />,
    );

    const carousel = screen.getByRole('group', { name: 'Test Carousel' });

    expect(carousel).toHaveClass('customclass');
  });

  it('displays the first slide initially', () => {
    render(
      <Carousel
        label="Test Carousel"
        slides={[
          { id: 'id-1', content: <p>slide 1</p> },
          { id: 'id-2', content: <p>slide 2</p> },
          { id: 'id-3', content: <p>slide 3</p> },
        ]}
        className="customclass"
      />,
    );

    const slide = screen.getByRole('group', {
      name: /of/,
    });

    expect(slide).toHaveTextContent('slide 1');
  });

  it('has an aria-label with the slide number and total number of slides', () => {
    render(
      <Carousel
        label="Test Carousel"
        slides={[
          { id: 'id-1', content: <p>slide 1</p> },
          { id: 'id-2', content: <p>slide 2</p> },
          { id: 'id-3', content: <p>slide 3</p> },
        ]}
        className="customclass"
      />,
    );

    const slide = screen.getByRole('group', {
      name: /1 of 3/,
    });

    expect(slide).toBeInTheDocument();
  });

  it('displays the next slide when clicking the "next" button', async () => {
    const user = userEvent.setup();

    render(
      <Carousel
        label="Test Carousel"
        slides={[
          { id: 'id-1', content: <p>slide 1</p> },
          { id: 'id-2', content: <p>slide 2</p> },
        ]}
        className="customclass"
      />,
    );

    const button = screen.getByRole('button', {
      name: /next slide/i,
    });

    // slide 1 is visible initially

    expect(
      screen.getByRole('group', {
        name: /of/,
      }),
    ).toHaveTextContent('slide 1');

    // click the next button, slide 2 is visible

    await act(async () => {
      await user.click(button);
    });

    expect(
      screen.getByRole('group', {
        name: /of/,
      }),
    ).toHaveTextContent('slide 2');

    // click the next button, circles back to slide 1

    await act(async () => {
      await user.click(button);
    });

    expect(
      screen.getByRole('group', {
        name: /of/,
      }),
    ).toHaveTextContent('slide 1');
  });

  it('displays the previous slide when clicking the "previous" button', async () => {
    const user = userEvent.setup();

    render(
      <Carousel
        label="Test Carousel"
        slides={[
          { id: 'id-1', content: <p>slide 1</p> },
          { id: 'id-2', content: <p>slide 2</p> },
          { id: 'id-3', content: <p>slide 3</p> },
        ]}
        className="customclass"
      />,
    );

    const button = screen.getByRole('button', {
      name: /previous slide/i,
    });

    // slide 1 is visible initially

    expect(
      screen.getByRole('group', {
        name: /of/,
      }),
    ).toHaveTextContent('slide 1');

    // click the previous button, circles back to slide 3

    await act(async () => {
      await user.click(button);
    });

    expect(
      screen.getByRole('group', {
        name: /of/,
      }),
    ).toHaveTextContent('slide 3');

    // click the previous button, slide 2 is visible

    await act(async () => {
      await user.click(button);
    });

    expect(
      screen.getByRole('group', {
        name: /of/,
      }),
    ).toHaveTextContent('slide 2');
  });
});
