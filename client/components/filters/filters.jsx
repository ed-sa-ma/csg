import React from 'react';
import LocationFilter from 'components/filters/containers/locationFilter';
import ContractTypeFilter from 'components/filters/containers/contractTypeFilter';
import KeywordFilter from 'components/filters/containers/keywordFilter';
import KeywordList from 'components/filters/containers/keywordList';
import AgeFilter from 'components/filters/containers/ageFilter';

function Filters(props) {
    const { search } = props;

    return (
        <div className="filters">
            <h2 className="mainTitle semi-bold">Filters</h2>
            <div>
                <h3>Keywords</h3>
                <KeywordFilter />
                <KeywordList />
            </div>
            <div>
                <h3>Contract Type</h3>
                <ContractTypeFilter />
            </div>
            <div>
                <h3>Post age</h3>
                <AgeFilter />
            </div>
            <div>
                <h3>Location</h3>
                <LocationFilter />
            </div>
            <button className="btn" onClick={search}>Apply</button>

        </div>
    );
}

Filters.propTypes = {
    search: React.PropTypes.func.isRequired,
};

export default Filters;
