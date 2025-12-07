---
layout: layouts/post.njk
title: A Fresh Design
date: 2024-05-15
tags: ['post', 'design']
---

<p>I've updated the design to be more minimal and dark-mode friendly.</p>

<p>The goal was to make the content stand out without unnecessary distractions. I used a simple color palette with high contrast.</p>

```css
body {
    background-color: #0b0b0b;
    color: #ededed;
}
```

<h3>Python Example</h3>

```python
def hello_world():
    print("Hello, World!")
    return True

if __name__ == "__main__":
    hello_world()
```

<h3>JavaScript Example</h3>

```javascript
const greet = (name) => {
    console.log(`Hello, ${name}!`);
}

greet('User');
```

<h3>TypeScript Example</h3>

```typescript
interface User {
    id: number;
    name: string;
}

const user: User = {
    id: 1,
    name: "Eleventy Fan"
};
```

<h3>Linux Config Example</h3>

```bash
# /etc/nginx/nginx.conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 768;
}
```

<p>Stay tuned for more updates on how I built this.</p>
