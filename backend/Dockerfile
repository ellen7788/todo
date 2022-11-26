FROM golang:alpine
RUN mkdir /go/src/app
WORKDIR /go/src/app
ADD . /go/src/app

COPY go.mod go.sum ./
CMD ["go", "run", "main.go"]
