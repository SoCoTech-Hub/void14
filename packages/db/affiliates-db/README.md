# TODO:

1. Duplicate this project
2. Rename project name to `@soco/<microservice>-db`
3. Copy schema files from microservice to schema folder
4. Rename `"@/lib/utils"` to `"@soco/utils"` in the schema folder
5. Remove the `type infers the return` section along with it's import
6. Export said schema files in the index folder as `export * from ./<fileName>`
7. Add file names listed in `schema/index` to `package.json` as:

```json
"./schema/<fileName>": {
      "types": "./dist/schema/<fileName>.d.ts",
      "default": "./src/schema/<fileName>.ts"
    },
```
