import React from 'react';
import SidebarLayout from '../components/layouts/SidebarLayout';
import AddToggleWidgetPopup from '../components/widgets/AddToggleWidgetPopup';

function SamplePage() {
    return (
        <SidebarLayout active={3} addressText={''}>
            <AddToggleWidgetPopup isOpen={true} closeFunction={() => { }} />
        </SidebarLayout>
    );
}

export default SamplePage;