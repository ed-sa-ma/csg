import React from 'react';

class KeywordList extends React.Component {

    constructor() {
        super();
        this.getRef = (ref) => { this.inputRef = ref; };
        this.onRemove = this.onRemove.bind(this);
    }

    onRemove(e) {
        this.props.handleRemove(e.target.value);
    }

    render() {
        const { keywords } = this.props;

        if (!keywords) {
            return null;
        }

        return (
            <div className="keywordList">
                {
                    keywords.map(entry => (
                        <div>
                            <span className="keyword">
                                <button onClick={this.onRemove} value={entry}>X</button>
                                {entry}
                            </span>
                        </div>
                    ))
                }
            </div>
        );
    }
}

KeywordList.propTypes = {
    keywords: React.PropTypes.array,
    handleRemove: React.PropTypes.func.isRequired,
};

export default KeywordList;