var React = require('react');
var QuestionDetail = require('./question_detail');

var Questions = React.createClass({

  render: function() {
    return (
      <div>
        <QuestionDetail />
        <QuestionDetail />
        <QuestionDetail />
        <QuestionDetail />
        <QuestionDetail />
        <QuestionDetail />
      </div>
    );
  }

});

module.exports = Questions;
