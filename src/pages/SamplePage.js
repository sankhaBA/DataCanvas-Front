import React from 'react';
import SidebarLayout from '../components/SidebarLayout';
import LoginPopup from '../components/LoginPopup';
import GaugeWidget from '../components/GaugeWidget';
import GaugeWidgetPopup from '../components/GaugeWidgetPopup';

function SamplePage() {
    return (
        <SidebarLayout active={3} addressText={''}>
            <GaugeWidget />
        </SidebarLayout>

    );
}

export default SamplePage;