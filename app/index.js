'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var AspnetGenerator = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        // only implemented for web template
        this.option('gulp');
    },


    init: function () {
        this.log(yosay('Welcome to the marvellous ASP.NET 5 generator!'));

        this.pkg = require('../package.json');
        this.templatedata = {};
        this.config.save();

        if (this.templatedata.grunt) {
            this.on('end', function () {
                this.spawnCommand('grunt', ['bower-install']);
            });
        }
    },

    askFor: function () {
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'type',
            message: 'What type of application do you want to create?',
            choices: [
                {
                    name: 'Empty Application',
                    value: 'empty'
                },
                {
                    name: 'Console Application',
                    value: 'console'
                },
                {
                    name: 'Web Application',
                    value: 'web'
                },
                {
                    name: 'Christian\'s Starter Web Application - Foundation 5 / Sass',
                    value: 'christian'
                },
                {
                    name: 'Web API Application',
                    value: 'webapi'
                },
                {
                    name: 'Nancy ASP.NET Application',
                    value: 'nancy'
                },
                {
                    name: 'Class Library',
                    value: 'classlib'
                },
//                {
//                    name: 'Unit test project',
//                    value: 'unittest'
//                }
            ]
        }];

        this.prompt(prompts, function (props) {
            this.type = props.type;

            done();
        }.bind(this));
    },

    askForName: function () {
        var done = this.async();
        var app = '';
        switch (this.type) {
            case 'empty':
                app = 'EmptyApplication';
                break;
            case 'console':
                app = 'ConsoleApplication';
                break;
            case 'web':
                app = 'WebApplication';
                break;
            case 'christian':
                app = 'ChristianApplication';
                break;
            case 'webapi':
                app = 'WebAPIApplication';
                break;
            case 'nancy':
                app = 'NancyApplication'
                break;
            case 'classlib':
                app = 'ClassLibrary'
                break;
            case 'unittest':
                app = 'UnitTest'
                break;
        }
        var prompts = [{
            name: 'applicationName',
            message: 'What\'s the name of your ASP.NET application? Default =',
            default: '' + process.cwd().split(path.sep).pop() + ''
        }];
        this.prompt(prompts, function (props) {
            this.templatedata.namespace = props.applicationName;
            this.templatedata.applicationname = props.applicationName;
            this.applicationName = props.applicationName;

            done();
        }.bind(this));
    },

    writing: function () {
        this.sourceRoot(path.join(__dirname, '../samples/'));

        if (!this.type == 'christian') {
            this.mkdir(this.applicationName);
        }
        switch (this.type) {

            case 'empty':

                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

                this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

                this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

                /// wwwroot
                this.directory(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');

                break;

            case 'webapi':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

                this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

                this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

                this.template(this.sourceRoot() + '/controllers_home.cs', this.applicationName + '/Controllers/HomeController.cs', this.templatedata);

                this.template(this.sourceRoot() + '/controllers_values.cs', this.applicationName + '/Controllers/ValuesController.cs', this.templatedata);

                this.template(this.sourceRoot() + '/views_home_index.cshtml', this.applicationName + '/Views/Home/Index.cshtml');

                /// wwwroot
                this.directory(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');

                break;

            case 'web':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

                this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

                this.template(this.sourceRoot() + '/bower.json', this.applicationName + '/bower.json', this.templatedata);

                this.template(this.sourceRoot() + '/config.json', this.applicationName + '/config.json', this.templatedata);

                if (this.options.gulp) {
                    this.copy(this.sourceRoot() + '/_gulp_project.json', this.applicationName + '/project.json');

                    this.template(this.sourceRoot() + '/_gulp_package.json', this.applicationName + '/package.json', this.templatedata);

                    this.copy(this.sourceRoot() + '/_gulpfile.js', this.applicationName + '/gulpfile.js');

                } else {

                    this.copy(this.sourceRoot() + '/_grunt_project.json', this.applicationName + '/project.json');

                    this.template(this.sourceRoot() + '/_grunt_package.json', this.applicationName + '/package.json', this.templatedata);

                    this.copy(this.sourceRoot() + '/_gruntfile.js', this.applicationName + '/gruntfile.js');

                }

                // models
                this.template(this.sourceRoot() + '/models_accountview.cs', this.applicationName + '/Models/AccountViewModels.cs', this.templatedata);

                this.template(this.sourceRoot() + '/models_identity.cs', this.applicationName + '/Models/IdentityModels.cs', this.templatedata);

                // controllers
                this.template(this.sourceRoot() + '/controllers_account.cs', this.applicationName + '/Controllers/AccountController.cs', this.templatedata);

                this.template(this.sourceRoot() + '/controllers_home.cs', this.applicationName + '/Controllers/HomeController.cs', this.templatedata);

                // compiler
                this.template(this.sourceRoot() + '/compiler_preprocess_razorprecompilation.cs', this.applicationName + '/Compiler/Preprocess/RazorPreCompilation.cs', this.templatedata);

                //migrations
                this.template(this.sourceRoot() + '/migrations_000000000000000_createidentityschema.cs', this.applicationName + '/Migrations/000000000000000_CreateIdentitySchema.cs', this.templatedata);

                this.template(this.sourceRoot() + '/migrations_applicationdbcontextmodelsnapshot.cs', this.applicationName + '/Migrations/ApplicationDbContextModelSnapshot.cs', this.templatedata);

                // views
                this.template(this.sourceRoot() + '/views_home_contact.cshtml', this.applicationName + '/Views/Home/Contact.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_home_about.cshtml', this.applicationName + '/Views/Home/About.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_home_index.cshtml', this.applicationName + '/Views/Home/Index.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_account_login.cshtml', this.applicationName + '/Views/Account/Login.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_account_manage.cshtml', this.applicationName + '/Views/Account/Manage.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_account_register.cshtml', this.applicationName + '/Views/Account/Register.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_account_changepasswordpartial.cshtml', this.applicationName + '/Views/Account/_ChangePasswordPartial.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_shared_error.cshtml', this.applicationName + '/Views/Shared/Error.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_shared_layout.cshtml', this.applicationName + '/Views/Shared/_Layout.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_shared_loginpartial.cshtml', this.applicationName + '/Views/Shared/_LoginPartial.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_viewstart.cshtml', this.applicationName + '/Views/_ViewStart.cshtml', this.templatedata);

                /// wwwroot
                this.directory(this.sourceRoot() + '/wwwroot', this.applicationName + '/wwwroot');
                break;
            case 'christian':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

                this.template(this.sourceRoot() + '/startup.cs', /*this.applicationName +*/ '/Startup.cs', this.templatedata);

                this.template(this.sourceRoot() + '/bower.json', /*this.applicationName +*/ '/bower.json', this.templatedata);

                this.template(this.sourceRoot() + '/config.json', /*this.applicationName +*/ '/config.json', this.templatedata);

                if (this.options.gulp) {
                    this.copy(this.sourceRoot() + '/_gulp_project.json', /*this.applicationName +*/ '/project.json');

                    this.template(this.sourceRoot() + '/_gulp_package.json', /*this.applicationName +*/ '/package.json', this.templatedata);

                    this.copy(this.sourceRoot() + '/_gulpfile.js', /*this.applicationName +*/ '/gulpfile.js');

                } else {

                    this.copy(this.sourceRoot() + '/_grunt_project.json', /*this.applicationName +*/ '/project.json');

                    this.template(this.sourceRoot() + '/_grunt_package.json', /*this.applicationName +*/ '/package.json', this.templatedata);

                    this.template(this.sourceRoot() + '/_gruntfile.js', /*this.applicationName +*/ '/gruntfile.js', this.templatedata);

                }

                // models
                this.template(this.sourceRoot() + '/models_accountview.cs', /*this.applicationName +*/ '/Models/AccountViewModels.cs', this.templatedata);

                this.template(this.sourceRoot() + '/models_identity.cs', /*this.applicationName +*/ '/Models/IdentityModels.cs', this.templatedata);

                // controllers
                this.template(this.sourceRoot() + '/controllers_account.cs', /*this.applicationName +*/ '/Controllers/AccountController.cs', this.templatedata);

                this.template(this.sourceRoot() + '/controllers_home.cs', /*this.applicationName +*/ '/Controllers/HomeController.cs', this.templatedata);

                // compiler
                this.template(this.sourceRoot() + '/compiler_preprocess_razorprecompilation.cs', /*this.applicationName +*/ '/Compiler/Preprocess/RazorPreCompilation.cs', this.templatedata);

                //migrations
                this.template(this.sourceRoot() + '/migrations_000000000000000_createidentityschema.cs', /*this.applicationName +*/ '/Migrations/000000000000000_CreateIdentitySchema.cs', this.templatedata);

                this.template(this.sourceRoot() + '/migrations_applicationdbcontextmodelsnapshot.cs', /*this.applicationName +*/ '/Migrations/ApplicationDbContextModelSnapshot.cs', this.templatedata);

                // views
                this.template(this.sourceRoot() + '/views_home_contact.cshtml', /*this.applicationName +*/ '/Views/Home/Contact.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_home_about.cshtml', /*this.applicationName +*/ '/Views/Home/About.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_home_index.cshtml', /*this.applicationName +*/ '/Views/Home/Index.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_account_login.cshtml', /*this.applicationName +*/ '/Views/Account/Login.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_account_manage.cshtml', /*this.applicationName +*/ '/Views/Account/Manage.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_account_register.cshtml', /*this.applicationName +*/ '/Views/Account/Register.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_account_changepasswordpartial.cshtml', /*this.applicationName +*/ '/Views/Account/_ChangePasswordPartial.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_shared_error.cshtml', /*this.applicationName +*/ '/Views/Shared/Error.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_shared_layout.cshtml', /*this.applicationName +*/ '/Views/Shared/_Layout.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_shared_loginpartial.cshtml', /*this.applicationName +*/ '/Views/Shared/_LoginPartial.cshtml', this.templatedata);

                this.template(this.sourceRoot() + '/views_viewstart.cshtml', /*this.applicationName +*/ '/Views/_ViewStart.cshtml', this.templatedata);

                /// wwwroot
                this.directory(this.sourceRoot() + '/wwwroot', /*this.applicationName +*/ '/wwwroot');
                break;
            case 'nancy':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

                this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

                this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

                this.template(this.sourceRoot() + '/homemodule.cs', this.applicationName + '/HomeModule.cs', this.templatedata);
                break;
            case 'console':
            case 'classlib':
            case 'unittest':
                this.directory(this.type, this.applicationName);
                break;
            default:
                this.log('Unknown project type');
        }
    },

    askForGruntBuild: function () {
        if (this.type == 'christian') {
            var cb = this.async();

            this.log(chalk.bold.red('==================================================================================='));
            this.log(chalk.bold.yellow('    Welcome to Christian\'s OminiSharp ASP.NET Plus - Foundation 5 - Generator!'));
            this.log(chalk.bold.red('==================================================================================='));

            var prompts = {
                type: 'confirm',
                name: 'grunt',
                message: chalk.yellow('  Would you like us to complete your NPM and Bower dependency installation?'),
                default: true
            };

            this.prompt(prompts, function (props) {
                this.templatedata.grunt = props.grunt;

                cb();
            }.bind(this));
        }
    },

    askForFontAwesome: function () {
        if (this.type == 'christian') {
            var cb = this.async();

            this.log(chalk.bold.red('==================================================================================='));

            var prompts = {
                type: 'confirm',
                name: 'fontAwesome',
                message: chalk.yellow('  Would you like to include Font Awesome? (FA gives you scalable vector icons..)'),
                default: true
            };

            this.prompt(prompts, function (props) {
                this.templatedata.fontAwesome = props.fontAwesome;

                cb();
            }.bind(this));
        }
    },

    askForCompass: function () {
        if (this.type == 'christian') {
            var cb = this.async();

            this.log(chalk.bold.red('==================================================================================='));
            var prompts = {
                type: 'confirm',
                name: 'compass',
                message: chalk.yellow('  Would you like to use Scss with Compass? (default: Scss with Libsass)'),
                default: false
            };

            this.prompt(prompts, function (props) {
                this.templatedata.compass = props.compass;

                cb();
            }.bind(this));
        }
    },

    askForJade: function () {
        if (this.type == 'christian') {
            var cb = this.async();

            this.log(chalk.bold.red('==================================================================================='));
            var prompts = {
                type: 'confirm',
                name: 'jade',
                message: chalk.yellow('  Would you like to use Jade? (templating engine) [experimental]'),
                default: false
            };

            this.prompt(prompts, function (props) {
                this.templatedata.jade = props.jade;

                cb();
            }.bind(this));
        }
    },

    app: function () {
        if (this.type == 'christian') {
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

            this.mkdir(/*this.applicationName +*/ 'app');
            this.mkdir(/*this.applicationName +*/ 'app/bower_components');
            this.mkdir(/*this.applicationName +*/ 'dist');
            this.copy(this.sourceRoot() + '/.jshintrc', /*this.applicationName +*/ '/.jshintrc');
            this.copy(this.sourceRoot() + '/.bowerrc', /*this.applicationName +*/ '/.bowerrc');
            this.copy(this.sourceRoot() + '/.editorconfig', /*this.applicationName +*/ '/.editorconfig');
            //this.copy(this.sourceRoot() + '/gitignore', '.gitignore');
            if (this.templatedata.jade) {
                this.template(this.sourceRoot() + '/jade/index.jade', /*this.applicationName +*/ '/app/index.jade', this.templatedata);
                this.template(this.sourceRoot() + '/jade/header.jade', /*this.applicationName +*/ '/app/header.jade', this.templatedata);
                this.copy(this.sourceRoot() + '/jade/footer.jade', /*this.applicationName +*/ '/app/footer.jade', this.templatedata);
            } else {
                this.template(this.sourceRoot() + '/index.html', /*this.applicationName +*/ '/app/index.html', this.templatedata);
                this.template(this.sourceRoot() + '/index.cshtml', /*this.applicationName +*/ '/app/index.cshtml', this.templatedata);
                this.template(this.sourceRoot() + '/_Layout.cshtml', /*this.applicationName +*/ '/app/_Layout.cshtml', this.templatedata);
            }
            this.mkdir(/*this.applicationName +*/ 'app/fonts');
            this.mkdir(/*this.applicationName +*/ 'app/images');
            this.mkdir(/*this.applicationName +*/ 'app/js');
            this.mkdir(/*this.applicationName +*/ 'app/css');
            this.mkdir(/*this.applicationName +*/ 'app/scss');
            this.copy(this.sourceRoot() + '/scss/app.scss', /*this.applicationName +*/ '/app/scss/app.scss');
            this.copy(this.sourceRoot() + '/scss/_settings.scss', /*this.applicationName +*/ '/app/scss/_settings.scss');
            this.template(this.sourceRoot() + '/scss/_appstyles.scss', /*this.applicationName +*/ '/app/scss/_appstyles.scss', this.templatedata);
            this.copy(this.sourceRoot() + '/js/app.js', /*this.applicationName +*/ '/app/js/app.js');
            this.copy(this.sourceRoot() + '/css/template_override.css', /*this.applicationName +*/ '/app/css/app_override.css');
        }
    },

    end: function () {
        if (this.templatedata.grunt) {
            this.installDependencies({
                bower: true,
                npm: true,
                skipInstall: false,
                callback: function () {
                    console.log('\r\n');
                    console.log(chalk.bold.red('  Everything is ready!'));
                    console.log('\r\n');
                    console.log('  Your project is now created, you can use the following commands to get going');
                    console.log(chalk.green('    kpm restore'));
                    console.log(chalk.green('    kpm build'));
                    console.log(chalk.green('    k run') + ' for console projects');
                    console.log(chalk.green('    k kestrel') + ' or ' + chalk.green('k web') + ' for web projects');
                    console.log('\r\n');
                    console.log(chalk.bold.yellow('    grunt = default command'));
                }
            });
        } else {
            this.log('\r\n');
            this.log(chalk.bold.yellow('    Run this command -> [cd ' + this.applicationName + '] to enable the commands below'));
            this.log('\r\n');
            this.log('  Your project is now created, you can use the following commands to get going');
            this.log(chalk.green('    kpm restore'));
            this.log(chalk.green('    kpm build'));
            this.log(chalk.green('    k run') + ' for console projects');
            this.log(chalk.green('    k kestrel') + ' or ' + chalk.green('k web') + ' for web projects');
            this.log('\r\n');
        }
    }

});

module.exports = AspnetGenerator;
