import { render } from '@testing-library/react';
import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import App from './app';

enableFetchMocks();

describe('App', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }))
  });

  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);

    expect(getByText('Welcome to crow-storm!')).toBeTruthy();
  });
});
