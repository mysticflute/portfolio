/**
 * @jest-environment ./newsletter/__tests__/jsdomWithFetch.ts
 */
import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Newsletter from '../newsletter';

describe('newsletter', () => {
  let mockResponse: Response;
  let mockFetch: jest.Spied<typeof global.fetch>;

  beforeEach(() => {
    jest.replaceProperty(process, 'env', {
      NODE_ENV: 'test',
      NEXT_PUBLIC_NEWSLETTER_FORM_ID: '1234567',
    });

    mockResponse = {
      headers: new Headers(),
      ok: true,
      status: 200,
      statusText: 'OK',
      type: 'cors',
      url: '',
      redirected: false,
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      json: () => Promise.resolve([]),
      text: () => Promise.resolve(''),
      clone: () => ({}) as jest.Mocked<Response>,
    };

    mockFetch = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(mockResponse));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls the fetch api with the email address from the input', async () => {
    const user = userEvent.setup();

    render(<Newsletter />);

    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();

    await user.type(input, 'testing@test.com');

    const submit = screen.getByRole('button');
    expect(submit).toBeInTheDocument();

    await user.click(submit);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://app.convertkit.com/forms/1234567/subscriptions',
      expect.objectContaining({ method: 'POST', body: expect.any(FormData) }),
    );

    const call = mockFetch.mock.calls[0][1];
    const formData = Array.from((call?.body as FormData).entries()).reduce(
      (acc, f) => ({ ...acc, [f[0]]: f[1] }),
      {},
    );
    expect(formData).toMatchObject({ email_address: 'testing@test.com' });
  });
});

// TODO mock fetch api
// TODO mock environment variable

// test: calls fetch api with environment variable id
// test: calls POST request to fetch
// test: shows success message on 200
// test: shows error message on 404
// validates email address is email
// validates email address is required
// label id matches input id

// disables button during submission
