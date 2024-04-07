import React from 'react';
import AddWidgetPopup from '../components/Widgets/AddWidgetPopup';
import SidebarLayout from '../components/layouts/SidebarLayout';


function SamplePage() {
    return (
        <SidebarLayout active={3} breadcrumb={''}>
            <AddWidgetPopup isOpen={true} closeFunction={() => { }} />
        </SidebarLayout>
    );
}

export default SamplePage;