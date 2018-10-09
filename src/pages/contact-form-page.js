import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { newContact, saveContact } from '../actions/contact-actions';
import ContactForm from '../components/contact-form';

class ContactFormPage extends Component {

    state = {
        redirect: false
    };

    componentDidMount() {
        this.props.newContact();
    }

    submit = (contact) => {
        return this.props.saveContact(contact)
                .then(response => {
                    this.setState({ redirect: true });
                })
                .catch(err => {
                    throw new SubmissionError(this.props.errors);
                });
    };

    // Note: Sample code has 'onSubmit' rather than 'handleSubmit'; however, contact-form expects a property called 'handleSubmit', so I've left that here
    render() {
        return (
            <div>
                {
                    this.state.redirect 
                    ? <Redirect to='/'/> 
                    : <ContactForm contact={this.props.contact} loading={this.props.loading} handleSubmit={this.submit}/>
                }                
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        contact: state.contactStore.contact,
        error: state.contactStore.errors
    };
}

export default connect(mapStateToProps, { newContact, saveContact })(ContactFormPage);
