import React from 'react';
import SidebarLayout from '../components/SidebarLayout';
import LoginPopup from '../components/LoginPopup';
import GaugeWidget from '../components/GaugeWidget';

function SamplePage() {
    return (
        // <SidebarLayout active={3} addressText={''}>
        //     <LoginPopup isOpen={true} closeFunction={() => { }} setAuthenticationResult={() => { }} email={''} />
        // </SidebarLayout>
        <GaugeWidget    />
    );
}

export default SamplePage;