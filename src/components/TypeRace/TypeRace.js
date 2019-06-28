import React, { Component } from 'react';
import moment from 'moment';
import classes from './Typerace.module.css';

const defaultValues = {
    countdown: 10,
    countdownRace: 100
};

class TypeRace extends Component {
    constructor(props) {
        super(props);
        this.state={
            wordcount: 0,
            quoteTyped: '',
            wrongChars: 0,
            inputValue: '',
            finished: false,
            wpm: 0,
            ...defaultValues
        };
    }


    onKeyDown(e) {
        const { quoteTyped, wrongChars } = this.state;

        if(wrongChars === 0){
            this.setState({
                quoteTyped: quoteTyped.substring(0, quoteTyped.length - 1),
            });
        }else {
            this.setState({
                wrongChars: (wrongChars - 1 <= 0) ? 0 : wrongChars - 1
            });
        }
    }

    onKeyPress(e) {

        const { quote } = this.props
        
        const {
            quoteTyped, wrongChars, wordcount, countdownRace
        } =  this.state;

        const char = String.fromCharCode(e.charCode);

        const quoteIndex = quoteTyped.length;

        if(quoteIndex + wrongChars > quote.length) return;

        if(quoteIndex === quote.length) {
                this.setState({
                    finished: true
                });
        }

        if(char === ' '){
            this.setState({
                wordcount: wordcount + 1
            })
        }

        if(char !== quote[quoteIndex]) {
            this.setState({
                wrongChars: wrongChars + 1
            });
        } else {
            this.setState({
                quoteTyped: `${quoteTyped}${char}`,
                wpm: Math.round(wordcount / ( countdownRace / 60))
            });
        }

    }

    clearlyTyped() {
        this.setState({
            inputValue: '',
            quoteTyped: '',
            wrongChars: 0
        });
    }

    handleChange(e) {
        const { value } = e.target;

        if(!value) {
            this.clearlyTyped();
        }
        else{
            this.setState({inputValue: value});
        }
    }

    _status() {
        const { countdown, countdownRace, wpm } = this.state;
        const timer = moment.utc(countdownRace * 1000 ).format('hh:mm:ss');

        if(countdown > 0) {
            return <span />
        }

        return (
            <h4 className={classes.status_bar}>
                <div>{timer}</div>
                <div>{`${wpm} wpm`}</div>
            </h4>
        );
    }

    _quote() {
        const {quote} = this.props;
        const {
            quoteTyped, wrongChars
        } = this.state;

        const quoteLength = quoteTyped.length + wrongChars;
        const typedWrong = wrongChars > 0 ? quote.substring(quoteTyped.length, quoteTyped.length + wrongChars) : '';

        return (
            <p>
                <span className={classes.quote_typed}>{`${quoteTyped}`}</span>
                <span className={classes.quote_typed_wrong}>{typedWrong}</span>
                <span>{`${quote.substring(quoteLength)}`}</span>
            </p>
        );
    }


    render() {
        const {quote} = this.props;

        const {inputValue} = this.state;

        const Quote = () => this._quote();
        const Status = () => this._status();

        return(
            <div>
                <Status />
                <Quote />
                <input 
                    ref = {(ref) => { this.input = ref;}}
                    value={inputValue}
                    className={classes.input_race}
                    onKeyPress={e => this.onKeyPress(e)}
                    onKeyDown = {e => this.onKeyDown(e)}
                    onChange = {value => this.handleChange(value)}
                    maxLength = {quote.length}
                />
            </div>
        );
    }
}

export default TypeRace;

