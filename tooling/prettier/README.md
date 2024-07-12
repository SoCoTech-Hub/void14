# @soco/prettier-config

This package contains the shared Prettier configuration for the SOCO monorepo. It ensures consistent code formatting across all projects.

## Usage

To use this configuration in your project, add the following to your `package.json`:

```json
{
  "prettier": "@soco/prettier-config"
}
```

## Plugins

This configuration includes the following plugins:

- `@ianvs/prettier-plugin-sort-imports`: Sorts import statements.
- `prettier-plugin-tailwindcss`: Formats Tailwind CSS classes.

## Import Order

The import order is defined as follows:

- `<TYPES>`: Type imports.
- `react`, `react-native`: React and React Native imports.
- `next`: Next.js imports.
- `expo`: Expo imports.
- `<THIRD_PARTY_MODULES>`: Third-party modules.
- `@soco`: Internal SOCO modules.
- Relative imports: `~`, `../`, `./`.

## Overrides

This configuration includes specific overrides for:

- `*.json.hbs`: Parsed as JSON.
- `*.js.hbs`: Parsed as Babel.

## Scripts

The following scripts are included for convenience:

- `clean`: Removes the `.turbo` and `node_modules` directories.
- `format`: Runs Prettier to check formatting.
- `typecheck`: Runs TypeScript to check types.

## TypeScript Configuration

This package includes a `tsconfig.json` that extends the base SOCO TypeScript configuration.
