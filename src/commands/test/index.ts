import {TEST_ARGS} from '../../cli/args'
import {Result} from '../types'
import {getJestArgs} from './utils'
import runJest from './run-jest'

/**
 * Runs a one-time pass of the specified modes of tests
 * @param {Object} [options] The configuration options for testing the library
 * @param {Array<TestMode>} [options.modes] List of the types or modes of tests to run
 * @returns {Promise<Result>} The result of executing the test
 */
export default async ({modes = TEST_ARGS.modes.default} = {}): Promise<Result> => {
  try {
    await runJest(getJestArgs({modes}))
  } catch (error) {
    return {
      code: 1,
      message: 'Error running test command',
      error,
    }
  }

  return {
    code: 0,
  }
}
