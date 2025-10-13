FROM golang:1.25.1-alpine3.22 AS builder
WORKDIR /app
COPY go.mod go.sum main.go ./
RUN go mod download \
&& go build -o main main.go

FROM alpine:3.22.1
WORKDIR /app
COPY --from=builder /app/main .
USER 1001
CMD ["/app/main"]