var inquirer = require('inquirer');

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = {
  prompter: prompter,
  formatCommit: formatCommit,
};

// When a user runs `git cz`, prompter will
// be executed. We pass you cz, which currently
// is just an instance of inquirer.js. Using
// this you can ask questions and get answers.
//
// The commit callback should be executed when
// you're ready to send back a commit template
// to git.
//
// By default, we'll de-indent your commit
// template and will keep empty lines.
function prompter(cz, commit) {
  // Let's ask some questions of the user
  // so that we can populate our commit
  // template.
  //
  // See inquirer.js docs for specifics.
  // You can also opt to use another input
  // collection library if you prefer.
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        message:
          "Select the type of change that you're committing (required):\n",
        choices: [
          { value: 'Feat', name: 'Feat:     A new feature' },
          { value: 'Fix', name: 'Fix:      A bug fix' },
          { value: 'Docs', name: 'Docs:     Documentation only changes' },
          {
            value: 'Style',
            name:
              'Style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
          },
          {
            value: 'Refactor',
            name:
              'Refactor: A code change that neither fixes a bug nor adds a feature',
          },
          {
            value: 'Perf',
            name: 'Perf:     A code change that improves performance',
          },
          { value: 'Test', name: 'Test:     Adding missing tests' },
          {
            value: 'Chore',
            name:
              'Chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
          },
        ],
      },
      {
        type: 'input',
        name: 'issues',
        message: 'Jira Issue ID(s):\n',
      },
      {
        type: 'input',
        name: 'message',
        message: 'Commit message (required):\n',
        validate: function (input) {
          if (!input) {
            return 'empty commit message';
          } else {
            return true;
          }
        },
      },
      {
        type: 'input',
        name: 'workflow',
        message:
          'Workflow command (eg: to-do, in-progress, in-review, in-testing, done, etc.) (optional):\n',
        validate: function (input) {
          if (input && input.indexOf(' ') !== -1) {
            return 'Workflows cannot have spaces in smart commits. If your workflow name has a space, use a dash (-)';
          } else {
            return true;
          }
        },
      },
      {
        type: 'input',
        name: 'time',
        message: 'Time spent (i.e. 3h 15m) (optional):\n',
      },
      {
        type: 'input',
        name: 'comment',
        message: 'Jira comment (optional):\n',
      },
      {
        type: 'input',
        name: 'info',
        message:
          'More info for detail (eg: link to JIRA task or any notes) (optional):\n',
      },
    ])
    .then((answers) => {
      formatCommit(commit, answers);
    });
}

function formatCommit(commit, answers) {
  commit(
    filter([
      answers.type + ': ',
      answers.issues ? '[' + answers.issues + ']' : undefined,
      answers.message,
      answers.workflow ? '#' + answers.workflow : undefined,
      answers.time ? '#time ' + answers.time : undefined,
      answers.comment ? '#comment ' + answers.comment : undefined,
      answers.info ? '\n\n' + answers.info : undefined,
    ]).join(' ')
  );
}

function filter(array) {
  return array.filter(function (item) {
    return !!item;
  });
}
