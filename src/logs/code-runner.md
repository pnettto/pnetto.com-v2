---
layout: layouts/post.njk
title: Code runner with Piston
date: 2025-12-23
tags:
    - code
---
##

Today I played around with creating a code running environment for my website. I plan to share some Hello Worlds going forward (starting now?), so I thought it would be nice to showcase the scripts and their outputs. 

After some research on the available options, going through [Runno](https://runno.dev/) and [Judge0](https://judge0.com/), I landed on using [Piston](https://github.com/engineer-man/piston), a service so lightweight I could spawn it on a GCP e2-micro for free.

I set up a Docker environment that spins up both a Piston (API) and a Caddy (reverse proxy) instances. The first executes incoming code in the installed environments and the later makes sure only good requests arrive, beside other web server niceness.

{% code "docker-compose.yml", "yml" %}
version: '3.8'

services:
  piston:
    image: ghcr.io/engineer-man/piston
    restart: always
    privileged: true
    # No ports here; internal communication only via Caddy
    volumes:
      - ./piston_data:/piston/data

  caddy:
    image: caddy:latest
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - piston

volumes:
  caddy_data:
  caddy_config:
{% endcode %}

{% code "Caddyfile", "nginx" %}
{
    servers {
        timeouts {
            read_body   10s
            read_header 5s
            write       10s
            idle        30s
        }
    }
}

:80 {
    # 1. Performance: Compress JSON/Text responses
    encode zstd gzip

    # 2. Security: Hardening headers
    header {
        Access-Control-Allow-Origin *
        Access-Control-Allow-Methods "GET, POST, OPTIONS"
        Access-Control-Allow-Headers "Content-Type, Authorization"
        Access-Control-Max-Age "7200"
        X-Frame-Options "DENY"
        X-Content-Type-Options "nosniff"
        -Server
    }

    # 3. Protection: Limit payload size for your e2-micro
    request_body {
        max_size 10k
    }

    # Handle CORS preflight
    @options {
        method OPTIONS
    }
    respond @options "" 204

    # 4. Proxy to Piston
    handle {
        reverse_proxy piston:2000 {
            header_up X-Real-IP {remote_host}
        }
    }
}
{% endcode%}


<br />
With that done, I could create a shortcode in my 11ty and start doing things like this:

{% codeRunner "Python example", "python", true %}
import time

def loop_sum(n):
    res = 0
    for i in range(n): 
        res += i
    return res

start = time.perf_counter()
loop_sum(100000)
print(f"Loop duration: {time.perf_counter() - start:.6f}s")

start = time.perf_counter()
sum(range(100000))
print(f"Built-in duration: {time.perf_counter() - start:.6f}s")
{% endcodeRunner %}

{% codeRunner "SQL example", "sql", true %}
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO users (name) VALUES ('Piston'), ('Caddy');
SELECT * FROM users WHERE name LIKE 'P%';
{% endcodeRunner %}

{% codeRunner "Bash example", "bash", true %}
# Create a dummy module
echo "def add(a, b): return a + b" > math_utils.py

# Create a test script
echo "from math_utils import add; assert add(2, 2) == 4; print('Test Passed')" > test_math.py

# Execute
python3 test_math.py
{% endcodeRunner %}

<br />

It's exciting to get my hands dirty in the world of Docker, cloud VMs and writing again. Using a tool like Gemini to tailor examples and explain terms and concepts has been incredibly useful, even if if goes a bit crazy (or wrong) sometimes. For all the heat AI gets, I think this is one of its best uses: learning something new. Can't wait to share next week's prototypes!

As a next step, I'd like to setup another VM to deploy small prototypes made in python, node and deno. For example, to host APIs or small web apps, which I could then showcase here inside an iframe, and not need to worry if some service I forgot the the password to still hosts or runs my code later. We shall see!

---

Edit: wait, actually I have spend a few more hours and created an environment using Docker and Caddy to host all kinds of applications in a new VM instance. Look, this is running inside a docker container which has some html and js that calls a python program, which in turn executes a go script and makes use of a Postgress database. Of course, the whole environment gets updated every time I commit to the repo that hosts the applications through Githib actions. This is stuff is just crazy!

<iframe src="https://demos.pnetto.com/two/" style="width: 100%; aspect-ratio: 4 / 3;"></iframe>