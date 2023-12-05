# SVG content

This tool provides features helping add custom data to svg-based templates.

### Support & Donation

Our team creates fully open-source tools and solutions for developers, designers, and those who teach these subjects. You can help us: share this tool, contribute to it, or donate to us to support future work. 

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7Z9A2PABQU584)

# What's new

> v. 0.1.4

- Add ESM support
- Add base types for TypeScript

# Install

Just add the NPM package to your program:

    npm i svg-content

# Use

Import buildSvg function to your module:

    const { buildSvg } = require("svg-content")

or

    import { buildSvg } from "svg-content"

Then call the function with two arguments: _svg_, _values_:

    const newSvg = buildSvg(svg, values)

## Parameters

### svg

SVG element, represented by a **string**. You can read your local template (for example with the _fs_ module), or fetch data from an external server.

> Any formats, besides string, for now, are unsupported

### values

An object with custom data. The keys of the object must be the same, as the variables in your template. Values can be a string or an array, which contains objects too.

> The deep of nesting is 1. You can't add an array as a value inside the array's item value.

## SVG template

Any data inside the template can be replaced. You can turn to variable any tag params, content, or even tag name if you need. Just put a variable name into a couple of curly braces. Like this:

    <tspan>{{variable}}</tspan>

If you change a tag param, make sure, that you save the quotes around

    fill="{{color}}"

When you need to multiply some repeated content, put it between special tags with key names, such as this:

    <text>
        <!--array-->
        <tspan>{key1}</tspan>
        <tspan>{key2}</tspan>
        <!--array-->
    </text>

It can be used for multiline text, lists, or tables.

## Multiline

There are two ways to make multiline content.

### New line

The parser can find a new line symbol \n and make several substrings with the same tag, that contain the variable.

> Please, don't use multiline content for a tag or tag parameter variables. It can be not working (and mostly will not).

For example, it will replace this (_multiline = "Multiline\nexample"_)

    <text>
        <tspan>{{multiline}}</tspan>
    </text>

to this

    <text>
        <tspan>Multiline</tspan>
        <tspan>example</tspan>
    </text>

### Array variable

You can also use an array with objects and a special tag _\<!-- -->_, as described before.

> Best practice for multiline content is using the relative position of the element (_dx_, _dy_) inside the parent container.

## Return

The function returns an updated SVG string with replaced data. Now you can use it to respond, export it as a file or paste it into a page.

## Error handling

The module provides an error, when something goes wrong. You cat catch this error in handling the pattern you choose for the project.
