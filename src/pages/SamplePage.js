import React from 'react';
import SidebarLayout from '../components/SidebarLayout';
import LoginPopup from '../components/LoginPopup';
import AddWidgetPopup from '../components/Widgets/AddWidgetPopup';
import AddWidgetChart from '../components/Widgets/AddChartWidgetPopup';
import AddToggleWidgetPopup from '../components/Widgets/AddToggleWidgetPopup';

function SamplePage() {
    return (
        <SidebarLayout active={3} addressText={''}>
            <AddWidgetPopup isOpen={true} closeFunction={() => { }} />
        </SidebarLayout>
    );
}

export default SamplePage;