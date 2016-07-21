Requirements
=============
1. [Node/npm](https://nodejs.org/en/)

Technology/Libraries in use
=============
- [Grunt task runner](http://gruntjs.com/) Runs other apps/libs, eg: concat all the css files
- [Sass](http://sass-lang.com/) CSS more like a programming language, needs to compile
- [Pug](https://github.com/pugjs/pug) aka [Jade](http://jade-lang.com/) Easier html, needs to compile
- [Bootstrap](http://getbootstrap.com/) FE building blocks
- [Simplified BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) CSS naming convention

Building
==============

To create the `./code/interactiveWebAppPrototype/build/` directory:

    cd ./code/interactiveWebAppPrototype;
    npm install;
	grunt
	

The default `grunt` task launches a livereload enabled server server at [http://localhost:3000](http://localhost:3000)

Grid
===============
Rows and columns are handled by the [Bootstrap Grid System](http://getbootstrap.com/css/#grid), eg: `.container-fluid`, `.row`, `.col-xs-4`, etc

Modal
===============
Modals are powered by [Bootstrap](http://getbootstrap.com/javascript/#modals)

Accordions
===============
The accordions are custom scripting, refer to: `./code/interactiveWebAppPrototype/js/main.js`. 

When initialized, the script looks for `.js-accordion` css classes in the `dom`.

It relies on `href="#idOfSomeContentPanel" ` or `data-href="#idOfSomeContentPanel` attributes to show/hide the panels.

The js & css is toggling visibility via the `aria-hidden` attribute on the content panel.

    [aria-hidden='true'] {
      display: none;
     }

The accordion 'triggers' can be styled using the `aria-pressed` attribute:

    .infogfx__accordionTrigger[aria-pressed='true'] {
      border-radius: 10px 0 0 0;
      //...
    }
    
    .infogfx__accordionTrigger[aria-pressed='false'] {
      //...
    }

YouTube
================
Some basic scripting using the youtube api is in place, refer to: `./code/interactiveWebAppPrototype/js/main.js`. 

* dynamically load the library
* load the video
* start/stop the video based on the Bootstrap modal events