import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Index from './../components/Index';
import CourseView from './../components/CourseView';
import * as Api from './../utils/Api';

class App extends Component {
    state = {
        courses: [],
        search: []
    };

    formatString = (string) =>
    {
        let withAcent = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        let noAcent = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
        let newString="";

        for(let i=0; i<string.length; i++) {
            let change=false;
            for (let a=0; a<withAcent.length; a++) {
                if (string.substr(i,1) === withAcent.substr(a,1)) {
                    newString+=noAcent.substr(a,1);
                    change=true;
                    break;
                }
            }
            if ( change===false )
                newString+=string.substr(i,1);
        }
        return newString;
    };

    //Function to search course
    search = (query) => {
        let searchArray = this.state.courses.filter(
            (element) => ( (element.title.toLowerCase().includes(query.toLowerCase())) ||
            (element.category.toLowerCase().includes(query.toLowerCase())) ||
            (element.address.city.toLowerCase().includes(query.toLowerCase()))
            )
        );
        this.setState({search: searchArray});
    };

    componentDidMount(){
        Api.get('/publico/test-frontend/raw/master/api/courses.json').then( data => {
            this.setState({courses: data.data});
        });
    }

    render() {
        const {courses, search} = this.state;
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={()=>(
                        <div className="animated fadeIn">
                            <Index formatString={this.formatString} search={this.search} courses={courses} searchArray={search} />
                        </div>
                    )}/>
                    <Route exact path="/course/view/:id" render={(event)=>(
                    <div className="animated fadeIn">
                        <CourseView formatString={this.formatString} search={this.search} event={event} courses={courses} />
                    </div>
                    )}/>
                </Switch>
            </div>
        );
    }
}

export default App;