/*
Special Div that you can hover over and select to expand.
*/

import React, {useState, useEffect, useRef} from 'react';

function HoverContainer(props) {
    const {width, height, style} = props;

    const [isHover, setIsHover] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef(null);

    const styles={
        main: {
            width: width,
            height: height,
            display: 'flex',
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            padding: 30,
            elevation: 10,
            boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)',
        },
        hoverOn: {
            transform: 'scale(1.01)'
        },
        hoverOff: {
            transition: 'transform 0.3s ease-out'
        },
        expanded: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '80vw',
            height: '80vh',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    const handleClick = () => {
        setIsExpanded(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        // Check if we are not clicking the container the container
          if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsExpanded(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [containerRef]);

      
    

    return(
        <>
            <main 
                style={{
                    ...styles.main, 
                    ...(isHover && !isExpanded ? styles.hoverOn : styles.hoverOff),
                    ...(isExpanded ? styles.expanded : {}),
                    ...(!isExpanded ? props.style : {})
                }} 
                onMouseEnter={() => setIsHover(true)} 
                onMouseLeave={() => setIsHover(false)}
                onClick={handleClick}
                ref={containerRef}>
                        {props.children}
            </main>
            {isExpanded && <div style={styles.overlay} />}
        </>

        
    );
}

export default HoverContainer;