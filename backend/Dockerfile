FROM golang:alpine3.22 AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main ./cmd/app

FROM alpine:3.22.2
WORKDIR /app
COPY --from=builder /app/main .
USER 1001
CMD ["/app/main"]