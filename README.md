# SVG content

This tool provide features helping add custom data to svg-based template.

# Install

Just add the NPM package to your program:

    npm i svg-content

# Use

Import buildSvg function to you module:

    const { buildSvg } = require("svg-content")

Then call the function with two arguments: _svg_, _values_:

    const newSvg = buildSvg(svg, values)

## Parameters

### svg

SVG element, representing by a **string**. You can read your local template (for example with _fs_ module), or fetch data from external server.

> Any formats, besides string, for now are unsupported

### values

An object with custom data. Keys of object must be the same, as variables in your template. Values can be a string or an array, which contains objects too.

> The deep of nesting is 1. You can't add array as value inside the array's item value.

## SVG template

Any data inside the template can be replaced. You can turn to variable any tag params, content, or even tag name, if you need. Just put a variable name into a couple of curly braces. Like this:

    <tspan>{{variable}}</tspan>

If you change a tag param, make sure, that you save the quotes around:

    fill="{{color}}"

When you need multiply some repeated content, put it between a special tags with key name, such like this:

    <text>
        <!--array-->
        <tspan>{key1}</tspan>
        <tspan>{key2}</tspan>
        <!--array-->
    </text>

It can be using for multiline text, lists or tables.

## Multiline

There are two ways to make multiline content.

### New line

Parser can find new line symbol \n and make several substrings with the same tag, that contain the variable.

> Please, don't use multiline content for tag or tag parameter variables. It can be not working (and mostly will not).

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

You can also use an array with objects and a special tag _\<!-- -->_, like described before.

> Best practice for multiline content is using relative position of element (_dx_, _dy_) inside the parent container.

## Return

The function returns an updated SVG string with replaced data. Now you can use it to response, export as a file or paste into a page.

## Error handling

Module provide an error, when something goes wrong. You cat catch this error in handling pattern you choose in project.
