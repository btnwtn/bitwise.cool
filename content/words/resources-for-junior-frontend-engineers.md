---
title: Fundamental Resources for Junior Frontend Engineers
date: "11.28.2018"
description: "A list of fundamental web development resources that will increase your understanding of the Web, and progress your career."
---

## Preface
As an experienced Web/Frontend Engineer I’ve had the pleasure of mentoring a few of my colleagues, both junior and not-so-junior. During that time I’ve accumulated a few bookmarks that are always worth sharing with my peers.

This list is for those who want a deeper understanding of the fundamentals behind the tools and frameworks we all use. Whether you’re a seasoned Web/Frontend Engineer, or just getting your feet wet with the latest JS framework; there’s something here for you.

## Resources
### [Philip Roberts: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

This is honestly one of the best technical talks I’ve seen. It’s an overview of JavaScript's Event Loop and Message Queue. Learning these concepts will give you a detailed understanding of how asynchronous code works in JavaScript. Knowing these concepts also help in diagnosing issues like a page becoming unresponsive while processing data (ever had a page just freeze on you?). I’ve watched this talk multiple times and I recommend doing so until the concepts really click. When you understand the Event Loop you can easily reason about the below code logging out `a, c, b` rather than `b, c, a`.

```js
function a() {
  return 'a'
}

function b(cb) {
  setTimeout(() => cb('b'), 0)
}

function c() {
  return new Promise(resolve => resolve('c'))
}

b(console.log)
c().then(console.log)
console.log(a())
```

### [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)

Debugging is honestly the most useful skill you can have as a developer. Being proficient at debugging will save you hours of frustrating work, and also make you more productive building things.

Most people are familiar with "console debugging", that is logging out values at certain points during a process. E.g.

```js
function filterUsersByPermission(permission, users) {
  let filteredUsers = users.filter(user => {
    // ok, which user am I dealing with?
    console.log(user)

    // does this user have a matching permission?
    let temp = user.permissions.includes(permission)
    console.log(temp)

    return user.permissions.includes(permission)
  })

  return filteredUsers
}

// why isn't this returning user "420memelord69"?
filterUsersByPermission('1337_as_heck', [
  {
    username: '420memelord69',
    permissions: ['definitely_not_1337_as_heck'],
  }
])
```

Using DevTools I can drop a `debugger` in the places I want to inspect values:

```js
function filterUsersByPermission(permission, users) {
  let filteredUsers = users.filter(user => {
    debugger
    return user.permissions.includes(permission)
  })

  return filteredUsers
}
```

If I run the code above with DevTools open, I can manually iterate over the filter predicate (the "callback" being supplied to `users.filter`). This is a lot more flexible than just printing out values. Imagine if you passed in an array of thousands of users.

<video style="max-width:100%;border-radius:3px;" autoplay loop muted playsinline poster="/words/static/debugger_poster.jpg">
  <source src="/words/static/debugger.mp4" type="video/mp4">
</video>

Besides the Chrome DevTools, it’s also worthwhile to know some command line basics. For example, say you're debugging a problem where some users are being marked as admins, and that logic exists in a function deep in your codebase. You can make use of `grep` or `ag` to find every occurence of that function. Given:

```js
// src/utils/user.js
export function userIsAdmin(user) {
  return !!Math.floor(Math.random() * 2)) && user.isAdmin
}
```

We can run `grep`:

```sh
$ grep -r userIsAdmin ~/my-project/src
~/my-project/src/utils/user.js:export function userIsAdmin(user) {
~/my-project/src/admin/index.js:    userIsAdmin({})
~/my-project/src/index.js:  if (userIsAdmin({ isAdmin: false })) {
```

We now know that `userIsAdmin` is being called from `src/index.js`, and `src/admin/index.js`. From here I can easily debug if the issue exists in those files or the function `userIsAdmin` itself.

Additional resources:
- [jlevy/the-art-of-command-line](https://github.com/jlevy/the-art-of-command-line)

### [Testing JavaScript](https://testingjavascript.com/)

This is _the_ resource for learning to test JavaScript applications. Kent explains how to avoid testing implementation details, and advocates for testing best practices. This is the only paid resource in this list and I wouldn’t advocate for it unless I truly believed that it’s worth every penny.

### [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

A lot of DOM interactions are abstracted by frameworks and libraries. It’s still really important to know what’s going on under the hood. The best way to really encapsulate this knowledge is to write your own versions of the methods that exist on DOM nodes. For example, our own version of `Node.nextElementSibling` would look something like this:

```js
let nextElementSibling = node => {
  if (node.nextSibling === null) {
    return null
  }

  if (node.nextSibling.nodeType === Node.ELEMENT_NODE) {
    return node.nextSibling
  }

  return nextElementSibling(node.nextSibling)
}
```

And given a document like:

```html
<!doctype html>
<section id="photos">
  <img src="https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp">
</section>
About
<section id="about">
  <p>…</p>
</section>
```

We can retrieve the next element of `section#photos` like so:

```js
let about = nextElementSibling(document.getElementById('photos'))
console.log(about.innerHTML)
```

This is a great introduction to practical data structures and algorithms as well.

### [Wizard Zines](https://wizardzines.com/)

<!--
<a href="https://wizardzines.com/zines/wizard/">
<img style="
display: block;
max-width: 280px;
margin: 20px auto;
border: 5px solid #928ab9;
box-shadow: 0 0 0px 3px #f1e1ff;
border-radius: 3px;
"
src="/words/static/so_you_want_to_be_a_wizard_poster.png"
alt=""/>
</a>
-->

[Wizard Zines](https://wizardzines.com/) by [Julia Evans](https://jvns.ca/) is a fun collection of programming zines. While not Frontend specific, they cover a wide range of skills that are applicaple to most engineers. My personal favorite is _[Help! I have a manager!](https://wizardzines.com/zines/manager/)_, it's something I wish I had when first getting into the industry.

### [Reginald Braithwaite](http://raganwald.com/)

_[JavaScript Allongé](https://leanpub.com/javascriptallongesix)_ is free to read online and is probably the most digestible and informative text on functions and composition in JavaScript. I can not recommend this book enough.

This is more of a bonus than anything. Reginald Braithwaite’s articles have incredible insight into functional programming with JavaScript. As a beginner these will most likely be challenging to follow. However, they are packed with useful information and techniques. Here’s a few to get started:

* [What’s a Transducer?](http://raganwald.com/2017/04/30/transducers.html)
* [Recursion? We don’t need no stinking recursion!](http://raganwald.com/2018/05/20/we-dont-need-no-stinking-recursion.html)
* [How I Learned to Stop Worrying and ❤️ the State Machine](http://raganwald.com/2018/02/23/forde.html)

### [Basics of CSS Grid: The Big Picture](https://www.youtube.com/watch?v=FEnRpy9Xfes)

<a href="https://www.youtube.com/channel/UC7TizprGknbDalbHplROtag">
<img style="
display: block;
max-width: 280px;
margin: 20px auto;
border: 5px solid #928ab9;
box-shadow: 0 0 0px 3px #f1e1ff;
border-radius: 3px;
"
src="/words/static/layout_land_preview.jpg"
alt=""/>
</a>


It's super important to understand how to build layouts with CSS effectively. [Layout Land](https://www.youtube.com/channel/UC7TizprGknbDalbHplROtag) and all of [Jen Simmons'](http://jensimmons.com/) works are incredible resources for building your skills with CSS Grid. Comfortably working with CSS Grid will be an essential skill for any Frontend Engineer.

### [Pony Foo Weekly](https://ponyfoo.com/weekly)

And finally, this is one of the best weekly newsletters on JavaScript/the Web in general. Packed with tons of great articles on a wide range of topics.

## Keep Learning!
Lists like these are a bit overwhelming. I don’t suggestion tackling everything at once. But, I do want to encourage you to contribute to the culture of sharing knowledge that is so prevalent in the Web world. Share whatever you find interesting with your peers. Don’t be afraid to ask for help when you don’t understand something. And most importantly, keep learning! 

<span style="
/* lol this is so extra */
padding: .5em;
background-color: #ffffff;
border-radius: 12px;
color: #2f47e8;
margin-top: 1rem;
display: inline-block;
box-shadow: 5px 5px 10px #ffa0a0;
border: 1px solid #ffbaba94;
font-size: .9em;
font-family: 'IBM Plex Mono', monospace;
">\#junior-dev-for-life</span>
