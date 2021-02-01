import { createAsyncThunk } from '@reduxjs/toolkit'
import { MasteryViewerDTO } from '@waffle-charm/api-interfaces'

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchMasteryViewer())
 * }, [dispatch]);
 * ```
 */
export const fetchMasteryViewer = createAsyncThunk(
  'masteryViewer/fetchStatus',
  async (summonerName: string, thunkAPI) => {
    if (!summonerName) {
      throw `summonerName is required`
    }

    if (summonerName.length < 3) {
      throw `summonerName must be longer than 3 characters`
    }

    const response = await fetch(
      `/api/mastery-viewer/by-name/${summonerName}`
    ).then((_) => _.json())
    if (!response || response.statusCode) {
      throw response
    }

    return response as MasteryViewerDTO
  }
)
