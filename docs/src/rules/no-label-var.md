---
title: no-label-var
layout: doc
edit_link: https://github.com/eslint/eslint/edit/main/docs/src/rules/no-label-var.md
rule_type: suggestion
---

Disallows labels that are variable names.

## Rule Details

This rule aims to create clearer code by disallowing the bad practice of creating a label that shares a name with a variable that is in scope.

Examples of **incorrect** code for this rule:

```js
/*eslint no-label-var: "error"*/

var x = foo;
function bar() {
x:
  for (;;) {
    break x;
  }
}
```

Examples of **correct** code for this rule:

```js
/*eslint no-label-var: "error"*/

// The variable that has the same name as the label is not in scope.

function foo() {
  var q = t;
}

function bar() {
q:
  for(;;) {
    break q;
  }
}
```

## When Not To Use It

If you don't want to be notified about usage of labels, then it's safe to disable this rule.

## Related Rules

* [no-extra-label](./no-extra-label)
* [no-labels](./no-labels)
* [no-unused-labels](./no-unused-labels)
