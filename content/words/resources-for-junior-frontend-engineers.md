---
title: Fundamental Resources for Junior Frontend Engineers
date: "11-16-2018"
---

## Preface
As an experienced Web/Frontend Engineer I’ve had the pleasure of mentoring a few of my colleagues, both junior and not so-junior. During that time I’ve accumulated a few bookmarks that are always worth sharing with my peers.

This list is for those who want a deeper understanding of the fundamentals behind the tools and frameworks we all use. Whether you’re a seasoned Web/Frontend Engineer, or just getting your feet wet with the latest JS framework; there’s something here for you.

## Resources
### [Philip Roberts: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

This is honestly one of the best technical talks I’ve seen. It’s an overview of Javascript's Event Loop and Message Queue. Learning these concepts will give you a detailed understanding of how asynchronous code works in Javascript. Knowing these concepts also help in diagnosing issues like a page becoming unresponsive while processing data (ever had a page just freeze on you?). I’ve watched this talk multiple times and I recommend doing so until the concepts really click. When you understand the Event Loop you can easily reason about the below code logging out `a, c, b` rather than `b, c, a`.

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

Debugging is honestly the most useful skill you can have as a developer. Being proficient at debugging will save you hours of frustrating work, and also make you more productive building things. Besides the Chrome DevTools, it’s also worthwhile knowing some command line basics.

Additional resources:
- [Introducing the React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)
- [jlevy/the-art-of-command-line](https://github.com/jlevy/the-art-of-command-line)

### [Testing Javascript](https://testingjavascript.com/)

This is _the_ resource for learning to test javascript applications. Kent explains how to avoid testing implementation details, and advocates for testing best practices. This is the only paid resource in this list and I wouldn’t advocate for it unless I truly believed that it’s worth every penny.

### [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

A lot of DOM interactions are abstracted away from us by frameworks and libraries. It’s still really important to know what’s going on under the hood. The best way to really encapsulate this knowledge is to write your own versions of the methods that exist on DOM nodes. For example, our own version of `Node.nextElementSibling` would look something like this:

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

### [Reginald Braithwaite](http://raganwald.com/)

His book [JavaScript Allongé](https://leanpub.com/javascriptallongesix) is free to read online and is probably the most digestible and informative text on functions and composition in Javascript. I can not recommend this book enough.

This is more of a bonus than anything. Reginald Braithwaite’s articles have incredible insight into functional programming with Javascript. As a beginner these will most likely be challenging to follow. However, they are packed with useful information and techniques. Here’s a few to get started:

* [What’s a Transducer?](http://raganwald.com/2017/04/30/transducers.html)
* [Recursion? We don’t need no stinking recursion!](http://raganwald.com/2018/05/20/we-dont-need-no-stinking-recursion.html)
* [How I Learned to Stop Worrying and ❤️ the State Machine](http://raganwald.com/2018/02/23/forde.html)

### [Pony Foo Weekly](https://ponyfoo.com/weekly)

And finally, this is one of the best weekly newsletters on javascript/the Web in general. Packed with tons of great articles on a wide range of topics.

## Keep Learning!
Lists like these are a bit overwhelming. I don’t suggestion tackling everything at once. But, I do want to encourage you to contribute to the culture of sharing knowledge that is so prevalent in the Web world. Share whatever you find interesting with your peers. Don’t be afraid to ask for help when you don’t understand something. And most importantly, keep learning! 

\#junior-dev-for-life
