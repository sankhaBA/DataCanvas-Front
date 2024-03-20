import React from 'react';
import SidebarLayout from '../components/SidebarLayout';
import LoginPopup from '../components/LoginPopup';

function SamplePage() {
    return (
        <SidebarLayout active={3} addressText={''}>
            <LoginPopup isOpen={true} closeFunction={() => { }} setAuthenticationResult={() => { }} email={''} />
        </SidebarLayout>
    );
}

export default SamplePage;