import React from 'react'
import '../css/Badge.css'
const Badge = ({ plan ,posts}) => {

    

    return (
        <div>
            <div class="badges"><br />
                {plan ? <><span>Your'e a <br /><b> {plan}</b> user</span><br /></>
                    : <p>
                        <span>You'll get <br /><strong>{posts}<sup>*</sup> </strong> posts</span>
                    </p>}
            </div>
        </div>
    )
}

export default Badge