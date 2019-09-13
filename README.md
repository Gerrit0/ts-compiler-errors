# ts-compiler-errors

Documentation on TypeScript's compiler errors, including a guide on how to fix them.

### Contributing
Please do!

- When you first install the repo, `data/diagnosticMessages.json` will be downloaded from the TypeScript repo. If you want to update it later, run `node scripts/fetch_messages.js`.
- To build run `yarn build`. This will create `dist/bundle.js`. You should then be able to open `index.html` in the root directory in your web browser to view changes locally.
- You can link to different errors with `?code=123` (not yet implemented)
- Code snippets should use 2 spaces for indentation, without semicolons.

### Problematic errors

Many TypeScript errors include contextual information that is unique to the code which causes the error. TypeScript includes this information in `{0}` sections in the documentation. I try to include a representative example of the error, but as these errors are generic, it is easy to miss a case in which they trigger. Please open an issue if the documentation doesn't include a sample which is similar to your problem.

Some errors I haven't been able to figure out how to trigger, along with the code I expected to trigger the error, so they cannot be documented. If you can cause one of these, please open an issue!

- TS1012 - Incredibly generic...
- TS1020 - `{ [a: string = 'a']: any }`
- TS1022 - `{ [a]: any }`
- TS1041 - No longer used
- TS1043 - No longer used
- TS1045 - No longer used
- TS1057 - No longer used
- TS1059 - Couldn't trigger
- TS1060 - Couldn't trigger
- TS1097 - Very generic.
- TS1100 - No longer used
