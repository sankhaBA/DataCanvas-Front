import React from 'react';
import SidebarLayout from '../components/SidebarLayout';
import LoginPopup from '../components/LoginPopup';
import AddWidgetPopup from '../components/AddWidgetPopup';
import AddWidgetChart from '../components/AddChartPopup';

function SamplePage() {
    return (
        <SidebarLayout active={3} addressText={''}>
            <AddWidgetChart isOpen={true} closeFunction={() => { }} />
        </SidebarLayout>

    );
}

export default SamplePage;