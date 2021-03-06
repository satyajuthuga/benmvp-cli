# `integrate()` Documentation

Runs additional integration tests for the library, returning a `Promise` indicating whether the test run succeeded or failed.

> NOTE: `integrate()` assumes the integration tests live within the `integration-tests/src` folder of the current working directory where the script is being called.

The integration tests generally are run in your continuous integration (CI) environment to verify that your library when packaged can successfully be used by clients. The goal is dummy library/project in which you write tests that import and use the library like a normal client would.

The integration test process is as follows:

1. [`npm pack`](https://docs.npmjs.com/cli/pack.html) the built library to create the _same_ `.tgz` tarball that would be published in the registry
1. Copy the integration tests "project" at `integration-tests/` over to a temporary directory
1. `npm install` the packed library (from Step 1), `@benmvp/cli`, and any other dependencies specified in the `package.json` of the project
1. Run `npx benmvp test` on the project to use `@benmvp/cli` to run the tests

Looking for CLI docs? View companion [`benmvp integrate` documentation](../cli/integrate.md).

## Examples

To run all modes of integration tests on all files (default behavior):

```js
import { integrate } from '@benmvp/cli'

integrate()
```

To run just the integration tests themselves (excluding linting & typing) on all files:

```js
import { integrate } from '@benmvp/cli'

integrate({
  modes: ['spec'],
})
```

To run just linting & typing on all files in the integration tests project:

```js
import { integrate } from '@benmvp/cli'

integrate({
  modes: ['lint', 'type'],
})
```

To run all modes only on files within `utils/` directories of the integration tests project:

```js
import { integrate } from '@benmvp/cli'

integrate({
  pattern: 'utils/',
})
```

To just run linting on files within `api/` directories of the integration tests project:

```js
import { integrate } from '@benmvp/cli'

integrate({
  modes: ['lint'],
  pattern: 'api/',
})
```

## Signature

`integrate()` has the following [TypeScript](https://www.typescriptlang.org/) signature:

```js
type Mode = 'spec' | 'type' | 'lint'
namespace TestOptions {
  modes: Mode[];
  pattern: string;
}

(options?: TestOptions): Promise<Result>
```

## Options

The optional `TestOptions` object supports the following properties:

### `modes`

An `Array` of the types or modes of tests to run. Available modes:

- `'spec'` - Runs Jest-based tests (files ending in `.spec.ts` or in `__tests__` folder)
- `'type'` - Runs Typescript type-checking (files ending in `.ts` or `.tsx`)
- `'lint'` - Runs ESLint (files ending in `.ts` or `.tsx`)

Optional. Defaults to all modes when unspecified.

### `pattern`

A regexp pattern string that is matched against all tests paths before executing the test.

Optional. Defaults to `''` (signifying no filter)

## Return Value

`integrate()` returns a `Promise`.

When `integrate()` finishes successfully, the resolved value will be an `object` with a `code` property set to `0`.

If `integrate()` exits unsuccessfully, the resolved value will be an `object` with a non-zero `code` property, a user-friendly `message` property, and an `error` property pointing to the inner exception.

---

## More help

Looking for CLI docs? View companion [`benmvp integrate` documentation](../cli/integrate.md).

Still unsure of how to use `@benmvp/cli`? [Ask for help](https://github.com/benmvp/benmvp-cli/issues)!
