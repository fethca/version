# Version

## Prerequisites

Before using version, ensure you have the following prerequisites met:

- git, with push access to the repository

## Usage

Install package:

```bash
pnpm add @fethcat/version
```

Use cli:

```bash
# Bump patch version
pnpm version patch

# Bump minor version
pnpm version minor

# Bump major version
pnpm version major

# Bump version + in another directory
pnpm version patch ../dir

# Release prod version
pnpm version release prod

```
