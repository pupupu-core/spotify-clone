#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="${ROOT_DIR}/docker-compose.yml"

if [[ ! -f "${ROOT_DIR}/.env" ]]; then
  echo ".env file not found in ${ROOT_DIR}" >&2
  exit 1
fi

set -a
source "${ROOT_DIR}/.env"
set +a

echo "${GHCR_TOKEN}" | docker login "${IMAGE_REGISTRY}" -u "${GHCR_USERNAME}" --password-stdin

docker compose -f "${COMPOSE_FILE}" pull

docker compose -f "${COMPOSE_FILE}" up -d db

until docker compose -f "${COMPOSE_FILE}" exec -T db pg_isready -U "${POSTGRES_USER}" -d "${POSTGRES_DB}"; do
  echo "Waiting for Postgres..."
  sleep 2
done

docker compose -f "${COMPOSE_FILE}" run --rm api pnpm prisma migrate deploy

docker compose -f "${COMPOSE_FILE}" up -d api web

docker image prune -f
