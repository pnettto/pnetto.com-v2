---
layout: layouts/post.njk
title: Coding with Judge0
date: 2025-12-23
tags:
    - code
---

{% codeRunner "python", true %}
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

{% codeRunner "sql" %}
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO users (name) VALUES ('Judge0'), ('SmallInstance');
SELECT * FROM users WHERE name LIKE 'J%';
{% endcodeRunner %}

{% codeRunner "bash" %}
# Create a dummy module
echo "def add(a, b): return a + b" > math_utils.py

# Create a test script
echo "from math_utils import add; assert add(2, 2) == 4; print('Test Passed')" > test_math.py

# Execute
python3 test_math.py
{% endcodeRunner %}