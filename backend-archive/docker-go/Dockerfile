# build stage
FROM golang:1.24.2-alpine3.21 as builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main /app/main.go

# production stage
FROM alpine:3.21
WORKDIR /app
COPY --from=builder /app/main .
COPY .env .
COPY wait-for.sh .
RUN chmod +x wait-for.sh
EXPOSE 8080
CMD ["/app/main"]