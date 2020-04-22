const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const czJiraSmartCommit = require('./index.js');

describe('prompt for inputs', () => {
  it('should be a function', () => {
    expect(czJiraSmartCommit.prompter).to.be.a('function');
  });
});

describe('format commits', () => {
  const type = 'feat';
  const issues = 'CZ-234 CZ-235';
  const message = 'sample commit message';
  const workflow = 'done';
  const time = '3y 2w 7d 8h 30m';
  const comment = 'This took waaaaay too long';

  it('should be a function', () => {
    expect(czJiraSmartCommit.formatCommit).to.be.a('function');
  });
  it('should perform a full commit', () => {
    czJiraSmartCommit.formatCommit(
      (result) => {
        expect(result).to.equal(
          'feat:  [CZ-234 CZ-235] sample commit message #done #time 3y 2w 7d 8h 30m #comment This took waaaaay too long'
        );
      },
      { type, issues, message, workflow, time, comment }
    );
  });
  it('should commit without a workflow', () => {
    czJiraSmartCommit.formatCommit(
      (result) => {
        expect(result).to.equal(
          'feat:  [CZ-234 CZ-235] sample commit message #time 3y 2w 7d 8h 30m #comment This took waaaaay too long'
        );
      },
      { type, issues, message, time, comment }
    );
  });
  it('should commit without a time', () => {
    czJiraSmartCommit.formatCommit(
      (result) => {
        expect(result).to.equal(
          'feat:  [CZ-234 CZ-235] sample commit message #done #comment This took waaaaay too long'
        );
      },
      { type, issues, message, workflow, comment }
    );
  });
  it('should commit without a comment', () => {
    czJiraSmartCommit.formatCommit(
      (result) => {
        expect(result).to.equal(
          'feat:  [CZ-234 CZ-235] sample commit message #done #time 3y 2w 7d 8h 30m'
        );
      },
      { type, issues, message, workflow, time }
    );
  });
});
