<div align="center">

# 🌪️ Vortex

Workflow automation and orchestration engine

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE.md)

</div>

Vortex is Omni's workflow automation platform. Build workflows visually with a drag-and-drop editor, define them as JSON, or create them programmatically with the TypeScript SDK. All three formats round-trip to each other.

## Architecture

| Service | Description |
|---------|-------------|
| [vortex-api](services/vortex-api) | GraphQL + REST API (Elysia, Drizzle, PostGraphile) |
| [vortex-app](services/vortex-app) | Visual workflow editor (React 19, TanStack, ReactFlow) |
| [vortex-worker](services/vortex-worker) | DSL executor with pluggable backends (Hatchet, Temporal, local) |

## Quick Start

### Prerequisites

- [Tilt](https://tilt.dev) (local dev)
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose v2 (self-hosting)
- [Bun](https://bun.sh) (service development)

### Local Development

```sh
cp services.yaml.template services.yaml
# configure services as needed, then:
tilt up
```

> [!WARNING]
> Services have their own setup requirements (env vars, database migrations). Consult each service README before running.

### Self-Hosting

```sh
cp .env.local.template .env.local   # fill in required values
docker compose -f compose.yaml -f compose.dev.yaml up --build
```

See `.env.local.template` for a full list of required and optional environment variables. For Kubernetes deployments, see the [Mosaic infra repo](https://github.com/omnidotdev/infra).

## Development Commands

| Command | Description |
|---------|-------------|
| `bun i` | Install dependencies (per service) |
| `bun dev` | Start dev server (per service) |
| `bun build` | Build for production (per service) |
| `bun test` | Run tests |
| `bun lint` | Lint with Biome |
| `bun format` | Format with Biome |
| `bun db:migrate` | Run database migrations (API) |
| `bun db:seed` | Seed database (API) |
| `bun db:studio` | Open Drizzle Studio (API) |

## Documentation

- [Vortex Docs](https://docs.omni.dev/grid/vortex)
- [GitHub](https://github.com/omnidotdev)
- [Discord](https://discord.gg/omni)

## License

The code in this repository is licensed under Apache 2.0, &copy; [Omni LLC](https://omni.dev). See [LICENSE.md](LICENSE.md) for more information.
