import React from 'react'
import '../css/Badge.css'
const Badge = ({ plan ,msg}) => {

    

    return (
        <div>
            <div className="badges"><br />
                {plan ? <><span>Your'e a <br /><b> {plan}</b> user</span><br /></>
                    : <p>
                        <span style={{fontSize:"13px"}}>{msg}</span>
                    </p>}
            </div>
        </div>
    )
}

export default Badge