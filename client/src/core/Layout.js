import React from 'react'
import Menu from '../core/Menu';
import '../styles.css'

const Layout = (
    {title = 'Title',
    className, 
    description = 'Description', 
    children }) =>(

       

    <div>
        <Menu/>
        <div class="tron bg-light p-5 rounded-lg mb-3">
                <h2 class="display-4">{title}</h2>
                 <p class="lead">{description}</p>
  
        </div>
        <div className={className}>{children}</div>
        
        
    </div>
)

export default Layout;