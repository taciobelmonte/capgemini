import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';

class Course extends Component {

    render() {

        const {data, formatString} = this.props;

        let date = new Date(data.start);
        let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        return (
            <div className="animated zoomIn column-33 course mobile">
                <Link to={"/course/view/" +formatString(data.title.toLowerCase().split(' ').join('_'))}>
                    <Card className="course-inner">
                        <CardContent>
                            <Typography color="textSecondary">
                                {data.category}
                            </Typography>
                            <br />
                            <Typography variant="title" color="textSecondary" className="title">
                                {data.title}
                            </Typography>
                            <Typography color="textSecondary">
                                {data.address.city}
                            </Typography>
                        </CardContent>
                        <Divider light />
                        <CardActions className="action-box">
                            <Typography color="textSecondary">
                                {date.getDay()} de {months[date.getMonth()]} de {date.getFullYear()}
                            </Typography>
                            <Typography color="textSecondary" className="event">
                                <i className="material-icons">
                                    event
                                </i>
                            </Typography>

                        </CardActions>
                    </Card>
                </Link>
            </div>
        );
    }
}
export default Course;

