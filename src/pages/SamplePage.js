import React from 'react';
import SidebarLayout from '../components/layouts/SidebarLayout';
import LoginPopup from '../components/LoginPopup';
import AddWidgetPopup from '../components/widgets/AddWidgetPopup';
import AddWidgetChart from '../components/widgets/AddChartWidgetPopup';
import AddToggleWidgetPopup from '../components/widgets/AddToggleWidgetPopup';

function SamplePage() {
    return (
        <SidebarLayout active={3} addressText={''}>
            <AddToggleWidgetPopup isOpen={true} closeFunction={() => { }} />
        </SidebarLayout>
    );
}

export default SamplePage;