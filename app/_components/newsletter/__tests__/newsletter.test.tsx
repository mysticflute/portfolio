import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { mockSuccessResponse, mock404Response } from './mockFetch';
import Newsletter from '../newsletter';

// Currently the jsdom environment doesn't support fetch:
// https://github.com/jsdom/jsdom/issues/1724
const originalFetch = global.fetch;

const formId = '1234567';
const endpoint = `https://app.convertkit.com/forms/${formId}/subscriptions`;

describe('newsletter', () => {
  let mockResponse: Response;
  let mockFetch: jest.Mocked<typeof global.fetch>;

  /** Type an email address into the input field and submit the form. */
  async function typeAndSubmit(email: string, user: UserEvent) {
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();

    await user.type(input, email);

    const submit = screen.getByRole('button');
    expect(submit).toBeInTheDocument();

    await user.click(submit);
  }

  beforeEach(() => {
    jest.replaceProperty(process, 'env', {
      ...process.env,
      NEXT_PUBLIC_NEWSLETTER_FORM_ID: formId,
    });

    mockResponse = mockSuccessResponse();
    mockFetch = jest.fn(() => Promise.resolve(mockResponse));

    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    global.fetch = originalFetch;
  });

  it('calls fetch with the email address from the input', async () => {
    const user = userEvent.setup();

    render(<Newsletter />);

    await typeAndSubmit('testing@test.com', user);

    expect(mockFetch).toHaveBeenCalledWith(
      endpoint,
      expect.objectContaining({ method: 'POST', body: expect.any(FormData) }),
    );

    const expected = new Set([['email_address', 'testing@test.com']]);
    const actual = new Set(mockFetch.mock.calls[0][1]!.body as FormData);

    expect(actual).toEqual(expected);
  });

  it('shows a success message when fetch returns 200', async () => {
    const user = userEvent.setup();

    render(<Newsletter />);

    await typeAndSubmit('testing@test.com', user);

    expect(screen.getByText(/thanks for joining/i)).toBeInTheDocument();
  });

  it('shows a failure message when fetch returns 404', async () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    mockResponse = mock404Response();
    const user = userEvent.setup();

    render(<Newsletter />);

    await typeAndSubmit('testing@test.com', user);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('handles fetch throwing an error', async () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    global.fetch = jest.fn(() => Promise.reject('error'));
    const user = userEvent.setup();

    render(<Newsletter />);

    await typeAndSubmit('testing@test.com', user);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
