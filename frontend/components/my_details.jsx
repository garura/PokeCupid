var React = require('react');
var Modal = require('react-modal');
var PersonalityStore = require('../stores/poke_personality');
var SessionStore = require('../stores/session');
var apiUtil = require('../util/apiUtil');


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '0px'
  }
};


var MyDetails = React.createClass({

  getInitialState: function() {
    var ourPersonality = PersonalityStore.personality();
    var caught = ourPersonality.caught;
    var rarecandy = ourPersonality.rarecandy;
    var pokerus = ourPersonality.pokerus;
    return ({ personality: ourPersonality,
              modalIsOpen: false,
              caught: caught,
              rarecandy: rarecandy,
              pokerus: pokerus
            });
  },

  componentDidMount: function() {
    this.personalityToken = PersonalityStore.addListener(this.updatePersonality);
  },

  componentWillUnmount: function() {
    this.personalityToken.remove();
  },

  openModal: function() {
    this.setState({ modalIsOpen: true });
  },

  closeModal: function() {
    var personality = this.state.personality;
    this.setState({ modalIsOpen: false,
                    caught: personality.caught,
                    rarecandy: personality.rarecandy,
                    pokerus: personality.pokerus });
  },

  wild: function(event) {
    event.preventDefault();
    this.setState({ caught: false });
  },

  captured: function(event) {
    event.preventDefault();
    this.setState({ caught: true });
  },

  never: function(event) {
    event.preventDefault();
    this.setState({ rarecandy: "Never" });
  },

  maybe: function(event) {
    event.preventDefault();
    this.setState({ rarecandy: "Maybe before a big fight" });
  },

  anytime: function(event) {
    event.preventDefault();
    this.setState({ rarecandy: "Anytime I find one!"});
  },

  yesPokerus: function(event) {
    event.preventDefault();
    this.setState({ pokerus: true});
  },

  noPokerus: function(event) {
    event.preventDefault();
    this.setState({ pokerus: false});
  },

  saveDetails: function(event) {
    event.preventDefault();
    var userInfo = SessionStore.session();
    var updateInfo = {
      personality: {
        caught: this.state.caught,
        rarecandy: this.state.rarecandy,
        pokerus: this.state.pokerus
    }};
    apiUtil.updateUserPersonality(userInfo, updateInfo);
    this.closeModal();
  },

  updatePersonality: function() {
    var ourPersonality = PersonalityStore.personality();
    var caught = ourPersonality.caught;
    var rarecandy = ourPersonality.rarecandy;
    var pokerus = ourPersonality.pokerus;
    this.setState({ personality: ourPersonality,
                    caught: caught,
                    rarecandy: rarecandy,
                    pokerus: pokerus });
  },

  render: function() {
    if (this.state.personality.caught) {
      var caught = "Yes";
    }
    else {
      var caught = "No";
    }
    caught = (<p className='myDetailText'><span className='detailKey'>Caught</span>{caught}</p>);
    if (this.state.personality.pokerus) {
      var pokerus = "Yes";
    }
    else {
      var pokerus = "No";
    }
    pokerus = <p className='myDetailText'><span className='detailKey'>Had/Have Pokérus</span>{pokerus}</p>;

    var captured = this.state.caught ? " isValue" : "";
    var wild = captured ? "" : " isValue";
    var pokerusYes = this.state.pokerus ? " isValue" : "";
    var pokerusNo = pokerusYes ? "" : " isValue";
    var rarecandyNever = this.state.rarecandy === "Never" ? " isValue": "";
    var rarecandyMaybe = this.state.rarecandy === "Maybe before a big fight" ? " isValue": "";
    var rarecandyAnytime = this.state.rarecandy === "Anytime I find one!" ? " isValue": "";
    return (
      <div id='myDetailDiv' ref='myDetailDiv' onClick={this.openModal}>
        <p id='myDetailHeader'>My details <span id='LFSpan'><img className='pencil' src='./assets/pencil.png'></img></span></p>
        {caught}
        <p className='myDetailText'><span className='detailKey'>Use Rarecandy</span>{this.state.personality.rarecandy}</p>
        {pokerus}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div id='myDetailModalHeader'>
            <p id='modalHeader'>Edit your details</p>
            <button id='modalClose' onClick={this.closeModal}>x</button>
          </div>
          <div id='myDetailInnerModalDiv'>
            <p className='modalQuestion'>Are you wild or captured?</p>
            <button className={'modalButton' + wild} onClick={this.wild}>Wild</button>
            <button className={'modalButton' + captured} onClick={this.captured}>Captured</button>
            <br></br>
            <p className='modalQuestion'>Do you use Rarecandy?</p>
            <button className={'modalButton' + rarecandyNever} onClick={this.never}>Never</button>
            <button className={'modalButton' + rarecandyMaybe} onClick={this.maybe}>Maybe before a big fight</button>
            <button className={'modalButton' + rarecandyAnytime} onClick={this.anytime}>Anytime I find one!</button>
            <br></br>
            <p className='modalQuestion'>Had/Have Pokérus?</p>
            <button className={'modalButton' + pokerusYes} onClick={this.yesPokerus}>Yes</button>
            <button className={'modalButton' + pokerusNo} onClick={this.noPokerus}>No</button>
            <br></br>
            <button className='aboutTextConfirm' type='button' onClick={this.saveDetails}>Save</button>
            <button className='aboutTextCancel' type='button' onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    );
  }
});

module.exports = MyDetails;
