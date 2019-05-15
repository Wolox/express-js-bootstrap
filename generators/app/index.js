/* eslint-disable no-underscore-dangle */
const Generator = require('yeoman-generator'),
  cfonts = require('cfonts'),
  terminalLink = require('terminal-link'),
  { TRAINING_CONFIG, files, TUTORIALS } = require('./constants'),
  { runCommand } = require('./command'),
  { mkdirp } = require('./utils'),
  prompts = require('./prompts');

const nodeGenerator = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('verbose');
  }

  _checkInstalled(name, link, command) {
    return this._runCommand({
      description: `Checking if ${name} is installed`,
      name: command || name,
      args: ['--version'],
      options: {
        failMessage: `${name} is required to run this generator, check ${terminalLink('this', link)}`
      }
    });
  }

  async initializing() {
    try {
      cfonts.say('NODE JS|KICKOFF', {
        font: 'block',
        align: 'center',
        colors: ['green', 'green'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0'
      });

      await this._checkInstalled('git', TUTORIALS.GIT);
      await this._checkInstalled('npm', TUTORIALS.NPM);
    } catch (e) {
      this.env.error(e);
    }
  }

  async prompting() {
    this.answers = await this.prompt(prompts);
    this.useGit = this.answers.urlRepository !== '';

    if (this.answers.inTraining) {
      this.answers = { ...this.answers, ...TRAINING_CONFIG };
    }
  }

  _destinationPath(fileName) {
    return this.destinationPath(`${this.answers.projectName}/${fileName}`);
  }

  _copyTplPromise(templatePath, filePath, options) {
    return new Promise((resolve, reject) => {
      try {
        this.fs.copyTpl(this.templatePath(templatePath), this._destinationPath(filePath), options);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  _runCommand(params) {
    if (!params.options || params.options.verbose === undefined) {
      params.options = { ...params.options, verbose: this.options.verbose };
    }
    return runCommand(params);
  }

  async _copyTemplate(file) {
    if (file.directory) {
      await mkdirp(this._destinationPath(file.directory));
    }
    const newName = file.name.endsWith('.ejs')
      ? `${file.name.substr(0, file.name.lastIndexOf('.'))}.js`
      : file.newName || file.name;
    const filePath = file.directory ? `${file.directory}/${newName}` : newName;
    const templatePath = file.directory ? `${file.directory}/${file.name}` : file.name;

    await this._copyTplPromise(templatePath, filePath, this.answers);
  }

  async writing() {
    try {
      if (this.useGit) {
        await this._runCommand({
          description: `Cloning repository from ${this.answers.urlRepository}`,
          name: 'git',
          args: ['clone', this.answers.urlRepository, this.answers.projectName]
        });
      }

      files
        .filter(file => !file.condition || file.condition(this.answers))
        .map(file => this._copyTemplate(file));
    } catch (e) {
      this.env.error(e);
    }
  }

  async install() {
    try {
      const spawnOptions = { cwd: this.destinationPath(this.answers.projectName) };
      await this._runCommand({
        description: 'Installing dependencies',
        name: 'npm',
        args: ['install'],
        spawnOptions
      });
      await this._runCommand({
        description: 'Running linter',
        name: 'npm',
        args: ['run', 'lint-fix'],
        spawnOptions
      });
      if (this.useGit) {
        await this._runCommand({
          description: 'Creating branch kickoff',
          name: 'git',
          args: ['checkout', '-b', 'kickoff'],
          spawnOptions
        });
        await this._runCommand({
          description: 'Add changes to git',
          name: 'git',
          args: ['add', '.'],
          spawnOptions
        });
        await this._runCommand({
          description: 'Commit changes to git',
          name: 'git',
          args: ['commit', '-m', 'Kickoff project'],
          spawnOptions
        });
      }
    } catch (e) {
      this.env.error(e);
    }
  }
};

module.exports = nodeGenerator;
