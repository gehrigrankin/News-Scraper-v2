import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <article key={alert.id} className={`m-3 message is-${alert.alertType}`}>
            <div class="message-body">
                {alert.msg}
            </div>
        </article>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);