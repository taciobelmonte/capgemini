import React, { Component } from 'react';
import Course from './../components/Course';
import Header from './../components/Header';

const styles = {
    backgroundColor: '#2196f3',
};

class Index extends Component {

    render() {
        const {courses, search, searchArray, formatString} = this.props;
        let searchActive = false;

        if(searchArray.length > 0){
            searchActive = true;
        }else{
            searchActive = false;
        }

        return (
            <div>
                <Header searchFunction={search} view={false} styles={styles} search={true}/>
                <div className="container">
                    <section id="courses">

                        {searchActive && searchArray.map( (element, index) => (
                            <Course formatString={formatString} key={index} data={element}/>
                        ))}

                        {!searchActive && courses && courses.map( (element, index) => (
                            <Course formatString={formatString} key={index} data={element}/>
                        ))}

                    </section>

                </div>
            </div>
        );
    }
}

export default Index;




