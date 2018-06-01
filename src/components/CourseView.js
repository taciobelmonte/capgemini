import React, { Component } from 'react';
import Header from './../components/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const styles = {
    backgroundColor: '#2196f3',
    height:'100px'
};

class CourseView extends Component {

    formatDate = (start, finish, response) => {
        //Array to print months
        let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        //Transform date from start date. Also gets hours and minutes
        let startDate = new Date(start);
        let startHours = startDate.getHours();
        let startMinutes = startDate.getMinutes();

        //Style minutes format
        if(startMinutes === 0) startMinutes = "00";

        //Do the same before for the final date
        let finalStartDate = startHours + "." + startMinutes;
        let finishDate = new Date(finish);
        let finishHours = finishDate.getHours();
        let finishMinutes = finishDate.getMinutes();

        if(finishMinutes === 0) finishMinutes = "00";

        let finalFinishDate = finishHours + "." + finishMinutes;

        //Print response
        if(response === ''){
            return "De " + finalStartDate.replace('.',':') + " as " + finalFinishDate.replace('.',':') + " - " + ((finalFinishDate-finalStartDate).toFixed(2)).replace('.',':')+ 'h' ;
        }else{
            return startDate.getDay() + " de " + months[startDate.getMonth()] + " de " + startDate.getFullYear()  + " ";
        }
    };

    render() {
        const {courses, event, search, formatString} = this.props;
        let id = event.match.params.id;

        //Filter courses to current course and display
        let course = courses.filter((element) => id === formatString(element.title.toLowerCase().split(' ').join('_')));

        //Pass title to Header to display when on Mobile
        let title = course.map( (element) => element.title );
        return (
            <div>
                <Header title={title} searchFunction={search} view={true} styles={styles} search={false}/>
                <div className="container">
                    {course && course.map( (element, index) => (
                        <Card key={0} className="course-box-content">
                            <CardContent>
                                <Typography variant="headline" className="title-hide-mobile">
                                    {element.title}
                                </Typography>
                                <br />
                                <Typography color="textSecondary" paragraph={true} className="description-style">
                                    {element.description}
                                </Typography>
                            </CardContent>
                            <div className="action-box-inner">
                                <div className="col-100">
                                    <div className="info">
                                        <i className="material-icons left">event</i>
                                        <Typography color="textSecondary" paragraph={true} className="left">
                                            {this.formatDate(element.start, element.finish, 'date')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-100">
                                    <div className="info">
                                        <i className="material-icons left">access_time</i>
                                        <Typography color="textSecondary" paragraph={true} className="left">
                                            {this.formatDate(element.start, element.finish, '')}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-100">
                                    <div className="info">
                                        <i className="material-icons left">location_on</i>
                                        <Typography color="textSecondary" paragraph={true} className="left">
                                            <a href={"http://maps.google.com/?q=" + element.address.street+element.address.number+element.address.city} target="_blank">
                                                {element.address.street}, {element.address.number}, <br />{element.address.city}
                                            </a>
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-100">
                                    <div className="info">
                                        <i className="material-icons left">attach_money</i>
                                        <Typography color="textSecondary" paragraph={true} className="left">
                                            R${element.price},00
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-100">
                                    <div className="info">
                                        <i className="material-icons left">label</i>
                                        <Typography color="textSecondary" paragraph={true} className="left">
                                            {element.category}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-100">
                                    <div className="info">
                                        <Avatar
                                            alt={element.consultant.name}
                                            src={element.consultant.avatar}
                                            className='big-avatar left'
                                        />
                                        <Typography color="textSecondary" paragraph={true} className="left avatar">
                                            {element.consultant.name}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-100 center">
                                    <Button variant="raised" className="button-inscricao">
                                        INSCRIÇÃO
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}

export default CourseView;