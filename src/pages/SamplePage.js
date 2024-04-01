import React from 'react';
import AddParameterTablePopup from '../components/Widgets/AddParameterTablePopup';
import SidebarLayout from '../components/layouts/SidebarLayout';


function SamplePage() {
    return (
        <SidebarLayout active={3} breadcrumb={''}>
            <AddParameterTablePopup isOpen={true} closeFunction={() => { }} />
        </SidebarLayout>
    );
}

export default SamplePage;