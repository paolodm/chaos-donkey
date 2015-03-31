# chaos-donkey

<img src="https://raw.githubusercontent.com/paolodm/chaos-donkey/master/resources/donkey.jpg" height="200" />

## Introduction

Single page applications make extensive use of xhr requests. However, as developers, we often don't check for scenarios
that involve non-200 responses. Thus, we deploy our SPAs expecting the best, until we're notified that our beautiful app
is breaking in production.

chaos-donkey is a [reverse-proxy](http://en.wikipedia.org/wiki/Reverse_proxy) that returns non-200 responses for your
xhr requests. It allows you to see how your application will perform when things go wrong.

## Installation

`npm i -g chaos-donkey`

## Usage

```bash
> chaos-donkey <configuration yaml>

example:
> chaos-donkey ./fixtures/mean-todomvc.yml
```

The configuration yaml is a file that contains the following:

```yaml
# This is your SPA
origin: mean-todomvc.herokuapp.com

xhr:
 - path: /path/to/your/endpoint
   # List the possible status codes you want your application to return
   # If you don't specify this, it will return these status codes: 200, 403, 404, 500, 503
   statusCodes:
     - 200
     - 500
```

See other examples in the fixtures folder.
