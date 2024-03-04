import React, { useRef, useState } from 'react'
import './SwitchTabs.scss'

const SwitchTabs = ({data,onTabChange}) => {

    const[selectedTab,setselectedTab]=useState(0);
    const[left,setLeft]=useState(0);
    const ref=useRef(null)

    const activeTab =(tab,index)=>{
        // console.log(ref.current.offsetWidth)
        setLeft(index*ref.current.offsetWidth);

        setTimeout(()=>{
            setselectedTab(index);
        },300);
        onTabChange(tab,index);
    }
  return (

    <div className='switchingTabs'>
        <div className="tabItems">
            {
                data.map((tab,index)=>{
                    return (
                     
                        <span ref={ref} key={index} className={`tabItem ${selectedTab==index ? "active":""}`}
                         onClick={()=>{
                            activeTab(tab,index)
                         }}
                        >{tab}</span>
                    )
                })
            }
            <span className='movingBg' style={{left}}></span>
          
        </div>
     
    </div>
  )
}

export default SwitchTabs
