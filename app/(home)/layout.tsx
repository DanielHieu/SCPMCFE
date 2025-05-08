import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TawkToChat from "@/components/TawkToChat";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            {/* Chat Widget */}
            <TawkToChat />
            <Footer />
        </>
    );
};

export default HomeLayout;
