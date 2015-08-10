'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var mkdirp = require('mkdirp');
var guid = require('uuid');
var projectName = require('vs_projectname');
var AspnetGenerator = yeoman.generators.Base.extend({

    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
        // only implemented for web template
        this.option('grunt', {
            type: Boolean,
            defaults: false,
            desc: 'Use the Grunt JavaScript task runner instead of Gulp in web projects.'
        });
    },

    init: function() {
        this.log(yosay('Welcome to Xtianus\'s Extended ASP.NET 5 generator!'));
        this.templatedata = {};
    },

    askFor: function() {
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'type',
            message: 'What type of application do you want to create?',
            choices: [{
                    name: 'Empty Application',
                    value: 'empty'
                }, {
                    name: 'Console Application',
                    value: 'console'
                }, {
                    name: 'Web Application',
                    value: 'web'
                }, {
                    name: 'Web Application Basic [without Membership and Authorization]',
                    value: 'webbasic'
                }, {
                    name: 'Starter Web Application - Foundation 5',
                    value: 'foundation5'
                }, {
                    name: 'Web API Application',
                    value: 'webapi'
                }, {
                    name: 'Nancy ASP.NET Application',
                    value: 'nancy'
                }, {
                    name: 'Class Library',
                    value: 'classlib'
                }, {
                   name: 'Unit test project',
                   value: 'unittest'
               }
            ]
        }];

        this.prompt(prompts, function (props) {
            this.type = props.type;

            done();
        }.bind(this));
    },

    askForName: function() {
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
            case 'webbasic':
                app = 'WebApplicationBasic';
                break;
            case 'foundation5':
                app = 'Foundation5Application';
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
        if (this.type == 'foundation5') {
            var prompts = [{
                name: 'applicationName',
                message: 'Set the default ASPNET C# namespace? Default =',
                default: '' + process.cwd().split(path.sep).pop() + ''
            }];
        } else {
            var prompts = [{
                name: 'applicationName',
                message: 'What\'s the name of your ASP.NET application and directory?',
                default: app
            }];
        }
        this.prompt(prompts, function (props) {
            this.templatedata.namespace = projectName(props.applicationName);
            this.templatedata.applicationname = props.applicationName;
            this.applicationName = props.applicationName;
            this.templatedata.guid = guid.v4();
            this.templatedata.grunt = this.options.grunt || false;
            done();
        }.bind(this));
    },

    writing: function() {
        this.sourceRoot(path.join(__dirname, './templates/projects'));

        switch (this.type) {

            case 'empty':

                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

                this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

                this.copy(this.sourceRoot() + '/hosting.ini', this.applicationName + '/hosting.ini');

                this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

                this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

                /// wwwroot
                this.fs.copy(this.templatePath('/wwwroot'), this.destinationPath(this.applicationName + '/wwwroot'));
                break;

            case 'webapi':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
                this.fs.copy(this.sourceRoot() + '/hosting.ini', this.applicationName + '/hosting.ini');
                this.fs.copyTpl(this.sourceRoot() + '/Startup.cs', this.applicationName + '/Startup.cs', this.templatedata);
                this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');
                this.fs.copy(this.sourceRoot() + '/Properties', this.applicationName + '/Properties');
                this.fs.copyTpl(this.sourceRoot() + '/Controllers/ValuesController.cs', this.applicationName + '/Controllers/ValuesController.cs', this.templatedata);
                this.fs.copy(this.templatePath('/wwwroot'), this.destinationPath(this.applicationName + '/wwwroot'));
                break;

            case 'web':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                // Grunt or Gulp
                if (this.options.grunt) {
                  this.fs.copyTpl(this.templatePath('Gruntfile.js'), this.applicationName + '/Gruntfile.js', this.templatedata);
                } else {
                  this.fs.copyTpl(this.templatePath('gulpfile.js'), this.applicationName + '/gulpfile.js', this.templatedata);
                }
                // individual files (configs, etc)
                this.fs.copy(this.templatePath('.bowerrc'), this.applicationName + '/.bowerrc');
                this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
                this.fs.copyTpl(this.templatePath('bower.json'), this.applicationName + '/bower.json', this.templatedata);
                this.fs.copyTpl(this.templatePath('config.json'), this.applicationName + '/config.json', this.templatedata);
                this.fs.copy(this.templatePath('hosting.ini'), this.applicationName + '/hosting.ini');
                this.fs.copyTpl(this.templatePath('package.json'), this.applicationName + '/package.json', this.templatedata);
                this.fs.copyTpl(this.templatePath('project.json'), this.applicationName + '/project.json', this.templatedata);
                this.fs.copy(this.templatePath('README.md'), this.applicationName + '/README.md');
                this.fs.copyTpl(this.templatePath('Startup.cs'), this.applicationName + '/Startup.cs', this.templatedata);
                // Controllers
                this.fs.copyTpl(this.templatePath('Controllers/AccountController.cs'), this.applicationName + '/Controllers/AccountController.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('Controllers/HomeController.cs'), this.applicationName + '/Controllers/HomeController.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('Controllers/ManageController.cs'), this.applicationName + '/Controllers/ManageController.cs', this.templatedata);
                // Migrations
                this.fs.copyTpl(this.templatePath('Migrations/00000000000000_CreateIdentitySchema.Designer.cs'), this.applicationName + '/Migrations/00000000000000_CreateIdentitySchema.Designer.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('Migrations/00000000000000_CreateIdentitySchema.cs'), this.applicationName + '/Migrations/00000000000000_CreateIdentitySchema.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('Migrations/ApplicationDbContextModelSnapshot.cs'), this.applicationName + '/Migrations/ApplicationDbContextModelSnapshot.cs', this.templatedata);
                // Models
                this.fs.copyTpl(this.templatePath('Models/AccountViewModels.cs'), this.applicationName + '/Models/AccountViewModels.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('Models/IdentityModels.cs'), this.applicationName + '/Models/IdentityModels.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('Models/ManageViewModels.cs'), this.applicationName + '/Models/ManageViewModels.cs', this.templatedata);
                // Services
                this.fs.copyTpl(this.templatePath('Services/MessageServices.cs'), this.applicationName + '/Services/MessageServices.cs', this.templatedata);
                // Views
                this.fs.copyTpl(this.templatePath('Views/**/*'), this.applicationName + '/Views', this.templatedata);
                // wwwroot - the content in the wwwroot does not include any direct references or imports
                // So again it is copied 1-to-1 - but tests cover list of all files
                this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationName + '/wwwroot');
                break;
            case 'webbasic':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                // Grunt or Gulp
                if (this.options.grunt) {
                  this.fs.copyTpl(this.templatePath('Gruntfile.js'), this.applicationName + '/Gruntfile.js', this.templatedata);
                } else {
                  this.fs.copyTpl(this.templatePath('gulpfile.js'), this.applicationName + '/gulpfile.js', this.templatedata);
                }
                // individual files (configs, etc)
                this.fs.copy(this.templatePath('.bowerrc'), this.applicationName + '/.bowerrc');
                this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
                this.fs.copyTpl(this.templatePath('bower.json'), this.applicationName + '/bower.json', this.templatedata);
                this.fs.copyTpl(this.templatePath('config.json'), this.applicationName + '/config.json', this.templatedata);
                this.fs.copy(this.templatePath('hosting.ini'), this.applicationName + '/hosting.ini');
                this.fs.copyTpl(this.templatePath('package.json'), this.applicationName + '/package.json', this.templatedata);
                this.fs.copyTpl(this.templatePath('project.json'), this.applicationName + '/project.json', this.templatedata);
                this.fs.copy(this.templatePath('README.md'), this.applicationName + '/README.md');
                this.fs.copyTpl(this.templatePath('Startup.cs'), this.applicationName + '/Startup.cs', this.templatedata);
                // Controllers
                this.fs.copyTpl(this.templatePath('Controllers/HomeController.cs'), this.applicationName + '/Controllers/HomeController.cs', this.templatedata);
                // Views
                this.fs.copyTpl(this.templatePath('Views/**/*'), this.applicationName + '/Views', this.templatedata);
                // wwwroot - the content in the wwwroot does not include any direct references or imports
                // So again it is copied 1-to-1 - but tests cover list of all files
                this.fs.copy(this.templatePath('wwwroot/**/*'), this.applicationName + '/wwwroot');
                break;
            case 'foundation5':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                if (this.options.gulp) {
                  this.fs.copyTpl(this.templatePath('gulpfile.js'), this.applicationName + '/gulpfile.js', this.templatedata);
                } else {
                  this.fs.copyTpl(this.templatePath('Gruntfile.js'), this.applicationName + '/Gruntfile.js', this.templatedata);
                }
                // individual files (configs, etc)
                this.fs.copy(this.templatePath('/.bowerrc'), '/.bowerrc');
                this.fs.copy(this.sourceRoot() + '/../../gitignore.txt', '/.gitignore');
                this.fs.copyTpl(this.templatePath('/bower.json'), '/bower.json', this.templatedata);
                this.fs.copyTpl(this.templatePath('/config.json'), '/config.json', this.templatedata);
                this.fs.copy(this.templatePath('/hosting.ini'), '/hosting.ini');
                this.fs.copyTpl(this.templatePath('/package.json'), '/package.json', this.templatedata);
                this.fs.copyTpl(this.templatePath('/project.json'), '/project.json', this.templatedata);
                this.fs.copy(this.templatePath('/README.md'), '/README.md');
                this.fs.copyTpl(this.templatePath('/Startup.cs'), '/Startup.cs', this.templatedata);
                // Controllers
                this.fs.copyTpl(this.templatePath('/Controllers/AccountController.cs'), 'Controllers/AccountController.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('/Controllers/HomeController.cs'), 'Controllers/HomeController.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('/Controllers/ManageController.cs'), 'Controllers/ManageController.cs', this.templatedata);
                // Migrations
                this.fs.copyTpl(this.templatePath('/Migrations/00000000000000_CreateIdentitySchema.Designer.cs'), 'Migrations/00000000000000_CreateIdentitySchema.Designer.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('/Migrations/00000000000000_CreateIdentitySchema.cs'), 'Migrations/00000000000000_CreateIdentitySchema.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('/Migrations/ApplicationDbContextModelSnapshot.cs'), 'Migrations/ApplicationDbContextModelSnapshot.cs', this.templatedata);
                // Models
                this.fs.copyTpl(this.templatePath('/Models/AccountViewModels.cs'), 'Models/AccountViewModels.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('/Models/IdentityModels.cs'), 'Models/IdentityModels.cs', this.templatedata);
                this.fs.copyTpl(this.templatePath('/Models/ManageViewModels.cs'), 'Models/ManageViewModels.cs', this.templatedata);
                // Services
                this.fs.copyTpl(this.templatePath('/Services/MessageServices.cs'), 'Services/MessageServices.cs', this.templatedata);
                // Views
                this.fs.copyTpl(this.templatePath('/Views/**/*'), 'Views', this.templatedata);
                // wwwroot - the content in the wwwroot does not include any direct references or imports
                // So again it is copied 1-to-1 - but tests cover list of all files
                this.fs.copy(this.templatePath('/wwwroot/**/*'), 'wwwroot');
                break;
            case 'nancy':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

                this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

                this.template(this.sourceRoot() + '/startup.cs', this.applicationName + '/Startup.cs', this.templatedata);

                this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

                this.template(this.sourceRoot() + '/homemodule.cs', this.applicationName + '/HomeModule.cs', this.templatedata);

                break;
            case 'console':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');
                this.template(this.sourceRoot() + '/program.cs', this.applicationName + '/Program.cs', this.templatedata);
                this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

                break;
            case 'classlib':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

                this.copy(this.sourceRoot() + '/../../gitignore.txt', this.applicationName + '/.gitignore');

                this.template(this.sourceRoot() + '/class.cs', this.applicationName + '/Class1.cs', this.templatedata);

                this.copy(this.sourceRoot() + '/project.json', this.applicationName + '/project.json');

                break;
            case 'unittest':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                this.fs.copy(this.templatePath('**.*'), this.destinationPath(this.applicationName));
                break;
            default:
                this.log('Unknown project type');
        }
    },

    askForGruntBuild: function () {
        if (this.type == 'foundation5') {
            var cb = this.async();

            this.log(chalk.bold.red('==================================================================================='));
            this.log(chalk.bold.yellow('    Welcome to ASP.NET Extended Starter Web - Foundation 5 - Generator!'));
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
        if (this.type == 'foundation5') {
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
        if (this.type == 'foundation5') {
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
        if (this.type == 'foundation5') {
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
        if (this.type == 'foundation5') {
            this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));

            mkdirp('app');
            mkdirp('app/bower_components');
            mkdirp('dist');
            mkdirp('includes');
            mkdirp('wwwroot/dist');
            this.copy(this.sourceRoot() + '/.jshintrc', '.jshintrc');
            this.copy(this.sourceRoot() + '/.bowerrc', '.bowerrc');
            this.copy(this.sourceRoot() + '/.editorconfig', '.editorconfig');
            this.copy(this.sourceRoot() + '/README.md', 'README.md');
            //this.copy(this.sourceRoot() + '/gitignore', '.gitignore');
            if (this.templatedata.jade) {
                this.template(this.sourceRoot() + '/jade/index.jade', 'app/index.jade', this.templatedata);
                this.template(this.sourceRoot() + '/jade/header.jade', 'app/header.jade', this.templatedata);
                this.copy(this.sourceRoot() + '/jade/footer.jade', 'app/footer.jade', this.templatedata);
                this.template(this.sourceRoot() + '/_header.cshtml', 'app/_header.cshtml', this.templatedata);
                this.template(this.sourceRoot() + '/_footer.cshtml', 'app/_footer.cshtml', this.templatedata);
            } else {
                this.template(this.sourceRoot() + '/index.html', 'app/index.html', this.templatedata);
                this.template(this.sourceRoot() + '/_header.cshtml', 'app/_header.cshtml', this.templatedata);
                this.template(this.sourceRoot() + '/_footer.cshtml', 'app/_footer.cshtml', this.templatedata);
            }
            mkdirp('app/fonts');
            mkdirp('app/images');
            mkdirp('app/js');
            mkdirp('app/css');
            mkdirp('app/scss');
            this.copy(this.sourceRoot() + '/scss/app.scss', 'app/scss/app.scss');
            this.copy(this.sourceRoot() + '/scss/_settings.scss', 'app/scss/_settings.scss');
            this.template(this.sourceRoot() + '/scss/_appstyles.scss', 'app/scss/_appstyles.scss', this.templatedata);
            this.copy(this.sourceRoot() + '/js/app.js', 'app/js/app.js');
            this.copy(this.sourceRoot() + '/css/template_override.css', 'app/css/app_override.css');
        }
    },

    end: function() {
        if (this.templatedata.grunt) {
            this.installDependencies({
                bower: true,
                npm: true,
                skipInstall: false,
                callback: function () {
                    console.log(chalk.bold.red('==================================================================================='));
                    console.log('\r');
                    console.log(chalk.bold.yellow('    Almost finished... || Below are the DNX / DNVM commands to get going'));
                    console.log('\r');
                    console.log(chalk.bold.red('==================================================================================='));
                    console.log('\r');
                    console.log(chalk.green('    dnu restore'));
                    console.log(chalk.green('    dnu build'));
                    console.log(chalk.green('    dnx . run') + ' for console projects');
                    console.log(chalk.green('    dnx . kestrel') + ' or ' + chalk.green('dnx . web') + ' for web projects');
                    console.log('\r');
                    console.log(chalk.bold.red('==================================================================================='));
                    console.log('\r');
                    console.log('    Running ' + chalk.styles.cyan.open + '[ ' + chalk.styles.cyan.close + chalk.styles.green.open + 'grunt bower-install' + chalk.styles.green.close + chalk.styles.cyan.open + ' ]' + chalk.styles.cyan.close + ' || Enter ' + chalk.styles.cyan.open + '[ ' + chalk.styles.cyan.close + chalk.styles.green.open + 'grunt' + chalk.styles.green.close + chalk.styles.cyan.open + ' ]' + chalk.styles.cyan.close + ' = default task command');
                    console.log('\r');
                    console.log(chalk.bold.red('==================================================================================='));
                    console.log('\r');
                }
            });
            this.on('end', function () {
                this.spawnCommand('grunt', ['bower-install']);
            });
        } else {
            this.log('\r\n');
            this.log(chalk.bold.yellow('    Run this command -> [cd ' + this.applicationName + '] to enable the commands below'));
            this.log('\r\n');
            this.log('  Your project is now created, you can use the following commands to get going');
            this.log(chalk.green('    dnu restore'));
            this.log(chalk.green('    dnu build'));
            this.log(chalk.green('    dnx . run') + ' for console projects');
            this.log(chalk.green('    dnx . kestrel') + ' or ' + chalk.green('dnx . web') + ' for web projects');
            this.log('\r\n');
        }
    }
});

module.exports = AspnetGenerator;
