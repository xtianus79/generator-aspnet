# generator-aspnet-xtianus

[![Build Status](https://travis-ci.org/xtianus79/generator-aspnet.svg?branch=master)](https://travis-ci.org/xtianus79/generator-aspnet)
[![npm](https://img.shields.io/npm/v/generator-aspnet-xtianus.svg)](https://www.npmjs.com/package/generator-aspnet-xtianus)
[![npm](https://img.shields.io/npm/dm/generator-aspnet-xtianus.svg)](https://www.npmjs.com/package/generator-aspnet-xtianus)
[![Dependency Status](https://david-dm.org/xtianus79/generator-aspnet.svg)](https://david-dm.org/xtianus79/generator-aspnet)

Yeoman generator for ASP.NET vNext projects with additional templates

**This repo will remain a full working version from the upstream sync to omnisharp/generator-aspnet**

## Additional Templates:

- Starter Web - Foundation 5

[![](https://cloud.githubusercontent.com/assets/8476336/7016853/a93f30d6-dcbb-11e4-8d5c-0807ecd2f738.gif)](https://github.com/xtianus79/generator-aspnet 'ASP.NET 5 Generator with additional templates')

[![NPM](https://nodei.co/npm/generator-aspnet-xtianus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/generator-aspnet-xtianus/)

[![NPM](https://nodei.co/npm-dl/generator-aspnet-xtianus.png?height=2)](https://nodei.co/npm/generator-aspnet-xtianus/)

## Getting Started

- Dependencies:
    - node.js: `brew install node` for OSX, `choco install node` for Windows
    - Yeoman: `npm install -g yo`
- Install: `npm i -g generator-aspnet-xtianus`
- Run: `yo aspnet-xtianus`

**Remember to always yo aspnet-xtianus for this fork**

## Usage

* `yo aspnet-xtianus` shows a wizard for generating a new ASP.NET app

* `yo aspnet --grunt` generates Gruntfile.js files for **web** template instead of gulp.js

* `yo aspnet-xtianus --help` shows flags and other configurable options

## Template projects

Full, template based projects available in generator:

- Empty Application
- Console Application
- Web Application
- Web Application Basic [without Membership and Authorization]
- **Starter Web Application - Foundation 5 [Readme](https://github.com/xtianus79/generator-aspnet/blob/master/templates/projects/foundation5/README.md)**
- Web API Application
- Nancy ASP.NET Application
- Class Library

**Looking to build or add templates to this repo - feel free to help - contact below for more info**

## Starter Web - Foundation 5 Info

[Yeoman](http://yeoman.io) generator for [Zurb Foundation 5](http://foundation.zurb.com/). & for Visual Studio ASP.Net Vnext Integration

### Important notes:

- **F5 template places additonal files & folder structures in your project**
- Folder [app] & [dist] for static html mockup and protyping
- Folder [includes] for _header.cshtml & _footer.cshtml - partials for _Layouts.cshtml
- Files .jshintrc, .editorconfig & index.html included
- Reworked gruntfile.js for a complete frontend development methodology

**Default option here will be Sass with Libsass (for now). But you can choose Ruby version on startup.**

From Foundation 5.5+:
"Foundation is now compatible with Sass 3.4! Note: this removes Sass 3.2 compatability."
[Foundation 5 Changelog](http://foundation.zurb.com/docs/changelog.html)

## Yo ASP.Net Foundation 5 Features!
* Sass compiling
* Font Awesome (option)
* Jade templating engine (option)
* Publishing to dist directory
* Server with LiveReload (127.0.0.1:9000) for *.html
* Server k web (Windows localhost:5001) or k kestrel (OSX, Linux localhost:5004) for *.cshtml
* Bower install
* JSHint

## Grunt tasks:

run project
(compile Jade, compile Sass, bower install, livereload (server on 127.0.0.1:9000), watch)
```
$ grunt
```
publishing project (into dist directory)
(compile Jade, compile Sass, validate-js, copy, concatenation, minifications)
```
$ grunt publish
```
dist directory preview (server on 127.0.0.1:9001)
```
$ grunt server-dist
```

### Other Grunt tasks (if you want to use it)

..for copying app files to wwwroot, fonts & includes folders
```
$ grunt copy-app-files
```
..for copying bower_components files to app/bower_components
```
$ grunt copy-app-files
```
..for injecting bower libraries (also in default grunt task)
```
$ grunt bower-install
```
..for compiling Sass files
```
$ grunt compile-sass
```
..for validating javascript
```
$ grunt validate-js
```
..for compiling Jade files
```
$ grunt compile-jade
```

## Full instructions for SW Foundation 5 Template

[Starter Web Foundation 5: Readme](https://github.com/xtianus79/generator-aspnet/blob/master/templates/projects/foundation5/README.md)
[Starter Web Foundation 5 Getting Started: Wiki](https://github.com/xtianus79/generator-aspnet/blob/master/templates/projects/foundation5/README.md)

The Empty Application, Web Application, Web API Application are based on the new templates recently introduced with Visual Studio CTP 6 release, and you can read about this new templates on blog post accompanying CTP 6 release:  

[ASP.NET 5 Updates and other improvements for Web Developers in Visual Studio 2015 CTP 6](http://blogs.msdn.com/b/webdev/archive/2015/02/23/aspnet-5-updates-for-feb-2015.aspx)

The Empty Application, Web Application, Web Application Basic (a.k.a. Web Application No Auth), Web API Application are based on the new templates recently introduced with Visual Studio 2015 RC release, with updates for `beta5`. You can read about these new templates on the blog post accompanying the `beta5` release:
[Updates to ASP.NET 5 yeoman generators for beta 5](http://blogs.msdn.com/b/webdev/archive/2015/07/04/updates-to-asp-net-5-yeoman-generators-for-beta-5.aspx)

The Nancy project is based on framework's "Hello World" template:
[Nancy Getting Started: Introduction](https://github.com/NancyFx/Nancy/wiki/Introduction)

## Related yeoman generators

The goal of ```generator-aspnet``` is to provide an experience consistent with creating new ASP.NET 5 (_DNX_) projects
and files in Visual Studio 2015. Below are some other related generators that you may be interested in.

### ```generator-csharp```

[```generator-csharp```](https://github.com/OmniSharp/generator-csharp) is a work in progress but is available for you to try out today. The goal of [```generator-csharp```](https://github.com/OmniSharp/generator-csharp) is to provide an experience consistent with creating C# projects (_MSBuild based, not DNX_) and files in Visual Studio 2015.

### ```generator-aspnet-xtianus```

[```generator-aspnet-xtianus```](https://github.com/xtianus79/generator-aspnet) is an extension of OmniSharp/generator-aspnet that comes with a special Foundation 5 SASS/SCSS framework ready out of the box with wiredep & other grunt tasks for advanced front-end development. Look for => [```Starter Web Application - Foundation 5```](https://github.com/xtianus79/generator-aspnet/blob/master/templates/projects/foundation5/README.md). The other goal of this generator is to provide alternative templates to the traditional ASP.NET Visual Studio templates. More templates will become housed under this fork in the near future.  Feel free to participate and learn more about [```generator-aspnet-xtianus```](https://github.com/xtianus79/generator-aspnet).

If you are working on a related generator please [open an issue](https://github.com/OmniSharp/generator-aspnet/issues/new) to let us know about it so that we can add it to the list.

## Sub Generators

Available sub generators (_to create files after the project has been created_):

* [aspnet-xtianus:MvcController](#mvccontroller)
* [aspnet-xtianus:MvcView](#mvcview)
* [aspnet-xtianus:WebApiContoller](#webapicontroller)
* [aspnet-xtianus:AngularModule](#angularmodule)
* [aspnet-xtianus:AngularController](#angularcontroller)
* [aspnet-xtianus:AngularControllerAs](#angularcontrolleras)
* [aspnet-xtianus:AngularDirective](#angulardirective)
* [aspnet-xtianus:AngularFactory](#angularfactory)
* [aspnet-xtianus:Class](#class)
* [aspnet-xtianus:Interface](#interface)
* [aspnet-xtianus:StartupClass](#startupclass)
* [aspnet-xtianus:BowerJson](#bowerjson)
* [aspnet-xtianus:CoffeeScript](#coffeescript)
* [aspnet-xtianus:Config](#config)
* [aspnet-xtianus:Gulpfile](#gulpfile)
* [aspnet-xtianus:Gruntfile](#gruntfile)
* [aspnet-xtianus:gitignore](#gitignore)
* [aspnet-xtianus:HTMLPage](#htmlpage)
* [aspnet-xtianus:JavaScript](#javascript)
* [aspnet-xtianus:JScript](#jscript)
* [aspnet-xtianus:JSON](#json)
* [aspnet-xtianus:JSONSchema](#jsonschema)
* [aspnet-xtianus:JSX](#jsx)
* [aspnet-xtianus:Middleware](#middleware)
* [aspnet-xtianus:PackageJson](#packagejson)
* [aspnet-xtianus:StyleSheet](#stylesheet)
* [aspnet-xtianus:StyleSheetScss](#stylesheetscss)
* [aspnet-xtianus:StyleSheetLess](#stylesheetless)
* [aspnet-xtianus:TagHelper](#taghelper)
* [aspnet-xtianus:TextFile](#textfile)
* [aspnet-xtianus:TypeScript](#typescript)
* [aspnet-xtianus:TypeScriptConfig](#typescriptconfig)

** Note: files generated are created in the working directory, no conventions are forced **

[Return to top](#top)

### MvcController

Creates a new ASP.NET 5 MvcController class

Example:

```
yo aspnet-xtianus:MvcController ContactController
```

Produces `/ContactController.cs`

```cs
using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MyNamespace
{
    public class ContactController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
```

[Return to top](#top)

### MvcView

Creates a new ASP.NET 5 MvcView page file

Example:

```
yo aspnet-xtianus:MvcView ContactView
```

Produces `/ContactView.cshtml`

```
@*
    For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860
*@
@{
    // ViewBag.Title = "ContactView Page";
}

```

[Return to top](#top)

### WebApiController

Creates a new ASP.NET 5 WebApiController class

Example:

```
yo aspnet-xtianus:WebApiController ValuesController
```

Produces `/ValuesController.cs`

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MyNamespace.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
```

[Return to top](#top)

### AngularModule

Creates AngularJS module file

Example:
```
yo aspnet:AngularModule filename
```

Produces `filename.js`

[Return to top](#top)

### AngularController

Creates AngularJS controller file using $scope

Example:
```
yo aspnet:AngularController filename
```

Produces `filename.js`

[Return to top](#top)

### AngularControllerAs

Creates AngularJS controller file using `Controller As` syntax.

Example:
```
yo aspnet:AngularControllerAs filename
```

Produces `filename.js`

[Return to top](#top)

### AngularDirective

Creates AngularJS directive file.

Example:
```
yo aspnet:AngularDirective filename
```

Produces `filename.js`

[Return to top](#top)

### AngularFactory

Creates AngularJS factory file.

Example:
```
yo aspnet:AngularFactory filename
```

Produces `filename.js`

[Return to top](#top)

### Class

Creates a new ASP.NET 5 Class

Example:

```
yo aspnet-xtianus:Class Contact
```

Produces `/Contact.cs`

```cs
using System;

namespace MyNamespace
{
    public class Contact
    {

    }
}
```

[Return to top](#top)

### Interface

Creates a new ASP.NET 5 Interface

Example:

```
yo aspnet:Interface IContact
```

Produces `/IContact.cs`

[Return to top](#top)

### StartupClass

Creates a new Startup Class file

Example:

```
yo aspnet-xtianus:StartupClass
```

Produces `Startup.cs`

[Return to top](#top)

### BowerJson

Creates a new `bower.json` and configuration file.

Example:

```
yo aspnet-xtianus:BowerJson
```

Produces `bower.json` and `.bowerrc`

[Return to top](#top)

### CoffeeScript

Creates a new CoffeeScript file

Example:

```
yo aspnet-xtianus:CoffeeScript filename
```

Produces `filename.coffee`

[Return to top](#top)

### Config

Creates a new config.json file

Example:

```
yo aspnet-xtianus:Config
```

Produces `config.json`

[Return to top](#top)

### Gulpfile

Creates a new Gulp file

Example:

```
yo aspnet-xtianus:Gulpfile
```

Produces `gulpfile.js`

[Return to top](#top)

### Gruntfile

Creates a new `Grunt` file

Example:

```
yo aspnet:Gruntfile
```

Produces `Gruntfile.js`

[Return to top](#top)

### gitignore

Creates a new .gitignore file

Example:

```
yo aspnet:gitignore
```

Produces `.gitignore`

[Return to top](#top)

### HTMLPage

Creates a new HTML file

Example:

```
yo aspnet-xtianus:HTMLPage filename
```

Produces `filename.html`

[Return to top](#top)

### JavaScript

Creates a new JavaScript file

Example:

```
yo aspnet-xtianus:JavaScript filename
```

Produces `filename.js`

[Return to top](#top)

### JScript

Creates a new JavaScript file

Example:

```
yo aspnet-xtianus:JScript filename
```

Produces `filename.js`

[Return to top](#top)

### JSON

Creates a new JSON file

Example:

```
yo aspnet-xtianus:JSON filename
```

Produces `filename.json`

[Return to top](#top)

### JSONSchema

Creates a new JSON schema file

Example:

```
yo aspnet:JSONSchema filename
```

Produces `filename.json`

[Return to top](#top)

### JSX

Creates a new React JSX file

Example:

```
yo aspnet:JSX filename
```

Produces `filename.jsx`

[Return to top](#top)

### Middleware

Creates a new C# Middleware class file

Example:

```
yo aspnet:Middleware filename
```

Produces `filename.cs`

[Return to top](#top)

### PackageJson

Creates a new package.json file

Example:

```
yo aspnet-xtianus:PackageJson
```

Produces `package.json`

[Return to top](#top)

### StyleSheet

Creates a new CSS file

Example:

```
yo aspnet:StyleSheet style
```

Produces `style.css`

[Return to top](#top)

### StyleSheetLess

Creates a new Less class file

Example:

```
yo aspnet:StyleSheetLess filename
```

Produces `filename.less`

[Return to top](#top)

### StyleSheetSCSS

Creates a new Sass SCSS class file

Example:

```
yo aspnet:StyleSheetSCSS filename
```

Produces `filename.scss`

[Return to top](#top)

### TagHelper

Creates a new TagHelper class file

Example:

```
yo aspnet:TagHelper filename
```

Produces `filename.cs`

[Return to top](#top)

### TextFile

Creates a new Text file

Example:

```
yo aspnet-xtianus:TextFile filename
```

Produces `filename.txt`

[Return to top](#top)

### TypeScript

Creates a new TypeScript file

Example:

```
yo aspnet-xtianus:TypeScript filename
```

Produces `filename.ts`

[Return to top](#top)

### TypeScriptConfig

Creates a new TypeScript configuration file

Example:

```
yo aspnet:TypeScriptConfig
```

Produces `tsconfig.json`

[Return to top](#top)

## License

Copyright 2014-2015 OmniSharp

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

### Contact

[@xtianus](https://twitter.com/xtianus79) | [xtianus@live.com](mailto:xtianus@live.com)

### Changelog

..see **Coming soon** [CHANGELOG.md](https://github.com/xtianus79/generator-aspnet/blob/master/CHANGELOG.md) file

[Return to top](#top)
