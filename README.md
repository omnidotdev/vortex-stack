<div align="center">

# 🌪️ Vortex

Workflow automation and orchestration engine

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE.md)

</div>

Vortex is [Omni](https://omni.dev)'s workflow automation platform. Build workflows visually with a drag-and-drop editor or define them as JSON. Both formats round-trip to each other.

## Architecture

| Service | Description |
|---------|-------------|
| [vortex-api](services/vortex-api) | GraphQL + REST API (Elysia, PostGraphile, Drizzle) |
| [vortex-app](services/vortex-app) | Visual workflow editor (React 19, TanStack Start, ReactFlow) |
| [vortex-worker](services/vortex-worker) | DSL executor with pluggable backends (Hatchet, Temporal, local) |

## Prerequisites

- [Tilt](https://tilt.dev) (local dev)
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose v2 (self-hosting)
- [Bun](https://bun.sh) (service development)

## Local Development

1. Copy the template configuration:

```sh
cp services.yaml.template services.yaml
```

2. Configure services as needed. To disable a service, comment it out. Any included services will be locally cloned.

3. Start the development environment:

```sh
tilt up
```

> [!NOTE]
> If nested repos are cloned within this metarepo and you open it in your IDE, directories may be marked as ignored due to `.gitignore` patterns. To work around this, open services in their own directory (e.g. a separate VS Code workspace unit).

> [!WARNING]
> Services have their own setup requirements (env vars, database migrations). Consult each service README before running.

## Self-Hosting

Self-host the full Vortex stack with Docker Compose. Build from source (the default `compose.yaml` pulls images from the Omni registry, which is private):

```sh
cp .env.local.template .env.local   # fill in required values
docker compose -f compose.yaml -f compose.dev.yaml up --build
```

Vortex requires a reachable identity provider (Gatekeeper or any OIDC) and a Hatchet worker pool for execution. Set `AUTH_BASE_URL` and `HATCHET_CLIENT_TOKEN` before bringing the stack up. See `.env.local.template` for the full list of required and optional environment variables. For Kubernetes deployments, see the [Omni infra repo](https://github.com/omnidotdev/infra).

## Development Commands

Run these from within each service directory:

| Command | Description |
|---------|-------------|
| `bun i` | Install dependencies |
| `bun dev` | Start dev server |
| `bun build` | Build for production |
| `bun test` | Run tests |
| `bun lint` | Lint with Biome |
| `bun format` | Format with Biome |

API-only:

| Command | Description |
|---------|-------------|
| `bun db:migrate` | Run database migrations |
| `bun db:seed` | Seed database |
| `bun db:studio` | Open Drizzle Studio |

## Documentation

For detailed documentation, visit [omni.dev/grid/vortex](https://omni.dev/grid/vortex).

## License

The code in this repository is licensed under Apache 2.0, &copy; [Omni LLC](https://omni.dev). See [LICENSE.md](LICENSE.md) for more information.
