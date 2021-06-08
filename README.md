# cz-jira-smart-commit

A commitizen adapter for [Jira smart commits](https://confluence.atlassian.com/display/FISHEYE/Using+smart+commits).

![Screenshot](other/screen-shot.png)

## Usage

### Global Installation

For a quick global installation of the plugin, simply run the `install.sh` script present in this repo:

```
chmod +x install.sh

./install.sh
```

### Add this adapter

**Use commitizen to init**

```
yarn add -D commitizen
```

```
./node_modules/.bin/commitizen init @vmo11/cz-jira-smart-commit --yarn --dev --exact
```

_Or manual install this adapter_

```
npm install cz-jira-smart-commit
```

Reference it in your `.cz.json` of your project

```json
{
  "path": "node_modules/cz-jira-smart-commit/"
}
```

**Update package.json file**

```
{
    ...
    "scripts": {
        ...
        "commit": "git cz"
    }
}
```

### Day to day work

Instead of `git commit -m 'Your message'`, you type: `yarn commit` with this adapter and it prompts you for:

- Jira Issue Key(s)
- commit message
- Workflow command
- Time Spent
- Comment

And generates your commit based on that.
