import React from 'react';
import SidebarLayout from '../components/SidebarLayout';
import AddParameterTablePopup from '../components/AddParameterTablePopup';

function SamplePage() {
    return (
        <SidebarLayout active={3} addressText={''}>
           <AddParameterTablePopup isOpen={true} closeFunction={() => {}} setLoading={() => {}} />
           
        </SidebarLayout>

       

    );
}

export default SamplePage;