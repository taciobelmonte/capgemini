import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';
class Header extends Component {

    state = {
      query: '',
      searchReveal: 'disabled'
    };

    //Method to update query state
    updateQuery = (query) => {
        this.setState({ query: query.trim() });
        this.props.searchFunction(query);
    };

    updateState = (event) =>{
        if(this.state.searchReveal == 'enabled'){
            this.setState({searchReveal: 'disabled'});
        }else{
            this.setState({searchReveal: 'enabled'});
        }
    }
    render() {

        const {view, styles, search, title} = this.props;
        const {query} = this.state;

        return (
            <div>
                <AppBar position="static" style={styles}>
                    <Toolbar>
                        <Grid container spacing={24}>
                            <Grid item xs={4}>
                                <Typography variant="title" color="inherit" className="title-app">
                                    {!view && (
                                        <span>Cursos</span>
                                    )}
                                    {view && (
                                        <Link to="/" className="arrow-back">
                                            <i className="material-icons">arrow_back</i>
                                        </Link>
                                    )}
                                </Typography>
                            </Grid>

                            {view && (
                                <Typography variant="title" color="inherit" className="title-mobile">
                                    {title}
                                </Typography>
                            )}

                            {search && (
                                <Grid item xs={4} className="search-container">
                                    <div className="search-box">
                                        <i className="material-icons" onClick={(event) => this.updateState(event)}>search</i>
                                        <DebounceInput minLength={3} debounceTimeout={1000} value={query} className="input-search" placeholder="Pesquisar" onChange={(event)=> this.updateQuery(event.target.value)} />
                                        <DebounceInput  minLength={3}  debounceTimeout={1000} value={query} className={"input-search-mobile " + this.state.searchReveal} onChange={(event)=> this.updateQuery(event.target.value)} />
                                    </div>
                                </Grid>
                            )}
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;

