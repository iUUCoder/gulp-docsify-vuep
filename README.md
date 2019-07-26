# gulp-docsify-vuep

This is a [Gulp](https://gulpjs.com/) plugin.

It can convert [Vue](https://vuejs.org/index.html) code to [Markdown](https://markdown.cn/), make them can run with [Vuep](https://cinwell.com/vuep/) in the [docsify](https://docsify.js.org/).

## Install

```shell
npm install gulp-docsify-vuep --save-dev
```

## Usage

#### gulpfile.js

```js
const gulp = require('gulp');
const docsifyVuep = require('gulp-docsify-vuep');

gulp.task('default', function() {
    gulp.src('./src/**/*.vue')
        .pipe(docsifyVuep())
        .pipe(gulp.dest('./dist'));
});
```

## API

-   **docsifyVuep([config])**

    -   **config.options**

        Type: `Object`

        [Options](https://cinwell.com/vuep/#/?id=options) for Vuep.

    -   **config.id**

        Type: `String`

        default: `dir__file-name--filehash[7]`

        ID for Vuep template.

## Example

#### gulpfile.js

```js
const gulp = require('gulp');
const docsifyVuep = require('gulp-docsify-vuep');

gulp.task('default', function() {
    gulp.src('./src/**/*.vue')
        .pipe(
            docsifyVuep({
                options: {
                    theme: 'neo',
                },
            })
        )
        .pipe(gulp.dest('./dist'));
});
```

-   Input:

    ```vue
    <template>
        <h1>hello world!<h1>
    </template>

    <script>
    export default {};
    </script>
    ```

-   Output:

    ```markdown
    <vuep :options="{'theme':'neo'}" template="#index--319ba5d"></vuep>

    <script v-pre type="text/x-template" id="index--319ba5d">
    
    <template>
        <h1>hello world!<h1>
    </template>
    
    <script>
    export default {};
    </script>

    </script>
    ```

## License

MIT © UUCoder
