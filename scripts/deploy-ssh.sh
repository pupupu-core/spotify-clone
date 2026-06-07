#!/usr/bin/env bash

set -euo pipefail

: "${DEPLOY_SSH_HOST:?Missing DEPLOY_SSH_HOST variable}"
: "${DEPLOY_SSH_USER:?Missing DEPLOY_SSH_USER variable}"
: "${DEPLOY_SSH_KEY:?Missing DEPLOY_SSH_KEY secret}"
: "${DEPLOY_SCRIPT_PATH:?Missing DEPLOY_SCRIPT_PATH variable}"
: "${DEPLOY_SSH_PORT:=22}"
: "${IMAGE_REF_NAME:?Missing IMAGE_REF_NAME env}"

mkdir -p ~/.ssh
printf '%s\n' "$DEPLOY_SSH_KEY" > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key

ssh-keyscan -p "$DEPLOY_SSH_PORT" "$DEPLOY_SSH_HOST" >> ~/.ssh/known_hosts

ssh -i ~/.ssh/deploy_key \
  -p "$DEPLOY_SSH_PORT" \
  "$DEPLOY_SSH_USER@$DEPLOY_SSH_HOST" \
  "DEPLOY_IMAGE_TAG='$IMAGE_REF_NAME' bash '$DEPLOY_SCRIPT_PATH'"
