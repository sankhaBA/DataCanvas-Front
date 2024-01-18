import TopBackground from './TopBackground';
import ScrollableContainer from './ScrollableContainer';

function NonSidebarLayout({ children }) {
    return (
        <div className="relative h-screen overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <TopBackground />
            <div className="absolute top-0 left-0 w-full">
                {/* Top Bar  */}
            </div>
            <div className="absolute top-16 left-0 w-full h-full overflow-y-auto">
                <ScrollableContainer>
                    {children}
                </ScrollableContainer>
            </div>
        </div>
    );
}

export default NonSidebarLayout;
