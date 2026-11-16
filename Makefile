SHELL := /bin/sh
.DEFAULT_GOAL := help

.PHONY: help install dev build preview lint test test-e2e verify docker-build docker-run

help: ## Show available commands
	@printf '%s\n' 'Usage: make <target>' '' 'Targets:'
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_-]+:.*##/ {printf "  %-14s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

dev: ## Start the Vite development server
	npm run dev

build: ## Type-check and build the production site into dist/
	npm run build

preview: ## Preview the production build locally
	npm run preview

lint: ## Strict TypeScript check (the repo's current lint gate)
	npm run typecheck

test: test-e2e ## Run the QA browser suite

test-e2e: ## Playwright journeys, responsive and accessibility checks
	npm run test:e2e

verify: lint build test ## The full pre-merge gate

docker-build: ## Build the production container image (Railway parity)
	docker build -t elisha-bay-web .

docker-run: ## Serve the built image on http://localhost:8080
	docker run --rm -e PORT=8080 -p 8080:8080 elisha-bay-web
